import mongoose from 'mongoose';
const exportSettingSchema = new mongoose.Schema({
  frequency: { type: String, enum: ['daily','weekly','monthly'], default: 'weekly' },
  formats: { type: [String], enum: ['csv','excel','pdf'], default: ['csv','excel','pdf'] },
  emails: { type: [String], default: [] }
}, { timestamps: true });
export default mongoose.model('ExportSetting', exportSettingSchema);
