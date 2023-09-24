import { Router } from 'express'
import { addRole, getAllRole, getAllDeletedRole, getRoleById, updateRole, deleteRoleById } from '../controllers/role'

const router = Router()

router.get('/', getAllRole)

router.get('/archived', getAllDeletedRole)

router.get('/:id', getRoleById)

router.post('/', addRole)

router.patch('/', updateRole)

router.delete('/:id', deleteRoleById)

export default router