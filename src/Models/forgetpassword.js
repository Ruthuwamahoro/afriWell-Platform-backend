import mongoose from "mongoose";

const forgetSchema = mongoose.Schema({
   user:{
    type: mongoose.Schema.Types.ObjectId,
   default:'' 

},
code:{
    type:String,
    default:''
}
       
},
{ timestamps: true })
const forget= mongoose.model("forget",forgetSchema)

export default forget