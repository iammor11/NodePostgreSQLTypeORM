import { Router } from 'express'
import { addUser, getAllUser, getAllDeletedUser, getUserById, updateUser, deleteUserById } from '../controllers/user'

const router = Router()

router.get('/', getAllUser)

router.get('/archived', getAllDeletedUser)

router.get('/:id', getUserById)

router.post('/', addUser)

router.patch('/', updateUser)

router.delete('/:id', deleteUserById)

export default router