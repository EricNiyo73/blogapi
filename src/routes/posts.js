// import router from "express".Router();
import  Router  from 'express';
const router = Router();
import bodyParser from 'body-parser';
import Post from "../models/Post.js";
import User from "../models/User.js";
import multer from "multer";
import path from "path";
import express from "express";
import authorizeUser from "../middlewires/middleware.js"
import authentication from "../middlewires/mustHveAccount.js";
import {upload,create ,findAll,findOne,updatep,deletep} from '../controllers/post.controllers.js';

//     /**
//  * @swagger
//  * /posts/create:
//  *   post:
//  *     description: Creates a new post
//  *     produces:
//  *       - application/json
//  *     parameters:
//  *       - name: title
//  *         description: Title of the post
//  *         in: formData
//  *         required: true
//  *         type: string
//  *       - name: desc
//  *         description: Description of the post
//  *         in: formData
//  *         required: true
//  *         type: string
//  *       - name: username
//  *         description: Username of the post's author
//  *         in: formData
//  *         required: true
//  *         type: string
//  *       - name: categories
//  *         description: Categories of the post
//  *         in: formData
//  *         required: true
//  *         type: array
//  *         items:
//  *           type: string
//  *     responses:
//  *       200:
//  *         description: Successfully created a post
//  *       500:
//  *         description: Internal server error
//  */
/**
 * @swagger
 * components:
 *  schemas:
 *    Blog:
 *     type: object:
 *     required:
 *       - title
 *     properties:
 *       id: 
 *        type: string 
 *        description: The blog
 *       title:
 *         type: string
 *         description: the blog title
 *     example:
 *       id: sdffdgsdfgdfgsdfg
 *       title: tijksdfhjklhgjksdf
 *        
 */


    router.post('/create',authentication,upload.single("photo"),create);
    router.get('/', findAll);
    router.get('/:id',findOne);
    router.put('/:id',authentication, updatep);
    router.delete('/:id',authentication, deletep);
export default router;
