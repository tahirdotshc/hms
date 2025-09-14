import ExportSetting from '../models/ExportSetting.js';
export const getSettings = async (req,res)=>{ const s = await ExportSetting.findOne(); res.json(s); };
export const upsertSettings = async (req,res)=>{ let s = await ExportSetting.findOne(); if (!s) s = new ExportSetting(req.body); else Object.assign(s, req.body); await s.save(); res.json(s); };
