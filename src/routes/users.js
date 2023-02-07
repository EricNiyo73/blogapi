import { Router } from 'express';
const router = Router();
import {update,findone,deletet} from '../controllers/users.controllers.js';
export default  (router) => {
 
  router.post('/:id',update);
  router.post('/:id',findone);
  router.post('/:id',deletet);
}