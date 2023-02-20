import mongoose from 'mongoose';
import User from '../models/User.js'; 
import app from './app.js';
import { findAll } from '../controllers/users.controllers.js';
import request from 'supertest';
import dotenv from "dotenv";
// import * as http from 'http';
// // import * as supertest from 'supertest';
// import * as Koa from 'koa';
// const apps = new Koa();
dotenv.config();
mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);
describe('findAll',() => {
    let testUsers;
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
    server = app.listen(3000);
      testUsers =  new User({ username: 'John Doe', email: 'johndoe@example.com', password: 'password123' });
      await testUsers.save();
    }catch(err){}
    });
  
    afterAll(async () => {
        try{
      await User.deleteMany({});
      await app.close();
        }catch(err){}
    });
  
    it('should return all users', async () => {
        // const apptest = supertest(http.createServer(apps.callback()));
      const res = await request(app)
      .get('/api/users/getall');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("data");
    });
  
    it('should return an error message when there is an error', async () => {
      await mongoose.connection.close();
    //   const apptest = supertest(http.createServer(apps.callback()));
      const res = await request(app)
      .get('/api/users/getall');
      expect(res.status).toBe(500);
      expect(res.body.message).toBeDefined();
    });
  });