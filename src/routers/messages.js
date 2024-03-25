import express from "express";
const router = express.Router();
import Messages from "../Models/messages";


router.post('/', async(req, res)=>{
    const message = new Messages(req.body)
    try {
        const newMessage = await message.save()
        return res.status(200).json(newMessage)
    } catch (error) {
        return res.status(500).json(error)
    }
})

router.get('/:conversionId', async(req, res)=>{
    try {
        const messages = await Messages.find({
            conversionId:req.params.conversionId
        })
        return res.status(200).json(messages)
    } catch (error) {
        return res.status(500).json(error)
        
    }
})

export default router