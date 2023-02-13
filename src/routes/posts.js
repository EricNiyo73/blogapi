// import router from "express".Router();
import  Router  from 'express';
const router = Router();
import bodyParser from 'body-parser';
import Post from "../models/Post.js";
import express from "express";

import authentication from "../middlewires/mustHveAccount.js";
import {upload,create ,findAll,findOne,updatep,deletep} from '../controllers/post.controllers.js';

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
router.post('/create',authentication,upload.single("photo"),create);
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
router.get('/', findAll);
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
router.get('/:id',findOne);
/** 
* @swagger
* /api/posts/{id}:
*   get:
*     description: Retrieve a post by ID
*     tags:
*       - Blog
*     parameters:
*       - name: id
*         in: path
*         description: ID of the post to retrieve
*         required: true
*         type: string
*     responses:
*       200:
*         description: Successfully retrieved the post
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 id:
*                   type: string
*                 username:
*                   type: string
*                 title:
*                   type: string
*                 desc:
*                   type: string
*                 photo:
*                   type: string
*                 categories:
*                   type: array
*                   items:
*                     type: string
*       404:
*         description: Post not found
*       500:
*         description: Internal server error
*/

router.put('/:id',authentication, updatep);
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
 *      - in: query
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
router.delete('/:id',authentication, deletep);
export default router;
