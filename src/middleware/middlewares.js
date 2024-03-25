require("dotenv")

import jwt from "jsonwebtoken"
import User from "../Models/auth/user"
import Therapist from "../Models/auth/therapist"

const middleware = (req, res, next) => {
    try {
        const authHeader = req.headers.token || req.headers.authorization;

        const token = authHeader.split(' ')[1]

        const decode = jwt.verify(token, `${process.env.TOKEN_KEY}`)

        req.userData = decode

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Authentication falied"
        })
    }
}

const middlewareAdmin = async (req, res, next) => {
    try {
        const authHeader = req.headers.token || req.headers.authorization;

        const token = authHeader.split(' ')[1]

        const decode = jwt.verify(token, `${process.env.TOKEN_KEY}`)

        req.userData = decode
        const userid = req.userData.user_id
        const user = await User.findById(userid);
        if (user.role === "admin") {
            console.log("admitted")
            next();
        } else {

            return res.status(402).json({
                message: "you are not Authorized"
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Authentication falied"
        })
    }

}


const middlewareTherapist = async (req, res, next) => {
    try {
        const authHeader = req.headers.token || req.headers.authorization;

        const token = authHeader.split(' ')[1]

        const decode = jwt.verify(token, `${process.env.TOKEN_KEY}`)

        req.userData = decode

        const userid = req.userData.therapiID

        const therapi = await Therapist.findById(userid);
         console.log(therapi.Active)
        if (therapi) {
            if (therapi.Active === true) {
                console.log("admitted")
                next();
            
            }else{
                return res.status(402).json({
                    message: "you are not yet Authorized this is for Therapist who is Activated"
                })
            }
           
        } else {

            return res.status(402).json({
                message: "you are not Authorized"
            })
        }
    } catch (error) {

        return res.status(401).json({
            message: "Authentication falied",
            error: error
        })
    }

}


// module.exports = { middleware, middlewareAdmin, anonymousAuth, middlewareTherapist };
export default { middleware, middlewareAdmin, middlewareTherapist }