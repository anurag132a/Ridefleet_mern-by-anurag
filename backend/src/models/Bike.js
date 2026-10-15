import mongoose from 'mongoose';
const schema=new mongoose.Schema({bikeCode:{type:String,required:true,unique:true},model:{type:String,required:true},registration:{type:String,required:true},station:{type:mongoose.Schema.Types.ObjectId,ref:'Station',required:true},status:{type:String,enum:['AVAILABLE','BOOKED','IN_USE'],default:'AVAILABLE'},odometer:{type:Number,default:0}},{timestamps:true});
export default mongoose.model('Bike',schema);
