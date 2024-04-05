import express from "express";
const router = express.Router();
import contact from "../Models/contact"
import { contactMessageSchema } from '../validation/contactValidation'


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

router.post("/contact", async (req, res) => {
    const result = contactMessageSchema.validate(req.body, {abortEarly: false});
    if (result.error) {
        const messageError = result.error.details.map((error) => error.message).join(', ');
        return res.status(400).json({ status: 400, error: messageError });
    }
    try {
        const newContact = new contact({
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            phone: req.body.phone,
            Email: req.body.Email,
            Request: req.body.Request
        });
       
        await newContact.save();
        console.log("hello");
        return res.status(201).json(newContact);

    } catch (error) {
        return res.status(500).json(error);
    }
});


export default router