import mongoose from "mongoose";
const paymentschema = new mongoose.Schema({
  amount:{
    type:String,
    required:true
  },
  currency:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  status:{
    type:String,
    required:true
  },
  paymentIntent:{
    type:String,
    required:true
  }
},{timestamps:true})

const Payment=mongoose.model("Payment",paymentschema)

export default Payment