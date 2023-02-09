import express from "express";
const app = express();
// import app from express();
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import postRoute from "./routes/posts.js";
import categoryRoute from "./routes/categories.js";
import commentRoute from "./routes/commentCo.js";
import bodyParser from 'body-parser';
import swaggerUI from "swagger-ui-express";
import  swaggerJSDoc from "swagger-jsdoc";
// import { swaggerDoc } from 'swagger-json';
import docs from "./Docs";
// import { loginSpec, userSpec, blogSpec } from "./documentation/swagger";

import path from "path";
// import dbConfig from './config/database.config.js';
dotenv.config();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:true
  })
  .then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('something went wrong', err);
    process.exit();
});
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, "eric.jpg");
//   },
// });

// const upload = multer({ storage: storage });
// app.post("/api/upload", upload.single("file"), (req, res) => {
//   res.status(200).json("File has been uploaded");
// });

// const corsOpts = {
//   origin: '*',
  
//   methods: [
//   'GET',
//   'POST',
//   'DELETE',
//   'PUT'
//   ],
// };
// app.use(cors(corsOpts))
const options = {
  swaggerDefinition: {
      openapi: '3.0.0',
      info: {
          title: 'My APIs documentation',
          version: '1.0.0',
          description: 'This is my API documentation'
      },
      components: {
          securitySchemes: {
              bearerAuth: {
                  type: 'http',
                  scheme: 'bearer',
                  in: 'header',
                  bearerformat: 'JWT',
              }
          }
      },
      // securit: [{
      //     bearerAuth: []
      // }],
      servers: [{
          url: 'http://localhost:5000'
      },]
      
  },
  apis: ['/routes/*.js'],
}
const specs = swaggerJSDoc(options)
app.get('/', (req, res) => {
   return res.json({message: "Welcome  I am testing"});
});
app.use('/docss', swaggerUI.serve, swaggerUI.setup(specs));
app.use("/api/comment", commentRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

// app.use("/docs", swaggerUI.serve, swaggerUI.setup(docs));
app.listen("5000", () => {
  console.log("Server is listening on port 5000");
});
