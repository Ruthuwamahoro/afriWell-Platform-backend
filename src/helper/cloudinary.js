// const cloudinary = require('cloudinary').v2;
import cloudinary from "cloudinary";
import dotenv from "dotenv";
dotenv.config();


cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary