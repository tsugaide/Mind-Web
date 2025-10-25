import e from "express";
import cors from "cors";
import dotenv from "dotenv";
import imageKitRoute from "./routes/imageKitRoute.js";

dotenv.config();
const app = e();
app.use(cors());
app.use(e.json());

app.use("/api/imagekit", imageKitRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("running on port 3000");
});
