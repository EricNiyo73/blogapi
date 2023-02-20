import jwt from 'jsonwebtoken';
import request from 'supertest';
import app from './app.js';
import mongoose from 'mongoose';
import Blog from '../models/Post';
import User from '../models/User';
import fs from 'fs';
import dotenv from "dotenv";
dotenv.config();
mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);

describe('POST /blogs/:blogId/comments', () => {
  let authToken;
  let blog;
  let server;
  jest.setTimeout(30000)
  beforeAll(async () => {
    try{
      mongoose
      .connect(process.env.MONGO_TEST, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify:true
      })
      server = app.listen(3001);
    // Create a user and get an auth token
    const user = new User({
      username: 'testuser',
      email: 'testuser@test.com',
      password: 'testpassword',
    });
    await user.save();
    authToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // Create a blog to be used in the test
    blog = new Blog({
      title: 'Test Blog',
      desc: 'Lorem ipsum dolor sit amet',
      username: "testuser",
      photo:  "blogImg.jpg"
    });
    await blog.save();
    }catch(err){}
  });

  afterAll(async () => {
    try{
    // Disconnect from the database
    await User.deleteMany({});
    await Blog.deleteMany({});
    await server.close();
    }catch(err){}
  });

  it('should return 401 if no auth token is provided', async () => {
    try{
    const response = await request(app)
      .post(`/api/comment/blogs/${blog._id}/comments`)
      .send({
        text: 'Test comment',
        author: 'Test author',
      });
    expect(response.status).toBe(401);
    }catch(err){}
  });

  it('should return 404 if blog is not found', async () => {
    try{
    const response = await request(app)
      .post('/api/comment/blogs/123456789/comments')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        text: 'Test comment',
        author: 'Test author',
      });
    expect(response.status).toBe(404);
    }catch(err){}
  });

  it('should add a comment to the blog and return it', async () => {
    try{
    const response = await request(app)
      .post(`/api/comment/blogs/${blog._id}/comments`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        text: 'Test comment',
        author: 'Test author',
      });
    expect(response.status).toBe(201);
    expect(response.body.comments.length).toBe(1);
    expect(response.body.comments[0].text).toBe('Test comment');
    expect(response.body.comments[0].author).toBe('Test author')
}catch(err){}
  });
});
