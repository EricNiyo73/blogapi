import  Router  from 'express';
const router = Router();
import {update,deletet,findAll} from '../controllers/users.controllers.js';

/**
 * @swagger
 *  /api/users/{id}:
 *    put:
 *      summary: Update a user's information by ID
 *      tags: [users]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: The ID of the user to update
 *        - in: formData
 *          name: user information
 *          required: true
 *          description: The updated user information
 *          schema:
 *            type: object
 *            properties:
 *              userId:
 *                type: string
 *                description: The ID of the user to update
 *              username:
 *                type: string
 *                description: The username of the user
 *              email:
 *                type: string
 *                description: The email of the user
 *              password:
 *                type: string
 *                description: The password of the user
 *      responses:
 *        "200":
 *          description: The updated user information
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  _id:
 *                    type: string
 *                    description: The unique ID of the user
 *                  username:
 *                    type: string
 *                    description: The username of the user
 *                  email:
 *                    type: string
 *                    description: The email of the user
 *                  password:
 *                    type: string
 *                    description: The hashed password of the user
 *        "401":
 *          description: Only the user can update their account
 *        "500":
 *          description: Internal server error
 */
  router.put('/:id',update);
  // router.get('/getone/:id',findone);
  /**
 * @swagger
 * /api/users/getall:
 *   get:
 *     summary: Retrieve a list of users
 *     tags: [users]
 *     description: Returns a list of all users.
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
  router.get("/getall",findAll);
  /**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     tags: [users]
 *     description: Deletes a user
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to delete
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID of the user who is making the request
 *                 required: true
 *     responses:
 *       200:
 *         description: User has been deleted
 *       401:
 *         description: You can delete only your account
 *       404:
 *         description: User not found
 */
  router.delete('/:id',deletet);
export default router;