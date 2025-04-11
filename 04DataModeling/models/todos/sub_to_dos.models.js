import mongoose from mongoose

const subToDoSchema  = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    complete: {
        type: Boolean,
        default: false,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObectId,
        ref: 'User',
    },
    
}, {timestamps: true})

export const SubToDo  = mongoose.model('SubToDo', subToDoSchema)