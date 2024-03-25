import express from "express";
const router = express.Router();
import contact from "../Models/contact"


router.get("/contact", async (req, res) => {
    try {
        const allContacts = await contact.find();
        if (allContacts.length === 0) {
            return res.status(404).json({ message: "No contact messages found." });
        }
        return res.status(200).json(allContacts);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
});

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