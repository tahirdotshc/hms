import AuditLog from '../models/AuditLog.js';
export const logAction = async ({ action, performedBy, targetUser, details }) => {
  try { await AuditLog.create({ action, performedBy, targetUser, details }); } catch (err) { console.error('log error', err.message); }
};
