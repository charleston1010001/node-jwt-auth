import { Schema, Document, model } from 'mongoose'

export interface IUser extends Document {
    userName: String,
    password: String
}

const UserSchema: Schema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
})

export default model<IUser>('User', UserSchema)
