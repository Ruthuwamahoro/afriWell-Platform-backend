import express from "express";
import User from "../Models/auth/user"
import bcrypt from "bcrypt"
const router = express.Router();
import passport from  'passport'
import jwt from 'jsonwebtoken';
import { Strategy as LocalStrategy } from 'passport-local';


router.use(express.json());
router.use(passport.initialize());

// router.post("/login", async (req, res) => {
//     try {

//         const { email, password, role } = req.body;

//         if (!(email && password)) {
//             return res.status(400).send("All input is required");
//         }

//         const user = await User.findOne({ email });

//         const therapi = await Therapist.findOne({ email: req.body.email });
//         if (user) {

//             if (user && (await bcrypt.compare(password, user.password))) {
//                 // Create token
//                 const token = jwt.sign(
//                     { user_id: user._id, role: user.role },
//                     process.env.TOKEN_KEY,

//                 );

//                 return res.status(200).json({ user,token });
//             }
//             return res.status(400).send("Invalid Credentials for a User");
//         } else if (therapi) {

//             if (therapi && (await bcrypt.compare(password, therapi.password))) {
//                 // Create token
//                 const token = jwt.sign(
//                     { therapiID: therapi._id, role: therapi.role },
//                     process.env.TOKEN_KEY
//                 );
//                 return res.status(200).json({ therapi,token });
//             }

//             return res.status(400).send("Invalid Credentials");

//         } else {
//             res.status(404).json({
//                 message: "A user not Found"
//             })
//         }
//     } catch (err) {
//         return res.status(500).json(err)
//     }
// })



async function validateUser(email, password, done) {
    try {
        const user = await User.findOne( { email : email} ) ;
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return done(null, false, { message: "Invalid email or password" });
        }
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}



passport.use(new LocalStrategy( { usernameField: 'email' },validateUser));

router.post('/login', async (req, res, next) => {
    passport.authenticate('local', { session: false }, async (err, user) => {
        try {
            if (err) return next(err);
            if (!user) return res.status(400).json({ status: 400, error: "Invalid email or password" });
            
            const tokenPayload = { email: user.email, password: user.password};
            const token = jwt.sign(tokenPayload, process.env.TOKEN_KEY);

            res.cookie("token", token);
            res.header('Authorization', `Bearer ${token}`);
            res.json({ status: 200, data: token });
        } catch (err) {
            next(err);
        }
    })(req, res, next);
});









export default router;