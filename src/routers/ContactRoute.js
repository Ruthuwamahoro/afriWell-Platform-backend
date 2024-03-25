import express from "express";
const router = express.Router();
import contact from "../Models/contact"

router.post("/contact", async(req, res)=> {
    try {
        const newContact = new contact({
            FirstName:req.body.FirstName,
            LastName:req.body.LastName,
            phone:req.body.phone,
            Email:req.body.Email,
            Request: req.body.Request
        });
       
        newContact.save();
            return res.status(201).json(newContact);

    } catch (error) {
        return res.status(500).json(error)
        
    }
})


export default router