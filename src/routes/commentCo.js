import  Router  from 'express';
const router = Router();
import Comment from "../models/comment.model.js";
import Blog from "../models/Post.js";
import authorizeUser from "../middlewires/middleware.js"
import authentication from "../middlewires/mustHveAccount.js";


/**
 * @swagger
 * /api/comment/blogs/{id}/comments:
 *   post:
 *     summary: For creating new comments on a specific post
 *     tags: [Comments]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the post to add the comment to
 *         required: true
 *         type: string
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *                 description: The text of the comment
 *     responses:
 *       201:
 *         description: Successful operation
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post('/blogs/:blogId/comments',authentication, async (req, res) => {
  const blogId = req.params.blogId;

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    const comment = {
      text: req.body.text,
      author: req.body.author
    };

    blog.comments.push(comment);
    const savedBlog = await blog.save();

    return res.status(201).json(savedBlog);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
    // const blogId = req.params.blogId;
    // try {
    //   const blog = await Blog.findById(blogId);
    //   if (!blog) {
    //     return res.status(400).send({ error: 'Invalid blogId' });
    //   }
    //   const comment = new Comment({
    //     blogId: blogId,
    //     author: req.body.author,
    //     content: req.body.content,
    //   });
    //   await comment.save();
    //   res.status(201).send({ message: 'Comment added successfully' });
    // } catch (error) {
    //   res.status(400).send({ message: "this Blog is no longer exists" });
    // }
  });

//   getall comments=======================


// router.get('/blogs/:blogId/comments',authentication, async (req, res) => {
//     const blogId = req.params.blogId;
//     try {
//       const comments = await Comment.find({ blogId: blogId });
//       return res.send(comments);
//     } catch (error) {
//       return res.status(400).send({ error: error.message });
//     }
//   });

  export default router;