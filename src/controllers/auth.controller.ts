import {Request, Response} from 'express';
import {IUser} from '../models/User.model';
import {secret} from '../config/auth.config'
import {db} from '../models'

const User = db.user;

const jwt = require('jsonwebtoken');
const bCrypt = require('bcryptjs');

const signUp = (req: Request, res: Response) => {
    console.log(req.body)
    const user = new User({
        userName: req.body.username,
        password: bCrypt.hashSync(req.body.password, 8)
    });
    user.save((err: Error) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.send({ message: 'User was registered successfully!' });
    });
};

const signIn = (req: Request, res: Response) => {
    User.findOne({
        userName: req.body.username
    })
    .exec((err: Error, user: IUser) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!user) {
            return res.status(404).send({ message: 'User Not found.' });
        }
        const passwordIsValid = bCrypt.compareSync(
            req.body.password,
            user.password
        );
        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: 'Invalid Password!'
            });
        }
        const token = jwt.sign({ id: user.id }, secret, {
            expiresIn: 60*60*24
        });
        res.status(200).send({
            id: user._id,
            username: user.userName,
            accessToken: token,
            expiryDate: new Date().getTime() + 60 * 60 * 24 * 1000
        });
    });
};

module.exports = {
    signUp,
    signIn
}
