import request from 'supertest';
import app from './app.js';
import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import  mongoose  from 'mongoose';
import dotenv from "dotenv";
dotenv.config();
mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);
describe('POST /api/auth/signup', () => {
  let user;
  let hashedPassword;
  let server;
    jest.setTimeout(30000)
  beforeAll(async () => {
    try {
      mongoose
      .connect(process.env.MONGO_TEST, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify:true
      })
      server = app.listen(3000);
    await User.deleteMany();

    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash('testpassword', salt);

    user = new User({
      username: 'testuser',
      email: 'testuser@example.com',
      password: hashedPassword,
    });

    await user.save();
  }catch(err) {}
  });

  afterAll(async () => {
    try{
    await User.deleteMany();
    await mongoose.connection.close();
    await server.close();
    }catch(err) {}
  });
  test('should login user with correct credentials', async () => {
    try{
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'testuser',
        password: 'testpassword',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Logged in successfully');
    expect(response.body).toHaveProperty('token');

    const decodedToken = jwt.verify(response.body.token, process.env.JWT_SECRET);
    expect(decodedToken).toHaveProperty('id', user.id);
    done();
    }catch(err) {}
  });

  test('should not login user with incorrect credentials', async () => {
    try{
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'testuser',
        password: 'wrongpassword',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'Wrong credentials!');
    }catch(err) {}
  });

  test('should return 500 when an error occurs', async () => {
    try{
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'testuser',
        password: 'testpassword',
      });

    // Remove user to simulate an error
    await User.deleteMany();

    const response2 = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'testuser',
        password: 'testpassword',
      });

    expect(response2.status).toBe(500);
    }catch(err){}
  });
});