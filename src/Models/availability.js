import mongoose from "mongoose"

const availabilityschema= new mongoose.Schema({
       
        days:{
          type:Array,
          required:true
        },
        
        endingTime:{
            type:String,
            required:true
        },
        startingtime:{
        type:String,
        required:true
        },
        Therapist:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Therapist"
        }
},{timestamps:true});
const Availability=mongoose.model("Availability",availabilityschema)

export default Availability
