import { Router } from 'express'
import { deleteTask, getTask, getTasks, postTask, updateTask } from '../controllers/task';
import validateToken from './validate-token';


const router = Router();

router.get('/', validateToken, getTasks);
router.get('/:id', validateToken, getTask);
router.post('/', validateToken, postTask);
router.delete('/:id', validateToken, deleteTask);
router.put('/:id', updateTask);

export default router;