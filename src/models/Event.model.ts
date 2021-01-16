import { Schema, Document, model } from 'mongoose'

export interface IEvent extends Document {
    text: String,
    date: number
}

const EventSchema: Schema = new Schema({
    text: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
})

export default model<IEvent>('Event', EventSchema)
