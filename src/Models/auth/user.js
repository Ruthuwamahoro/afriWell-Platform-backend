
import mongoose, { Schema} from "mongoose";

const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        required: true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
      type:String,
      required:true,
      

    },

    phone:{
      type:String,
      required: true
    },

   
    Gender:{
    type:String,
    required: true,

    },
    
    profile_picture:{
        type:String,
        required: false
    },
    
    password:{
        type:String,
        required: true
    },
    role:{
        type:String,
        default: "user"
    },token: { type: String },
    bookingUser: [{
        type: Schema.Types.ObjectId,
        ref: 'Booking'
    }]


    
},
{ timestamps: true })
const User= mongoose.model("User",userSchema)

export default User
