
import express from "express";
import Therapist from "../Models/auth/therapist";
import User from "../Models/auth/user"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const router = express.Router();

router.post("/login", async (req, res) => {
    try {

        const { email, password, role } = req.body;

        if (!(email && password)) {
            return res.status(400).send("All input is required");
        }

        const user = await User.findOne({ email });

        const therapi = await Therapist.findOne({ email: req.body.email });
        if (user) {

            if (user && (await bcrypt.compare(password, user.password))) {
                // Create token
                const token = jwt.sign(
                    { user_id: user._id, role: user.role },
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: "2h",
                    }
                );

                return res.status(200).json({ user,token });
            }
            return res.status(400).send("Invalid Credentials for a User");
        } else if (therapi) {

            if (therapi && (await bcrypt.compare(password, therapi.password))) {
                // Create token
                const token = jwt.sign(
                    { therapiID: therapi._id, role: therapi.role },
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: "2h",
                    }
                );
                return res.status(200).json({ therapi,token });
            }

            return res.status(400).send("Invalid Credentials");

        } else {
            res.status(404).json({
                message: "A user not Found"
            })
        }
    } catch (err) {
        return res.status(500).json(err)
    }
})

export default router;