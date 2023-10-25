console.log("hello Mahantesh i am the server guy");
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import helmet from "helmet";
import morgan from "morgan";
import { Register } from "./controllers/AuthControllers.js";
import AuthRoutes from "./Routes/AuthRoutes.js";
import UserRouter from "./Routes/UserRouter.js";
import PostRoutes from "./Routes/PostRoutes.js";
import { CreatePost } from "./controllers/PostController.js";
import { VerifyToken } from "./middleware/AuthMiddleware.js";
import User from "./models/UserModel.js";
import { posts, users } from "./data/index.js";
import Post from "./models/PostModel.js";

//only when you add type:module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();

//connection to mongoose and litening on server port
const PORT = process.env.PORT || 4001;
mongoose
  .connect(process.env.MONGOOSE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    app.listen(PORT, () => {
      console.log("Mongodb connected successfully !");
      console.log(`server is listening in port- ${PORT}`);
      //call only once this data
      // User.insertMany(users)
      // Post.insertMany(posts);
    })
  )
  .catch((error) => {
    console.log("Error Occured On Connection to MongoDB");
    console.log(error);
  });

//some middleware  8
app.use(express.json()); //inbuilt middleware which parses incoming requests with json paylods and is based on body-parser

app.use(helmet()); //secuirty piece of middleware .it securing the http headers
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use(morgan("common"));

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());
//image storage middleware
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* LOCAL STORAGE */
//this is how we can store the file in to the particle folder called assets in local storage
// for production use the cloud storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
//it willl help us to save it anytime we need to upload the file we are going to be using this variable
const upload = multer({ storage });

/* Routes with files */
app.post("/auth/register", upload.single("picture"), Register);
app.post("/post/create", VerifyToken, upload.single("picture"), CreatePost);

/* Routes */
app.use("/auth", AuthRoutes);
app.use("/users", UserRouter);
app.use("/posts", PostRoutes);
