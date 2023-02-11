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
 *    consumes:
 *      - multipart/form-data
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: formData
 *        name: photo
 *        type: file
 *        format: URL
 *        required: true
 *        description: The photo of the post
 *      - in: formData
 *        name: title
 *        type: string
 *        required: true
 *        description: The title of the post
 *      - in: formData
 *        name: desc
 *        type: string
 *        required: true
 *        description: The description of the post
 *      - in: formData
 *        name: username
 *        type: string
 *        required: true
 *        description: The username of the post creator
 *      - in: formData
 *        name: categories
 *        type: array
 *        required: true
 *        description: The categories of the post
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
 *   put:
 *     description: Update a post by id
 *     tags: [Blog]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the post to be updated
 *       - in: body
 *         name: post
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             desc:
 *               type: string
 *             author:
 *               type: string
 *             categories:
 *               type: string
 *     responses:
 *       200:
 *         description: Successfully updated the post
 *         schema:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             photo:
 *               type: string
 *             title:
 *               type: string
 *             desc:
 *               type: string
 *             username:
 *               type: string
 *             categories:
 *               type: array
 *               items:
 *                 type: string
 *       401:
 *         description: Unauthorized, only the owner of the post can update it
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
router.delete('/:id',authentication, deletep);
export default router;
