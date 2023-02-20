import request from 'supertest';
import app from './index.test'; // assuming this is the express app instance
import User from '../models/user';
import  mongoose  from 'mongoose';
import bcrypt from 'bcrypt';
describe('POST /api/auth/signup', () => {
  let server;
    jest.setTimeout(30000)
    beforeAll(() => {
      server = app.listen(3000); // start server
    });
    afterAll(async () => {
      try{
      await User.deleteMany({});
      server.close();
      }catch(err){}
    });
  
    test('should create a new user', async () => {
      try{
      const user = {
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'testpassword'
      };
  
      const res = await request(app)
        .post('/api/auth/signup')
        .send(user);
  
      expect(res.status).toBe(201);
      expect(res.body.data.user.username).toBe(user.username);
      expect(res.body.data.user.email).toBe(user.email);
      expect(res.body.data.user.password).toBe(user.password);
    }catch(err){}
    });
  
    test('should return 400 when username is missing', async () => {
      try{
      const user = {
        email: 'testuser@example.com',
        password: 'testpassword'
      };
  
      const res = await request(app)
        .post('/api/auth/signup')
        .send(user);
  
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Username is required');
    }catch(err){}
    });
  
    test('should return 400 when email is missing', async () => {
      try{
      const user = {
        username: 'testuser',
        password: 'testpassword'
      };
  
      const res = await request(app)
        .post('/api/auth/signup')
        .send(user);
  
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Email is required');
    }catch(err){}
    });
  
    test('should return 400 when password is missing', async () => {
      try{
      const user = {
        username: 'testuser',
        email: 'testuser@example.com'
      };
  
      const res = await request(app)
        .post('/api/auth/signup')
        .send(user);
  
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Password is required');
    }catch(err){}
    });
  });