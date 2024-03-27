
import mongoose from "mongoose";

const BookingSchema = mongoose.Schema({
    firstName:{
        type:String,
        required: true
    },
    lastName:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:false
    },
    therapists: {
        type:String,
        required:true
    },

    email:{
        type:String,
        required:false
    },
    date: {
        type: Date, 
        required:true
    },
    time: {
        type:String,
        required:true
    } 
},
{ timestamps: true })
const Booking= mongoose.model("Booking",BookingSchema)

export default Booking
