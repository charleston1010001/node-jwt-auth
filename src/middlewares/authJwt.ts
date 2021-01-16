import {NextFunction, Request, Response} from 'express'
import {secret} from '../config/auth.config'
import jwt, {JsonWebTokenError} from 'jsonwebtoken'

export const verifyToken = (req: Request & {userId?: string, decoded?: any}, res: Response, next: NextFunction) => {
    let token = req.headers['x-access-token'] as string || req.headers['authorization']

    if (!token) {
        return res.status(403).send({ message: 'No token provided!' })
    }

    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length)
    }

    jwt.verify(token as string, secret, (err: JsonWebTokenError | null, decoded: object & {id?: string} | undefined) => {
        if (err) {
            return res.status(401).send({ message: 'Unauthorized!' })
        }
        if (decoded) {
            req.userId = decoded.id
            req.decoded = decoded
        }
        next()
    })
}
