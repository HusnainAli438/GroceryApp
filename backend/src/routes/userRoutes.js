import express from 'express';

const router = express.Router();
import pool from '../config/db.js';
import { createNewUser ,getUsers,getUserById,deleteUserById,updateUserById } from '../controllers/userController.js';

router.post('/', createNewUser);
router.get('/',getUsers);
router.get('/:id',getUserById);
router.delete('/:id',deleteUserById);
router.patch('/:id',updateUserById);
export default router;