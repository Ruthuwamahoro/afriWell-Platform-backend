
import express from "express";
import User from "../Models/auth/user";
import bcrypt from "bcrypt"
import multer from "multer"
import middlewares from "../middleware/middlewares";
import Appointment from "../Models/availability";



const router = express.Router()
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Document")
    }, filename(req, file, cb) {
        cb(null, file.originalname)
    },
});

const upload = multer({ storage: storage })


router.post("/register", async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(req.body.password, salt)
  
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        Gender:req.body.Gender,
        password: hashedPass,
        
      });
      const phone = await User.find({ phone: req.body.phone })
      const userEmail = await User.find({ email: req.body.email })
      if (phone.length !== 0) {
        return res.status(402).json({
          message: "this user phone number is already used"
        })
      }else if(userEmail.length!==0){
  
        return res.status(402).json({
          message: "this user Email is already used"
        })
      }
       else {
        const user = await newUser.save();
        return res.status(200).json(user);
      }
  
    } catch (err) {
     return res.status(500).json(err)
    }
  });

  router.get("/register", async (req, res) => {
    try {
      // Await the result of User.findAll() to get the actual data
      const users = await User.find().populate('bookingUser');
  
      // Send the users as JSON in the response
      res.json({status: 'ok', users: users});
    } catch (error) {
      // Handle any errors that occur during the process
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });




  
  // Route definition for retrieving registered users

//   router.get("/all", middlewares.middleware,async (req, res) => {
//     try {
//         let users = await User.find()
//         users = users.filter((user)=>user.role !== "admin")
//         return res.status(200).json(users)
//     } catch (err) {
//         return res.status(401).json(err)
//     }
// });
//  router.post("/Appointment",middlewares.middleware,async(req,res)=>{
//   const userId = req.userData.user_id;
//   const email=userId.email
//   try {
//     const newAppointment= new Appointment({
//         patientId:userId,
//         emailUser:email,
//         therapyType:req.body.therapyType,
//         SessionPackage:req.body.SessionPackage, 
//         appointmentDate:req.body.appointmentDate,
//         SessiontimeStart:req.body.SessiontimeStart,
//         SessiontimeEnd:req.body.SessiontimeEnd,
//         reason:req.body.reason,
        
// });
// const appointment = await newAppointment.save();
    
//     return res.status(200).json(appointment)

//   } catch (error) {
//     return res.status(500).json('error')
//   }
//  });
 
//  router.delete("/user/:id",middlewares.middlewareAdmin, async (req, res) => {
//   try {
//     const user = await User.findById(req.userData._id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     await User.findByIdAndDelete(req.params.id);
//     return res.status(200).json({ message: "User deleted successfully" });
//   } catch (err) {
//     return res.status(500).json(err);
//   }
// });

 

export default router;