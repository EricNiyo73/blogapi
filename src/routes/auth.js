import express from "express";
import { create, findOne } from "../controllers/auth.controllers.js";
const router = express.Router();

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Creates a new user.
 *     tags: [users]
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User has been created successfully
 *       403:
 *         description: User already exists
 *       424:
 *         description: User has not been created successfully
 * 
 */
  router.post('/signup',create);
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: login for user
 *     tags: [users]
 *     description: Log in an existing user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The email for the user
 *               password:
 *                 type: string
 *                 description: The password for the user
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The status of the operation
 *                 message:
 *                   type: string
 *                   description: The message to the user
 *                 data:
 *                   type: string
 *                   description: The JWT assigned to the user
 *       400:
 *         description: Bad request
 */
  router.post('/login',findOne);
export default router;