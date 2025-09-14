import mongoose from 'mongoose';
const menuSchema = new mongoose.Schema({ label: String, path: String }, { _id: false });
const permissionSchema = new mongoose.Schema({ action: String, allowed: { type: Boolean, default: true } }, { _id: false });
const roleSchema = new mongoose.Schema({ name: { type: String, unique: true, required: true }, menus: [menuSchema], permissions: [permissionSchema] }, { timestamps: true });
export default mongoose.model('Role', roleSchema);
