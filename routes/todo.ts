import { Router } from 'express'
import { addTodo, getAllTodo, getAllDeletedTodo, getTodoById, updateTodo, deleteTodoById } from '../controllers/todo'

const router = Router()

router.get('/', getAllTodo)

router.get('/archived', getAllDeletedTodo)

router.get('/:id', getTodoById)

router.post('/', addTodo)

router.patch('/', updateTodo)

router.delete('/:id', deleteTodoById)

export default router