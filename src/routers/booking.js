
import jwt from 'jsonwebtoken'     
import express from 'express'
import Booking from '../Models/booking'
import { Strategy, ExtractJwt } from 'passport-jwt';
import passport from 'passport'
require('dotenv').config()
import User from "../Models/auth/user"
      
      
const router = express.Router();
//jwt strategy
router.use(express.json())
router.use(passport.initialize())

const jwtOptions = {  
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.TOKEN_KEY || 'heyyou'
}


//handling retrieve of all project

async function seeBookingInfo(req, res) {
    try{
        const book = await Booking.find();
        res.json({Booking: book})

    } catch(err){
        console.log(err)
    }
}


async function allowPostbooking(req, res, next) {
    passport.authenticate('jwt', {session: false}, async(err, user, ) => {
        try{
            if(err){
                return next(err)
            }
            if(!user){
                return res.status(401).json({status: 401, error: "please login is required"})
            }
            const token = req.headers.authorization?.split(' ')[1];
            const verification = jwt.verify(token, process.env.TOKEN_KEY || 'heyyou')
            const id = verification._id
            console.log(id)
            const email = verification.email
            const firstName = verification.firstName
            const lastName = verification.lastName
            const {therapists, date, time} = req.body;
            const book= new Booking({
                firstName: firstName,
                lastName: lastName, 
                email:email,
                therapists,
                date,
                time
            })
            console.log(firstName)
            await book.save()
            console.log(book);
            res.json({bookingInfo: book,data: 'sent successfully'})
        } catch(err){
            return next(err)
        }
    })(req,res,next)
}


//handling update project

async function allowUpdatebookingInfo (req, res, next) {
    passport.authenticate('jwt', {session: false}, async(err, user, info) => {
        try{
            if(err){
                return next(err)
            }
            if(!user){
                return res.status(401).json({status: 401, error: "please login is required"})
            }
            const updateBook = await Booking.findByIdAndUpdate(req.params.id, {
                $set: {
                    phone: req.body.phone,
                    therapists: req.body.therapists,
                    email: req.body.email,
                    date: req.body.date,
                    time: req.body.time

                }
            }, {new: true});
            if(updateBook === null)return res.json({error: "id not found"})
            res.json({data: 'updated successfully'})
        } catch(err){
            return next(err)
        }
    })(req,res,next)
}


// //handling delete single project
async function allowDeleteBooking (req, res, next) {
    passport.authenticate('jwt', {session: false}, async(err, user) => {
        try{
            if(err){
                return next(err)
            }
            if(!user){
                return res.status(401).json({status: 401, error: "please login is required"})
            }
            const deleteBook = await Booking.findByIdAndDelete(req.params.id)
            if (!deleteBook) return res.status(400).send({msg:"id not found"})
            res.json({data:"BookingInfo Deleted Successfully"})
        } catch(err){
            return next(err)
        }
    })(req,res,next)
}




async function accessSingleBooking (req, res) {
  try{
      const singleBooking = await Booking.findOne({ id: req.params.id})
      if(singleBooking === null) res.status(400).json({status: 400, error: "Booking not found"})
      res.json({status: "ok",data:singleBooking});

  } catch(err){
      console.log(err)
  }
  
}






/////////////////////////////////////////////////////////////////////////////////////////////////////////

//define strategy

passport.use(new Strategy(jwtOptions, async(jwtPayload, done) => {
    try{
        const user = await User.findOne({email: jwtPayload.email}); 
        if(!user){
            done(null, false)
        } else {
            done(null, user)
        }
    } catch(err){
        done(err)
    }
    

} ))

//define routes

router.get('/booking', seeBookingInfo)
router.get('/booking/:id', accessSingleBooking)
router.post('/booking', allowPostbooking)
router.patch('/booking/:id', allowUpdatebookingInfo)
router.delete('/booking/:id', allowDeleteBooking)


export default router
