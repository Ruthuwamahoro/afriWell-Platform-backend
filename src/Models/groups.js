import mongoose from "mongoose";

const groupSchema = mongoose.Schema({
    groupName:{
        type:String,
        required: true,
        
    },
    userId:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:''
}],
    therapist:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Therapist",
        required:true

    },
    group_picture:{
        type:String,
        required: false,
        default:''
    },
    patients: {
        type: Number,
        required: false,
        default: 0,}
},
{ timestamps: true })
const group= mongoose.model("group",groupSchema)

export default group