import jwt from 'jsonwebtoken';
import User from './models/User.js';
export async function auth(req,res,next){try{const h=req.headers.authorization||'';const token=h.startsWith('Bearer ')?h.slice(7):null;if(!token)return res.status(401).json({message:'Please log in to continue.'});const decoded=jwt.verify(token,process.env.JWT_SECRET);req.user=await User.findById(decoded.id).select('-passwordHash -aadhaarHash -panHash -bankHash');if(!req.user)return res.status(401).json({message:'Account not found.'});next();}catch{return res.status(401).json({message:'Session expired. Please log in again.'});}}
export function ownerOnly(req,res,next){if(req.user?.role!=='owner')return res.status(403).json({message:'Owner access required.'});next();}
