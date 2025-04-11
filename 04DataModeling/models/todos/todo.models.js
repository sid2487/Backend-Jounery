import mongoose from 'mongoose'

const todoSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    complete: {
        type: Boolean,
        default: false,
    },
    createdBy: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    subTodos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SubToDo',
        },
    ], // array of Sub-Todos
}, {timestamps: true})

export const ToDo = mongoose.model('ToDo', todoSchema)