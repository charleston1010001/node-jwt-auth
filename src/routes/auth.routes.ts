import {Express} from 'express'
import {reqHeader, checkDuplicateUsername} from '../middlewares'
const controller = require('../controllers/auth.controller');

module.exports = function(app: Express) {
    app.use(reqHeader);

    app.post(
        '/api/auth/signup',
        [checkDuplicateUsername],
        controller.signUp
    );

    app.post('/api/auth/signin', controller.signIn);
};
