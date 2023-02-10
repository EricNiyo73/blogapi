import  Router  from 'express';
const router = Router();
import {update,findone,deletet,findAll} from '../controllers/users.controllers.js';
  router.put('/:id',update);
  router.get('/getone/:id',findone);
  router.get("/getall",findAll);
  router.delete('/:id',deletet);
export default router;