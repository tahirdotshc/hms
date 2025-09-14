import express from "express";
import ExportSetting from "../models/ExportSetting.js";
import { authMiddleware, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get settings
router.get("/", authMiddleware, requireRole("dba"), async (req, res) => {
  const settings = await ExportSetting.findOne();
  res.json(settings);
});

// Update settings
router.put("/", authMiddleware, requireRole("dba"), async (req, res) => {
  const { frequency, formats, emails } = req.body;

  let settings = await ExportSetting.findOne();
  if (!settings) {
    settings = new ExportSetting({ frequency, formats, emails });
  } else {
    settings.frequency = frequency;
    settings.formats = formats;
    settings.emails = emails;
  }
  await settings.save();

  res.json(settings);
});

export default router;
