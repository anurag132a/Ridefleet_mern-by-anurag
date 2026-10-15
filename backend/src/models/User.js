import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  name:{type:String,required:true,trim:true}, username:{type:String,required:true,unique:true,lowercase:true,trim:true},
  email:{type:String,default:'',trim:true}, phone:{type:String,default:''}, city:{type:String,default:''},
  passwordHash:{type:String,required:true}, role:{type:String,enum:['customer','owner'],default:'customer'},
  kycStatus:{type:String,enum:['NOT_SUBMITTED','PENDING_REVIEW','VERIFIED','REJECTED'],default:'NOT_SUBMITTED'},
  aadhaarLast4:{type:String,default:''}, panLast4:{type:String,default:''}, bankLast4:{type:String,default:''},
  aadhaarHash:{type:String,default:''}, panHash:{type:String,default:''}, bankHash:{type:String,default:''}
},{timestamps:true});
export default mongoose.model('User',userSchema);
