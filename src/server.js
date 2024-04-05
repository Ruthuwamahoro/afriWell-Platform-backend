import app from ".";
import dotenv from "dotenv";
import mongoose from "mongoose";
import swaggerDocs from "./documentation/swagger";



dotenv.config();

const PORT = process.env.PORT ;
console.log(PORT);
const server = app.listen(PORT, () => {
  // mongoose.set("strictQuery", false);
  mongoose.set('strictQuery', true);
  mongoose
    .connect('mongodb+srv://ruthuwamahoro250:mongodb123@cluster0.kerkrhb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
      console.log("connected to mongodb");
      console.info("Server is running on port: ", PORT);
      swaggerDocs(app, PORT);
    })
    .catch((err) => {
      console.log(err);
    });
});


export default server;
