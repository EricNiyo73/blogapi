import { Router } from 'express';
const router = Router();
import {update,findone,deletet} from '../controllers/users.controllers.js';
export default  (router) => {
 
  /**
 * @swagger
 * paths:
 *   /users/{id}:
 *     put:
 *       tags:
 *         - Users
 *       description: Update user information
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: Id of the user to update
 *         - in: body
 *           name: body
 *           description: Fields to update
 *           required: true
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *       responses:
 *         200:
 *           description: User updated
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   username:
 *                     type: string
 *                   email:
 *                     type: string
 *         401:
 *           description: Not authorized
 *         500:
 *           description: Internal server error
 */
  router.put('/:id',update);
  router.get('/:id',findone);
  router.delete('/:id',deletet);
}