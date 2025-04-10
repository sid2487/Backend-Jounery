import Todo from "../models/todoModel.js";

// Attach the logged-in user's ID to the Todo using req.user._id from decoded JWT
export const createTodo = async (req, res) => {
    const todo = await Todo.create(({ ...req.body, user: req.user._id }));
    res.status(201).json({ success: true, todo }); 
};

// Fetch all Todos that belong to the logged-in user using req.user._id from the JWT
export const getTodos = async (req, res) => {
    const todos = await Todo.find({ user: req.user._id }); // This tells MongoDB to find all Todo documents that belong to this specific user by matching the user field in the Todo collection.
    res.json({ success: true, todos });
};

// Updates a Todo if it belongs to the logged-in user and returns the updated document.
export const updateTodo = async (req, res) => {
    const todo = await Todo.findOneAndUpdate(
        {_id: req.params.id, user: req.user._id }, // check the id from url and update it and ensure that that you're updataing the login user only
        req.body, // The new data sent by the user (e.g., new title or status).
        { new: true } // This tells Mongoose to return the updated document (instead of the old one).
    );
    res.json({ success: true, todo });
};

export const deleteTodo = async (req, res) => {
    await Todo.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    res.json({ success: true, message: "Todo deleted" });
};