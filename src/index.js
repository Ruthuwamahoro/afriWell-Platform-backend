import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";
import therapistRoute from "./routers/therapistRoute"
import contactRoute from "./routers/ContactRoute"
import swaggerDocumention from "./helper/documentations"
const app = express();
import useRouter from "./routers/user"
import auth from "./routers/auth"
import forget from "./routers/forgetPassword"
import conversationRouter from "./routers/conversation"
import MessagesRouter from "./routers/messages"
app.use(cors({ origin: "*" }));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send({ message: "welcome to my server" });
});
swaggerDocumention(app);
app.use("/Document", express.static("../Document"));
app.use("/api/auth/",auth);
app.use("/api/user/",useRouter);
app.use("/api/contact/", contactRoute);
app.use("/api/therapist/", therapistRoute);
app.use("/api/auth/",forget);
app.use('/api/conversation',conversationRouter);
app.use('/api/messages',MessagesRouter);


app.use("/**", (req, res) => {
  res.json({ error: { status: 404, message: "Router not found" } });
});

;

export default app;

