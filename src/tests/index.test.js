import app from "./app";
// import app from express();
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from 'body-parser';
dotenv.config();

mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_TEST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:true
  })
  .then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('something went wrong', err);
    // process.exit();
});
// app.listen(process.env.PORT_TEST, () => {
//     console.log("Server is listening on port 4003");
//   });
  