// const router = require("express").Router();
import  Router  from 'express';
const router = Router();
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
//REGISTER

 const create = async (req, res) => {
    /**
   * @swagger
   * /register:
   *   post:
   *     description: Register a new user
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: username
   *         description: The username of the new user
   *         in: body
   *         required: true
   *         type: string
   *       - name: email
   *         description: The email of the new user
   *         in: body
   *         required: true
   *         type: string
   *       - name: password
   *         description: The password of the new user
   *         in: body
   *         required: true
   *         type: string
   *     responses:
   *       201:
   *         description: A successful response
   *       409:
   *         description: Email already exists
   *       500:
   *         description: Internal server error
   */
 
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(req.body.password,salt);
  
    User.find({email: req.body.email})
        .exec()
        .then(user => {
        if(user.length >= 1){
        return res.status(409).json({
         message: 'Email already exists'
        });
        } else {
                // Create a user
         const newUser = new User({
        username: req.body.username,  
         email: req.body.email, 
        password: hashedpassword
        });
                
        newUser.save()
        .then(result => {
        const token = jwt.sign({id: result._id}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        return res.status(201).json({
        status: 'successfully',
        token,
         data: {
        user: result
        }
        });
        })
        .catch(error => {
        return res.status(500).json({
        error
        });
        });
        }
        })
        .catch(error => {
            res.status(500).json({
                error
            });
        });
  };
    export {create};
//LOGIN
/**
 * @swagger
 * path:
 *  /login:
 *    post:
 *      summary: Log in a user
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                  description: The username of the user
 *                  example: user123
 *                password:
 *                  type: string
 *                  description: The password of the user
 *                  example: pass123
 *      responses:
 *        "200":
 *          description: Login success
 *        "400":
 *          description: Invalid credentials
 *        "500":
 *          description: Internal server error
 */
export const findOne = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json("Wrong credentials!");

    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(400).json("Wrong credentials!");

    // const { password, ...others } = user._doc;
   return res.status(200).json({
      message:"logged successfully"
    });
  } catch (err) {
   return res.status(500).json(err);
  }
};

export default router;
