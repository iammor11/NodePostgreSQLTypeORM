// import { createCsrfToken } from '../middlewares/csrfToken'
// import crypto from 'crypto'
import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { SECRET_KEY } from '../config'
import { LoginBody, UserBody } from '../requestTypes'
import User from '../entities/user'
import { Role } from '../entities/role'

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password }: LoginBody = req.body
        const user = await User.findOneBy({ email })
        if (!user) {
            return res.status(422).json({
                message: "User not found!"
            })
        }
        const matchPass = await bcrypt.compare(password, user.password)
        if (!matchPass) {
            return res.status(422).json({
                message: "Password may be wrong!"
            })
        }
        if (matchPass) {
            const token = jwt.sign({
                id: user.id
            },
                SECRET_KEY,
                {
                    expiresIn: "1h"
                }
            )
            // req.session.isLoggedIn = true;
            // req.session.user = user;
            return res.status(200).json({
                message: "Login successfully",
                token,
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

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { firstName, lastName, email, password, roleId }: UserBody = req.body
        const checkUser = await User.findOneBy({ email })
        if (checkUser) {
            return res.status(401).json({
                message: "E-Mail already exists, Please try with a new one."
            })
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        let role: any = null
        if (roleId) {
            role = await Role.findOneBy({ id: roleId })
            if (!role) {
                return res.status(404).json({
                    message: "There is no role with that id"
                })
            }
        }
        const user = User.create({ email, firstName, lastName, password: hashedPassword, roleId: role })
        await user.save()
        return res.status(200).json({
            message: "Successfully registered!"
        })
    }
    catch (error) {
        return res.status(500).json({
            message: error.message ? error.message : "Something went wrong",
            error
        })
    }
}