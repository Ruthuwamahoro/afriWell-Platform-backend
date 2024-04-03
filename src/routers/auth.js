import express from "express";
import User from "../Models/auth/user"
import bcrypt from "bcrypt"
const router = express.Router();
import passport from  'passport'
import jwt from 'jsonwebtoken';
import { Strategy as LocalStrategy } from 'passport-local';


router.use(express.json());
router.use(passport.initialize());



async function validateUser(email, password, done) {
    try {
        const user = await User.findOne( { email : email} ) ;
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return done(null, false, { message: "Invalid email or password" });
        }
        console.log(user)
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
            
            
            const tokenPayload = {lastName: user.lastName,firstName: user.firstName,email: user.email, password: user.password};
            console.log(tokenPayload)
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