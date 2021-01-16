import mongoose from 'mongoose'
import user from './User.model'
import event from './Event.model'
mongoose.Promise = global.Promise

export const db = {
    event,
    user,
    mongoose
};
