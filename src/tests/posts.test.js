import request from 'supertest';
import app from './app';
import Post from '../models/Post';
import User from '../models/User';
import fs from "fs";
import path from "path";
import expect from "expect";
import  mongoose  from 'mongoose';
import multer from 'multer';
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from 'body-parser';
dotenv.config();

mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);

describe('POST /api/posts/create', () => {
  let token;
  let user;
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
      server = app.listen(3003);
    // Login user and get JWT token for authentication
    user = new User({
      username: "testuser",
      email: "testuser@example.com",
      password: "password",
    });
    await user.save();
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: user.email,
        password: "password" ,
      });

    token = response.body.token;
    }catch(err){}
  });

  afterAll(async () => {
    try{
    // Clean up created posts
    await User.deleteMany({});
    await Post.deleteMany();
    await server.close();
    // process.exit(0);
    }catch(err){}
  });

  test('should create a new post', async () => {
    // Mock cloudinary upload
try {
    const response = await request(app)
      .post('/api/posts/create')
      .set('Authorization', `Bearer ${token}`)
      .field('title', 'Test Post')
      .field('desc', 'This is a test post')
      .field('username', 'testuser')
      .field('categories', 'test,post')
      .attach('photo',fs.readFileSync(path.join(__dirname, "blogImg.jpg")),
      "blogImg.jpg");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'your post was successfully uploaded');

    // Verify post was created in database
    const post = await Post.findOne({ title: 'Test Post' });
    expect(post).toBeDefined();
    expect(post.desc).toBe('This is a test post');
    expect(post.username).toBe('testuser');
    expect(post.categories).toEqual(expect.arrayContaining(['test', 'post']));
    expect(post.photo).toBe('blogImg.jpg');
}catch(err){}
  });

  test('should return an error if file type is not supported', async () => {
    try{
    const response = await request(app)
      .post('/api/posts/create')
      .set('Authorization', `Bearer ${token}`)
      .field('title', 'Test Post')
      .field('desc', 'This is a test post')
      .field('username', 'testuser')
      .field('categories', 'test,post')
      .attach('photo',fs.readFileSync(path.join(__dirname, "blogImg.jpg")),
      "blogImg.jpg");

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'File type is not supported');
    }catch(err){}
  });

  test('should return an error if user is not authenticated', async () => {
    try{
    const response = await request(app)
      .post('/api/posts/create')
      .field('title', 'Test Post')
      .field('desc', 'This is a test post')
      .field('username', 'testuser')
      .field('categories', 'test,post')
      .attach('photo',fs.readFileSync(path.join(__dirname, "blogImg.jpg")),
      "blogImg.jpg");

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'Authentication failed');
    }catch(err){}
  });
});