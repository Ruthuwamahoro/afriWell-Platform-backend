
import express from "express";
import User from "../Models/auth/user";
import bcrypt from "bcrypt"
import multer from "multer"
import { registerSchema} from '../validation/contactValidation'



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
      const result = registerSchema.validate(req.body, { abortEarly: false });
      if (result.error) {
          const messageError = result.error.details.map((error) => error.message).join(', ');
          return res.status(400).json({ status: 400, error: messageError });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(req.body.password, salt);

      const newUser = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          phone: req.body.phone,
          Gender: req.body.Gender,
          password: hashedPass,
      });

      const phone = await User.find({ phone: req.body.phone });
      const userEmail = await User.find({ email: req.body.email });

      if (phone.length !== 0) {
          return res.status(402).json({
              message: "This user's phone number is already used"
          });
      } else if (userEmail.length !== 0) {
          return res.status(402).json({
              message: "This user's email is already used"
          });
      } else {
          const user = await newUser.save();
          return res.status(200).json(user);
      }
  } catch (err) {
      console.error("Error:", err); // Log the error for debugging purposes
      return res.status(500).json({ message: "Internal server error" }); // Return a generic error message
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


 

export default router;