import User from '../models/User.js';
import Role from '../models/Role.js';
export const seedUsers = async () => {
  const exists = await User.findOne({ username: 'dba' });
  if (exists) return;
  const role = await Role.findOne({ name: 'dba' });
  if (!role) return;
  const user = new User({ username: 'dba', email: 'dba@hospital.com', password: 'admin123', role: role._id, themePreference: 'dark' });
  await user.save();
  console.log('Created default dba user: dba / admin123');
};
