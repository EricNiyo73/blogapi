import  mongoose from "mongoose";
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required: 
 *         - email
 *         - password
 *       properties: 
 *         id: 
 *           type: string
 *           description: The auto-generated id of the user
 *         username:
 *           type: string
 *           format: name
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *       example:
 *         username: Brenda
 *         email: admin@exampl.com
 *         password: test12 
 */
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
);

export default mongoose.model("User", UserSchema);
