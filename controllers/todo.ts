import { Request, Response, NextFunction, RequestHandler } from 'express'
import Todo from '../entities/todo'

export const addTodo: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, description } = req.body
        const data = { title, description }
        const todo = Todo.create({ ...data })
        const result = await todo.save()
        return res.status(201).json({
            message: "Todo has been created successfully",
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

export const getAllTodo: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await Todo.find()
        if (result?.length === 0) {
            return res.status(200).json({
                message: "There is no todo"
            })
        }
        return res.status(200).json({
            message: "Successfully get all the todos",
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

export const getAllDeletedTodo: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await Todo.find({ withDeleted: true })
        if (result?.length === 0) {
            return res.status(200).json({
                message: "There is no deleted todo"
            })
        }
        return res.status(200).json({
            message: "Successfully get all the deleted todos",
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

export const getTodoById: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const result = await Todo.findOneBy({ id })
        if (!result) {
            return res.status(404).json({
                message: "There is no todo with that id"
            })
        }
        return res.status(200).json({
            message: "Successfully get the todo",
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

export const updateTodo: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, data } = req.body
        const todo = await Todo.findOneBy({ id })
        if (!todo) {
            return res.status(404).json({
                message: "There is no todo with that id"
            })
        }
        const keys = Object.keys(data)
        const values = Object.values(data)
        for (let i = 0; i < keys.length; i++) {
            todo[keys[i]] = values[i];
        }
        const result = await todo.save()
        return res.status(201).json({
            message: "Todo updated successfully",
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

export const deleteTodoById: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const todo = await Todo.findOneBy({ id })
        if (!todo) {
            return res.status(404).json({
                message: "There is no todo with that id"
            })
        }
        await todo.softRemove()
        return res.status(200).json({
            message: "Successfully delete the todo"
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error
        })
    }
}