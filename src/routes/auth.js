import express from "express";
import { create, findOne } from "../controllers/auth.controllers.js";
const router = express.Router();

  router.post('/signup',create);
  router.post('/login',findOne);
export default router;