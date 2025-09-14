import AuditLog from "../models/AuditLog.js";
import * as XLSX from "xlsx";
import { Parser } from "json2csv";
import PDFDocument from "pdfkit";
import fs from "fs";

export const generateCSV = async () => {
  const logs = await AuditLog.find().populate("performedBy targetUser", "email");
  const parser = new Parser();
  return parser.parse(logs.map(l => ({
    action: l.action,
    performedBy: l.performedBy?.email,
    targetUser: l.targetUser?.email,
    time: l.createdAt,
  })));
};

export const generateExcel = async () => {
  const logs = await AuditLog.find().populate("performedBy targetUser", "email");
  const worksheet = XLSX.utils.json_to_sheet(
    logs.map(l => ({
      Action: l.action,
      PerformedBy: l.performedBy?.email,
      TargetUser: l.targetUser?.email,
      Time: l.createdAt,
    }))
  );
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "AuditLogs");
  const filePath = "audit_logs.xlsx";
  XLSX.writeFile(workbook, filePath);
  return filePath;
};

export const generatePDF = async () => {
  const logs = await AuditLog.find().populate("performedBy targetUser", "email");
  const filePath = "audit_logs.pdf";
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(filePath));
  doc.fontSize(16).text("Audit Logs Report", { align: "center" }).moveDown(2);

  logs.forEach(l => {
    doc.fontSize(12).text(
      `${l.action} | By: ${l.performedBy?.email} | Target: ${l.targetUser?.email} | Time: ${l.createdAt}`
    );
    doc.moveDown(0.5);
  });

  doc.end();
  return filePath;
};
