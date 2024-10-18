import express from 'express';
import { getCustomCars, createCustomCar } from '../controllers/customCarController.js';
import { updateCustomCar, deleteCustomCar ,getCustomCar} from '../controllers/customCarController.js';

const router = express.Router();

router.get('/items', getCustomCars);
router.get('/items/:id',getCustomCar);
router.post('/items', createCustomCar);
router.put('/items/:id', updateCustomCar);
router.delete('/items/:id', deleteCustomCar);

export default router;
