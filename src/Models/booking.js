import mongoose, { Schema} from "mongoose";


const BookingSchema = mongoose.Schema({
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email:{
        type:String,
        required:false
    },
    therapists: {
        type:String,
        required:true
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
