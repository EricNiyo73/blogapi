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

    router.post('/create',authentication,upload.single("photo"),create);
    router.get('/', findAll);
    router.get('/:id',findOne);
    router.put('/:id',authentication, updatep);
    router.delete('/:id',authentication, deletep);
export default router;
