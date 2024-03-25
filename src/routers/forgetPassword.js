import { mailer } from "../helper/email";
import User from "../Models/auth/user";
import therapy from "../Models/auth/therapist"
import express from "express";
const router = express.Router();

import forge from "../Models/forgetpassword"
import bcrypt from "bcrypt"

router.post("/forget", async (req, res) => {
    try {

        // const code = crypto.randomBytes(10).toString('hex')
        const code = Math.round(Math.random() * 899999 + 100000)
        const email = req.body.email
        const userEmail = await User.find({ email })
        const therapi = await therapy.find({ email })

        if (userEmail.length !== 0) {
            //const users = await forge.findOne({user:userEmail._id || therapi._id })
            const users = new forge({
                user: userEmail[0]._id,
                code: code
            })

            await mailer(email, `Code to use: ${code}`);
            users.save()
          

            return res.status(201).json({ status: "success", message: ` Email send to ${email}` });
        }else if(therapi.length !== 0){
            const users = new forge({
                user:therapi[0]._id,
                code: code
            })

            await mailer(email, `Code to use: ${code}`);
            users.save()
          

            return res.status(201).json({ status: "success", message: ` Email send to ${email}` });
       
        }
         else {
            return res.json({
                status: "Failed",
                message: "This email not Exit"
            })
        }
    } catch (error) {
        return res.status(401).json({ status: "error", error: error.message });
    }
})


export default router;

router.patch("/reset", async (req, res) => {
    
    const email = req.body.email
   
    const userEmail = await User.findOne({ email:email })
    const therapyEmail = await therapy.findOne({ email:email })
    
    
    if (userEmail) {

        const { code } = await forge.findOne({ code: req.body.code })
        const { user } =await forge.findOne({user:userEmail._id})
        
        if (!(code || user)) {
            return res.status(400).json({
                message: "please provided a code not match",
                
            })
        }
        
        await forge.findOneAndDelete({ user: userEmail._id })
        
        try {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt)
            const userpassword= req.body.password
            userEmail.password=userpassword
            await userEmail.save()

            // const updatedUserPassword = await User.findByIdAndUpdate(userEmail[0]._id, {
            //     $set: req.body.password
            // }, { new: true })

            return res.status(200).json(userEmail);
        } catch (error) {
            return res.status(500).json({
                message: "Fail to update",
                err: error.message
            })
        }
        
    } else if (therapyEmail) {
        
        const { code } = await forge.findOne({ code: req.body.code })
        const { user } =await forge.findOne({ user:therapyEmail._id })
        
        if (!(code && user)) {
            return res.status(400).json({
                message: "Provided token doesn't match",
                
            })
        }
       
        
       
        try {
            const salt = await bcrypt.genSalt(10);
          const password = await bcrypt.hash(req.body.password, salt)
             console.log(therapyEmail._id)
            const updatedTherapyPassword = await therapy.findByIdAndUpdate(therapyEmail._id, {
                $set: {"password":password},
                
            }, { new: true })
            await forge.findOneAndDelete({ user: therapyEmail._id })
            return res.status(200).json(updatedTherapyPassword);
        } catch (error) {
            return res.status(500).json({
                message: "Fail to update Therapy",
               
            })
        }
    } else {
        return res.status(404).json({
            message: "User not found",
            
        })
    }

})