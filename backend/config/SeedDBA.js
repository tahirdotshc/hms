import bcrypt from "bcryptjs";
import User from "../models/User.js";

const seedDBA = async () => {
  try {
    const existingDBA = await User.findOne({ role: "DBA" });
    if (existingDBA) {
      console.log("✅ DBA already exists:", existingDBA.username);
      return;
    }

    const hashedPassword = await bcrypt.hash("dba123", 10);

    const dbaUser = new User({
      username: "dba",
      password: hashedPassword,
      role: "DBA",
      name: "Super Admin",
      email: "dba@hms.com",
    });

    await dbaUser.save();
    console.log("🚀 Default DBA created → username: dba | password: dba123");
  } catch (error) {
    console.error("❌ Error seeding DBA:", error.message);
  }
};

export default seedDBA;
