
import mongoose from "mongoose";

const therapistSchema = mongoose.Schema({
    Names:{
        type:String,
        required: true,
        
    },
    email:{
      type:String,
      required:true,
      

    },

    phoneNumber:{
      type:String,
      required: true
    },

    location: {
        province: {
            type: String,
            default: ''

        },
        district: {
            type: String,
            default: ''

        },
        street: {
            type: String,
            default: ''

        }
    },
    Gender:{
    type:String,
    required: true,

    },
    
    therapist_type:{
      type: String,
      required: true
    },
    profile_picture:{
        type:String,
        required: false
    },
    Degree:{
        type:Array,
        required: true,
    },
    licence_number:{
        type:String,
        required:true
    },

    Skill:{
        type:Array,
        required: true
    },
    Question1:{
        type:Boolean,
        default: false
    },
    Question2:{
        type:Boolean,
        default:false
    },
    password:{
        type:String,
        required: true
    },
    Active:{
        type:Boolean,
        default: false
    },
    role:{
        type:String,
        default: "therapist"
    },token: { type: String},
    
    
},
{ timestamps: true })
const Therapist= mongoose.model("Therapist",therapistSchema)

export default Therapist
