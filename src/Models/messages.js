

import mongoose from "mongoose";

const messagesSchema = mongoose.Schema({
         conversitionId:{
            type:String,
         },
         sender:{
            type:String,
         },
         test:{
            type:String,
         },
},
{ timestamps: true })
const Messages= mongoose.model("Messages",messagesSchema)

export default Messages
