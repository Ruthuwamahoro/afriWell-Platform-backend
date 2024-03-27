
      
import express from 'express'
import Booking from '../Models/booking'
import { Strategy, ExtractJwt } from 'passport-jwt';
import { StrategyOptions } from 'passport-jwt';
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

//handling addition of project


async function allowPostbooking(req, res, next) {
    passport.authenticate('jwt', {session: false}, async(err, user, ) => {
        try{
            if(err){
                return next(err)
            }
            if(!user){
                return res.status(401).json({status: 401, error: "please login is required"})
            }
            const {firstName, lastName, phone,therapists, email, date, time} = req.body;
            const book= new Booking({
                firstName, 
                lastName,  
                phone,
                therapists,
                email,
                date,
                time
            })
            await book.save()
            res.json({data: 'sent successfully'})
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
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
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


//handling delete single project
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
            res.send("BookingInfo Deleted Successfully")
        } catch(err){
            return next(err)
        }
    })(req,res,next)
}

async function accessSingleBooking (req, res) {
  try{
      const singleBooking = await Booking.findById(req.params.id)
      if(singleBooking === null) res.status(400).json({status: 400, error: "id not found"})
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
