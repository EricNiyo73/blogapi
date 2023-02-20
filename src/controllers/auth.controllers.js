// const router = require("express").Router();
import  Router  from 'express';
const router = Router();
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
//REGISTER

const create = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(req.body.password, salt);

    const existingEmail = await User.findOne({ email: req.body.email });
    const existingUsername = await User.findOne({ username: req.body.username });
    // Email validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.body.email)) {
      return res.status(400).json({
        message: 'Invalid email format'
      });
    }
    if (existingEmail || existingUsername) {
      return res.status(409).json({
        message: 'Email or username already exists'
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
          const token = jwt.sign({ id: result._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
          return res.status(200).json({
            status: 'success',
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
  } catch (err) {
    if (err.code === 'Cannot set headers after they are sent to the client') {
      console.error(err);
      return res.status(500).json({
        message: 'Unexpected error'
      });
    }
  }
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
 *          multipart/form-data:
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
    const user = await User.findOne({username: req.body.username});

    const validated = await bcrypt.compare(req.body.password, user.password);
    if(!user || !validated){
      return res.status(201).json("Wrong credentials!");
    }
    else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.status(200).json({
        message: "Logged in successfully",
        token: token
      });
    }
    // const { password, ...others } = user._doc;
  }catch (err) {
   return res.status(500).json(err);
  }
};

export default router;
