import mongoose from "mongoose";
import connectDB from "../config/db.js";
import Role from "../models/Role.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

const roles = [
  {
    name: "dba",
    permissions: [{ action: "roles:create", allowed: true }, { action: "users:assignRole", allowed: true }, { action: "users:*", allowed: true }, { action: "doctors:*", allowed: true }, { action: "medicines:*", allowed: true }],
  },
  {
    name: "admin",
    permissions: [
      { action: "users:create", allowed: true },
      { action: "users:read", allowed: true },
      { action: "users:update", allowed: true },
      { action: "users:delete", allowed: true },
      { action: "doctors:create", allowed: true },
      { action: "doctors:read", allowed: true },
      { action: "doctors:update", allowed: true },
      { action: "doctors:delete", allowed: true },
      { action: "dispensaries:create", allowed: true },
      { action: "dispensaries:read", allowed: true },
      { action: "dispensaries:update", allowed: true },
      { action: "dispensaries:delete", allowed: true },
      // note: admin can't add medicines/patients if you want that enforced
    ],
  },
  {
    name: "standard",
    permissions: [
      { action: "patients:create", allowed: true },
      { action: "patients:read", allowed: true },
      { action: "patients:update", allowed: true },
      { action: "patients:delete", allowed: true },
      { action: "medicines:create", allowed: true },
      { action: "medicines:read", allowed: true },
      { action: "medicines:update", allowed: true },
      { action: "medicines:delete", allowed: true },
    ],
  },
  {
    name: "lower",
    permissions: [
      { action: "medicines:read", allowed: true },
      { action: "patients:read", allowed: true },
    ],
  },
];

const main = async () => {
  await connectDB();
  for (const r of roles) {
    const exists = await Role.findOne({ name: r.name });
    if (!exists) await Role.create(r);
  }

  // create default DBA user if not exists
  const dbaEmail = process.env.DEFAULT_DBA_EMAIL || "dba@hms.local";
  let dba = await User.findOne({ email: dbaEmail });
  if (!dba) {
    const roleObj = await Role.findOne({ name: "dba" });
    const salt = await bcrypt.genSalt(10);
    const pwd = process.env.DEFAULT_DBA_PASSWORD || "ChangeMe123!";
    const hashed = await bcrypt.hash(pwd, salt);
    dba = await User.create({ username: "DBA", email: dbaEmail, password: hashed, role: roleObj._id });
    console.log("Created default DBA:", dbaEmail);
  } else {
    console.log("DBA already exists.");
  }

  process.exit(0);
};

main().catch((err) => { console.error(err); process.exit(1); });
