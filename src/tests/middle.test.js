import jwt from  'jsonwebtoken';
import User from '../models/User';
import authMiddleware from '../middlewires/mustHveAccount';
import mongoose from 'mongoose';
import app from './app'
import request from 'supertest';
import dotenv from "dotenv";
dotenv.config();
mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);
// Define mock user data for testing

describe('authMiddleware', () => {
  let req, res, next;
  let server;
  beforeAll(() => {
    try{
      mongoose
      .connect(process.env.MONGO_TEST, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify:true
      })
      server = app.listen(3000);
    }catch(err){}
  });
  afterAll(async() => {
    try{
    await User.deleteMany({});
    server.close();
    }catch(err){}
  });
  jest.setTimeout(30000)
  beforeEach(() => {
    // Reset the request, response, and next functions before each test
    req = {
      headers: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  it('should call next() if a valid token is provided', async () => {
    // Mock a valid token
    try{
    const user = {
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'testpassword'
      };
  
      const res = await request(app)
        .post('/api/auth/signup')
        .send(user);
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    req.headers.authorization = `${token}`;
    User.findById = jest.fn().mockResolvedValue(user);
    await authMiddleware(req, res, next);
    expect(next).toHaveBeenCalled();
    }catch(err) {}
  });

  it('should return a 401 status if no token is provided', async () => {
    await authMiddleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'please! create an account' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return a 401 status if an invalid token is provided', async () => {
    const token = 'invalidtoken';
    req.headers.authorization = `Bearer ${token}`;
    await authMiddleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized,please Login' });
    expect(next).not.toHaveBeenCalled();
  });
});
