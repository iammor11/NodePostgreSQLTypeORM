import { Request, Response, NextFunction, RequestHandler } from 'express'
import { RoleBody } from '../requestTypes'
import { Role } from '../entities/role'

export const addRole: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, permissions }: RoleBody = req.body
        const role = Role.create({ name, permissions })
        await role.save()
        const result = await Role.findOneBy({ id: role.id })
        return res.status(201).json({
            message: "Role has been created successfully",
            result
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error
        })
    }
}

export const getAllRole: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await Role.find()
        if (result?.length === 0) {
            return res.status(200).json({
                message: "There is no role"
            })
        }
        return res.status(200).json({
            message: "Successfully get all the roles",
            result
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error
        })
    }
}

export const getAllDeletedRole: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await Role.find({ withDeleted: true })
        if (result?.length === 0) {
            return res.status(200).json({
                message: "There is no deleted role"
            })
        }
        return res.status(200).json({
            message: "Successfully get all the deleted roles",
            result
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error
        })
    }
}

export const getRoleById: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const result = await Role.findOneBy({ id })
        if (!result) {
            return res.status(404).json({
                message: "There is no role with that id"
            })
        }
        return res.status(200).json({
            message: "Successfully get the role",
            result
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error
        })
    }
}

export const updateRole: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, data } = req.body
        const role = await Role.findOneBy({ id })
        if (!role) {
            return res.status(404).json({
                message: "There is no role with that id"
            })
        }
        const keys = Object.keys(data)
        const values = Object.values(data)
        for (let i = 0; i < keys.length; i++) {
            role[keys[i]] = values[i];
        }
        const result = await role.save()
        return res.status(201).json({
            message: "Role updated successfully",
            result
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error
        })
    }
}

export const deleteRoleById: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const role = await Role.findOneBy({ id })
        if (role) {
            await Role.delete(role.id)
            // await role.softRemove()
            return res.status(200).json({
                message: "Successfully delete the role"
            })
        } else {
            return res.status(404).json({
                message: "There is no role with that id"
            })
        }
    }
    catch (error) {
        return res.status(500).json({
            message: error.message ? error.message : "Something went wrong",
            error
        })
    }
}