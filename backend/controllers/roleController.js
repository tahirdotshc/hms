import Role from '../models/Role.js';
export const createRole = async (req,res)=>{ const { name, menus=[], permissions=[] } = req.body; const exists = await Role.findOne({ name }); if (exists) return res.status(400).json({ message:'Role exists' }); const role = new Role({ name, menus, permissions }); await role.save(); res.status(201).json(role); };
export const getRoles = async (req,res)=>{ const roles = await Role.find(); res.json(roles); };
export const updateRole = async (req,res)=>{ const role = await Role.findByIdAndUpdate(req.params.id, req.body, { new:true }); res.json(role); };
export const deleteRole = async (req,res)=>{ await Role.findByIdAndDelete(req.params.id); res.json({ message:'Deleted' }); };
