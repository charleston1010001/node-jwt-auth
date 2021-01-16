import {NextFunction, Request, Response} from 'express'
import {IUser} from '../models/User.model'
import {db} from '../models'

const User = db.user

export const checkDuplicateUsername = (req: Request, res: Response, next: NextFunction) => {
    User.findOne({
        username: req.body.username
    }).exec((err: String, user: IUser) => {
        if (err) {
            res.status(500).send({ message: err })
            return
        }
        if (user) {
            res.status(400).send({ message: 'Username is already taken.' })
            return
        }
        next()
    })
}
