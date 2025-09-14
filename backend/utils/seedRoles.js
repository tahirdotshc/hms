import Role from '../models/Role.js';
export const seedRoles = async () => {
  const count = await Role.countDocuments();
  if (count > 0) return;
  const defaultRoles = [
    { name: 'dba', menus: [{ label:'DBA Dashboard', path:'/dba' }], permissions: [{ action:'manage_users' },{ action:'manage_roles' }] },
    { name: 'doctor', menus: [{ label:'Doctor', path:'/doctor' }], permissions: [{ action:'create_prescription' }] },
    { name: 'dispenser', menus: [{ label:'Dispenser', path:'/dispenser' }], permissions: [{ action:'dispense_medicine' }] },
    { name: 'patient', menus: [{ label:'Patient', path:'/patient' }], permissions: [{ action:'view_prescriptions' }] },
  ];
  await Role.insertMany(defaultRoles);
  console.log('Default roles seeded');
};
