import { Request, Response, NextFunction, RequestHandler } from 'express'
import { Role } from '../entities/role'
import User from '../entities/user'
import { UserBody } from '../requestTypes'

export const addUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, firstName, lastName, password, roleId }: UserBody = req.body
        let role = null
        if (roleId) {
            role = await Role.findOneBy({ id: roleId })
            if (!role) {
                return res.status(404).json({
                    message: "There is no role with that id"
                })
            }
        }
        const user = User.create({ email, firstName, lastName, password, roleId: role })
        await user.save()
        const result = await User.findOne({ where: { id: user.id }, relations: { roleId: true } })
        return res.status(201).json({
            message: "User has been created successfully",
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

export const getAllUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await User.find({
            relations: {
                roleId: true,
            }
        })
        if (result?.length === 0) {
            return res.status(200).json({
                message: "There is no user"
            })
        }
        return res.status(200).json({
            message: "Successfully get all the users",
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

export const getAllDeletedUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await User.find({
            withDeleted: true,
            relations: {
                roleId: true,
            }
        })
        if (result?.length === 0) {
            return res.status(200).json({
                message: "There is no deleted user"
            })
        }
        return res.status(200).json({
            message: "Successfully get all the deleted users",
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

export const getUserById: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const result = await User.findOne({
            where: { id }, relations: {
                roleId: true
            }
        })
        if (!result) {
            return res.status(404).json({
                message: "There is no user with that id"
            })
        }
        return res.status(200).json({
            message: "Successfully get the user",
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

export const updateUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, data } = req.body
        const user = await User.findOneBy({ id })
        if (!user) {
            return res.status(200).json({
                message: "There is no user with that id"
            })
        }
        const keys = Object.keys(data)
        const values = Object.values(data)
        for (let i = 0; i < keys.length; i++) {
            User[keys[i]] = values[i];
        }
        const result = await User.save(user)
        return res.status(201).json({
            message: "User updated successfully",
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

export const deleteUserById: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const user = await User.findOneBy({ id })
        if (!user) {
            return res.status(404).json({
                message: "There is no user with that id"
            })
        }
        await User.softRemove(user)
        return res.status(200).json({
            message: "Successfully delete the user"
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error
        })
    }
}