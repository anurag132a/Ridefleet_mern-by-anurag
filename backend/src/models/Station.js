import mongoose from 'mongoose';
const schema=new mongoose.Schema({name:{type:String,required:true},city:{type:String,required:true},address:{type:String,required:true},latitude:Number,longitude:Number},{timestamps:true});
export default mongoose.model('Station',schema);
