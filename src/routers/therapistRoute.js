import express from "express";
import Therapist from "../Models/auth/therapist";
import middlewares from "../middleware/middlewares";
import User from "../Models/auth/user";
import bcrypt from "bcrypt";
import multer from "multer";
import cloudinary from "../helper/cloudinary";
import group from "../Models/groups";
import { mail } from "../helper/email";
const router = express.Router();
const storage = multer.diskStorage({});

const upload = multer({ storage: storage });

router.post(
  "/register",
  upload.fields([
    { name: "profile_picture", maxCount: 1 },
    { name: "Degree", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      let result1;
      if (!req.files.profile_picture || !req.files.Degree)
        return res.status(400).json({
          message: "Please provide all require files (profile_picture, Degree)",
        });
      const result = await cloudinary.uploader.upload(
        req.files.profile_picture[0].path
      );

      await cloudinary.uploader
        .upload(req.files.Degree[0].path, { resource_type: "raw" })
        .then((result) => {
          result1 = result;
        })
        .catch((err) => {
          console.log(err);
        });

      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(req.body.password, salt);

      const newTherapist = new Therapist({
        Names: req.body.Names,
        email: req.body.email,
        password: hashedPass,
        phoneNumber: req.body.phoneNumber,
        location: req.body.location,
        Gender: req.body.Gender,
        therapist_type: req.body.therapist_type,
        profile_picture: result.secure_url,
        licence_number: req.body.licence_number,
        Skill: req.body.Skill,
        Degree: result1.secure_url,
        Question1: req.body.Question1,
        Question2: req.body.Question2,
      });

      const TherapistEmail = await Therapist.find({ email: req.body.email });

      if (TherapistEmail.length !== 0)
        return res.status(402).json({
          message: "this user Email is already used",
        });

      const therapist = await newTherapist.save();
      return res.status(200).json(therapist);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
);

router.post("/search", middlewares.middleware, async (req, res) => {
  try {
    const Therapi = await Therapist.find({ Names: req.body.Names });

    if (Therapi.length !== 0) {
      return res.status(200).json(Therapi);
    } else {
      return res.status(401).json({
        message: "Not Found",
      });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});
router.get("/all", async (req, res) => {
  try {
    const therapist = await Therapist.find();
    return res.status(200).json(therapist);
  } catch (err) {
    return res.status(401).json(err);
  }
});

router.post("/group/create",middlewares.middlewareTherapist,async (req, res) => {
    try {
      const userId = req.userData.therapiID;

      const newGroup = new group({
        groupName: req.body.groupName,
        therapist: userId,
      });
      const groupname = await group.find({
        groupName: req.body.groupName,
        therapist: userId,
      });
      // const therapistId = await group.findById({ therapist:userId })
      if (groupname.length !== 0) {
        return res.status(400).json({
          message: "this group name is already used",
        });
      } else {
        newGroup.save();
        return res.status(201).json(newGroup);
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  }
);

router.get("/group/all", middlewares.middlewareTherapist, async (req, res) => {
  try {
    const userId = req.userData.therapiID;
    const groups = await group.find({ therapist: userId });
    if (!groups) {
      return res.status(404).json({
        message: "No group create yet",
      });
    }
    return res.status(200).json(groups);
  } catch (err) {
    return res.status(401).json(err);
  }
});

router.patch(
  "/group/asign/:id",
  middlewares.middlewareTherapist,
  async (req, res) => {
    try {
      const username = req.body.Names;
      const user = await User.findOne({ Names: username });
      const user_id = user._id;
      const { userId } = await group.findById(req.params.id);
      const groupfind = await group.findById(req.params.id);
      if (groupfind) {
        if (!userId.includes(user_id)) {
          try {
            const groupUpdate = await group.findByIdAndUpdate(
              req.params.id,

              {
                $inc: { patients: 1 },
                $push: { userId: user_id },
              },
              { new: true }
            );
            return res.status(200).json(groupUpdate);
          } catch (err) {
            return res.status(500).json(err);
          }
        } else {
          return res.status(404).json({
            message: "User already exit in group",
          });
        }
      } else {
        return res.status(404).json({
          message: "No such group",
        });
      }
    } catch (error) {
      return res.status(500).json({
        data: error,
        message: "Server Error",
      });
    }
  }
);
router.get(
  "/group/groups",
  middlewares.middlewareTherapist,
  async (req, res) => {
    try {
      const groups = await group.find().populate("therapist", "Names -_id");

      return res.status(200).json(groups);
    } catch (err) {
      return res.status(401).json(err);
    }
  }
);
router.post("/search/users", middlewares.middleware, async (req, res) => {
  try {
    const users = await User.find({ Names: req.body.Names });

    if (users.length !== 0) {
      return res.status(200).json(users);
    } else {
      return res.status(401).json({
        message: "Not Found",
      });
    }
  } catch (error) {}
});
router.get(
  "/group/member/:id",
  middlewares.middlewareTherapist,
  async (req, res) => {
    try {
      const members = await group
        .findById(req.params.id)
        .select("userId groupName")
        .populate("userId", "Names");
      return res.status(200).json(members);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
);

router.patch(
  "/admin/activetherapy/:id",
  middlewares.middlewareAdmin,
  async (req, res) => {
    try {
      const therapy = await Therapist.findById(req.params.id);
      console.log(therapy);
      const therapyEmail = therapy.email;
      if (therapy) {
        try {
          const updateTherapy = await Therapist.findByIdAndUpdate(
            req.params.id,

            {
              $set: { Active: req.body.Active },
            },
            { new: true }
          );
          await mail(
            therapyEmail,
            `congratulations 🥳 your acount has been Activated`
          );
          return res.status(200).json(updateTherapy);
        } catch (err) {
          return res.status(404).json({
            error: err.message,
            message: "Failed to up_date",
          });
        }
      } else {
        return res.status(400).json({
          message: "not found",
        });
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  }
);

router.get(
  "/admin/unactiveTherapist",
  middlewares.middlewareAdmin,
  async (req, res) => {
    try {
      const therapy = await Therapist.find({ Active: "false" }).select(
        "Names Gender therapist_type Active"
      );

      return res.status(200).json({ therapy });
    } catch (err) {
      return res.status(401).json(err.message);
    }
  }
);

router.get("/getTherapy/:id", middlewares.middleware, async (req, res) => {
  try {
    const therapy = await Therapist.findById(req.params.id);
    return res.status(200).json(therapy);
  } catch (err) {
    return res.status(500).json(err.message);
  }
});


router.post('/Availability/create',middlewares.middlewareTherapist,async(req,res)=>{
    try {
        const therapid=req.userData.therapiID;
        const newAvailability=new Availability({
           
            startDate:req.body.startDate,
            endingDate:req.body.endingDate,
            startingTime:req.body.startingTime,
            endingTime:req.body.endingTime,
            Therapist:therapid.Names
        });
        const availability= await Availability.find({
            name:req.body.name,
            startDate:req.body.startDate,
            endingDate:req.body.endingDate,
            startingTime:req.body.startingTime,
            endingTime:req.body.endingTime,
            Therapist:therapid
        });
        
      newAvailability.save();
      return res.status(201).json({message:"newAvailability"})
    } catch (error) {
        return res.status(500).json(error)
    }
});
router.delete("/Therapist/:id",middlewares.middleware,async (req, res) => {
    try {
      const therapist = await Therapist.findByIdAndDelete(req.userData.id);
      
      if (!therapist) {
        return res.status(404).json({ message: "Therapist not found" });
      }
  
      return res.status(200).json({ message: "Therapist deleted successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
});
router.post("/search",async(req,res) => {

  const query= req.query.Therapist
  const search= await Therapist.find({therapist_type:query})
try {
  return res.status(200).json(search)
   
  } catch (error) {
    return res.status(500).jsonj(error)
  }
})

export default router;
