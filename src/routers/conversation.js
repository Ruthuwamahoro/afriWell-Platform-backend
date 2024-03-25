import express from "express";
const router = express.Router();

import Conversation from "../Models/conversation";

router.post('/',async(req, res)=>{
    const newConversation= new  Conversation({
        members:[req.body.senderId, req.body.receiveId]
    });
    try {
        const saverconversation= await newConversation.save()
        return res.status(200).json(saverconversation)
    } catch (error) {
        return res.status(500).json(error)
    }
})

router.get('/:userId', async(req, res)=>{
          try {
            const conversation = await Conversation.find({
                members: {$in: [req.params.userId] }
            })
            return res.status(200).json(conversation)
          } catch (error) {
            return res.status(500).json(error)
            
          }
}) 
export default router