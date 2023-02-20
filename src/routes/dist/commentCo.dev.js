"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _commentModel = _interopRequireDefault(require("../models/comment.model.js"));

var _Post = _interopRequireDefault(require("../models/Post.js"));

var _middleware = _interopRequireDefault(require("../middlewires/middleware.js"));

var _mustHveAccount = _interopRequireDefault(require("../middlewires/mustHveAccount.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express["default"])();

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
router.post('/blogs/:blogId/comments', _mustHveAccount["default"], function _callee(req, res) {
  var blogId, blog, comment, savedBlog;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          blogId = req.params.blogId;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(_Post["default"].findById(blogId));

        case 4:
          blog = _context.sent;

          if (blog) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(404).json({
            message: 'Blog not found'
          }));

        case 7:
          comment = {
            text: req.body.text,
            author: req.body.author
          };
          blog.comments.push(comment);
          _context.next = 11;
          return regeneratorRuntime.awrap(blog.save());

        case 11:
          savedBlog = _context.sent;
          return _context.abrupt("return", res.status(201).json(savedBlog));

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](1);
          return _context.abrupt("return", res.status(500).json({
            message: _context.t0.message
          }));

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 15]]);
}); //   getall comments=======================
// router.get('/blogs/:blogId/comments',authentication, async (req, res) => {
//     const blogId = req.params.blogId;
//     try {
//       const comments = await Comment.find({ blogId: blogId });
//       return res.send(comments);
//     } catch (error) {
//       return res.status(400).send({ error: error.message });
//     }
//   });

var _default = router;
exports["default"] = _default;