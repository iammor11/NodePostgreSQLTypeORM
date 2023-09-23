import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken'

const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const secretKey = process.env.SECRET_KEY
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res.status(401).json({
        message: "Auth failed, There is no authorization header."
      })
    }
    const token = authHeader.split(" ")[1]
    let decodedToken: any
    try {
      secretKey ? decodedToken = jwt.verify(token, secretKey) : res.status(500).json({ message: "Can't verify authentication token, please login again" })
    }
    catch (error) {
      return res.status(500).json({
        message: "Can't verify authentication token, please login again",
        error
      })
    }
    // req.userId = decodedToken
    next()
  } catch (error) {
    return res.status(401).json({
      message: 'Auth failed',
      error
    })
  }
}

export default verifyJWT