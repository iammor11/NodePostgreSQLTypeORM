import { Router } from 'express'
import { addTodo, getAllTodo, getAllDeletedTodo, getTodoById, updateTodoById, updateWholeTodoById, deleteTodoById } from '../controllers/todo'

const router = Router()

router.get('/', getAllTodo)

router.get('/deleted', getAllDeletedTodo)

router.get('/:id', getTodoById)

router.post('/', addTodo)

router.put('/', updateTodoById)

router.patch('/', updateWholeTodoById)

router.delete('/:id', deleteTodoById)

export default router