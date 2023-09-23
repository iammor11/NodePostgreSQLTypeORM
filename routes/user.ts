import { Router } from 'express'
import { addUser, getAllUser, getAllDeletedUser, getUserById, updateUserById, updateWholeUserById, deleteUserById } from '../controllers/user'

const router = Router()

router.get('/', getAllUser)

router.get('/deleted', getAllDeletedUser)

router.get('/:id', getUserById)

router.post('/', addUser)

router.put('/', updateUserById)

router.patch('/', updateWholeUserById)

router.delete('/:id', deleteUserById)

export default router