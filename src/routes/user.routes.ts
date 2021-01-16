import {Express} from 'express'
import {verifyToken, reqHeader} from '../middlewares'
const controller = require('../controllers/user.controller');

module.exports = function(app: Express) {
    app.use(reqHeader);

    app.get('/api/test/all', controller.allAccess);

    app.get('/api/test/user', [verifyToken], controller.userBoard);
};
