import mongoose from "mongoose";

 const appointmentSchema= new mongoose.Schema({
        patientId:{
         type:mongoose.Schema.Types.ObjectId,
        ref:"Therapist",
        required:true
        },
       
        emailUser:{
         type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
        },
       therapyType:{
         type: String,
         required:true
       },
       SessionPackage:{
         type:String,
         required:false
       },
        appointmentDate:{
         type:String,
         required:true
        },
        SessiontimeStart:{
        type:String,
        required:true
        },
        SessiontimeEnd:{
         type:String,
         required:true
         },
        reason:{
        type:String,
        required:true
        },
      
        
 },{
    timestamps:true
 });
 const Appointment=mongoose.model("Appointment",appointmentSchema)

 export default Appointment
