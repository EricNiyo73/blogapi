import  mongoose from "mongoose";
/**
 * @swagger
 * components:
 *   schemas:
 *     Blog:
 *       type: object
 *       required: 
 *         - title
 *         - description
 *         - imageUrl
 *       properties: 
 *         id: 
 *           type: string
 *           description: The auto-generated id of the user
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         photo:
 *           type: string
 *           format: URL
 *         username:
 *           type: string
 *           descrition: Your username
 *         categories:
 *           type: string
 *           descrition: category of the blog
 *       example:
 *         title: Blog title
 *         description: Blog description
 *         imageUrl: https://images.app.goo.gl/51augVvJcFVxJjV38
 *         username: Brenda
 *         category: Entertainment
 */
const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    categories: {
      type: String,
      required: false,
    },
    comments:{
      type:Array
    }
  }
);

export default mongoose.model("Post", PostSchema);
