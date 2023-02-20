"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _Post = _interopRequireDefault(require("../models/Post.js"));

var _mustHveAccount = _interopRequireDefault(require("../middlewires/mustHveAccount.js"));

var _postControllers = require("../controllers/post.controllers.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import router from "express".Router();
var router = (0, _express["default"])();

/**
 * @swagger
 * /api/posts/create:
 *  post:
 *    description: Use to create a new post
 *    tags: [Blog]
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              photo:
 *                type: string
 *                format: binary
 *                description: The photo of the post
 *                required: true
 *              title:
 *                type: string
 *                description: The title of the post
 *                required: true
 *              desc:
 *                type: string
 *                description: The description of the post
 *                required: true
 *              username:
 *                type: string
 *                description: The username of the post creator
 *                required: true
 *              categories:
 *                type: array
 *                description: The categories of the post
 *                required: true
 *    responses:
 *      200:
 *        description: The newly created post
 *        schema:
 *          type: object
 *          properties:
 *            savePost:
 *              type: object
 *              description: The post data
 *            status:
 *              type: string
 *              description: The status message
 *      500:
 *        description: Internal Server Error
 */
router.post('/create', _mustHveAccount["default"], _postControllers.upload.single("photo"), _postControllers.create);
/**
 * @swagger
 * /api/posts/:
 *   get:
 *     description: Gets all posts or filtered by username or category name
 *     tags: [Blog]
 *     parameters:
 *       - in: query
 *         name: user
 *         type: string
 *         description: The username to filter by
 *       - in: query
 *         name: cat
 *         type: string
 *         description: The category name to filter by
 *     responses:
 *       200:
 *         description: Successfully retrieved posts
 *       500:
 *         description: Internal server error
 */

router.get('/', _postControllers.findAll);
/**
 * @swagger
 * /api/posts/{id}:
 *  get:
 *    description: Use to retrieve a single post by its ID
 *    tags: [Blog]
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *        description: The ID of the post to retrieve
 *    responses:
 *      200:
 *        description: A single post
 *        schema:
 *          type: object
 *          properties:
 *            photo:
 *              type: string
 *              description: The URL of the post photo
 *            title:
 *              type: string
 *              description: The title of the post
 *            desc:
 *              type: string
 *              description: The description of the post
 *            username:
 *              type: string
 *              description: The username of the post creator
 *            categories:
 *              type: array
 *              description: The categories of the post
 *              items:
 *                type: string
 *      500:
 *        description: Internal Server Error
 */

router.get('/:id', _postControllers.findOne);
/** 
* @swagger
* /api/posts/{id}:
*   put:
*     description: Update a post
*     tags:
*       - Blog
*     parameters:
*       - name: id
*         in: path
*         description: ID of the post to update
*         required: true
*         type: string
*     requestBody:
*       required: true
*       content:
*         multipart/form-data:
*           schema:
*             type: object
*             properties:
*               username:
*                 type: string
*                 description: The username of the post
*                 required: true
*               title:
*                 type: string
*                 description: The title of the post
*                 required: true
*               desc:
*                 type: string
*                 description: The description of the post
*                 required: true
*               photo:
*                 type: string
*                 format: binary
*                 description: The photo URL of the post
*                 required: true
*               categories:
*                 type: array
*                 items:
*                   type: string
*                 description: The categories of the post
*                 required: true
*     responses:
*       200:
*         description: Successfully updated the post
*       401:
*         description: You can update only your post
*       500:
*         description: Internal server error
*/

router.put('/:id', _mustHveAccount["default"], _postControllers.updatep);
/**
 * @swagger
 * /api/posts/{id}:
 *  delete:
 *    description: Use to delete a post by its ID
 *    tags: [Blog]
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *        description: The ID of the post to delete
 *      - in: body
 *        name: username
 *        type: string
 *        required: true
 *        description: The username of the post owner
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: The post has been deleted
 *      401:
 *        description: Unauthorized request, the username does not match the post owner
 *      500:
 *        description: Internal Server Error
 */

router["delete"]('/:id', _mustHveAccount["default"], _postControllers.deletep);
var _default = router;
exports["default"] = _default;