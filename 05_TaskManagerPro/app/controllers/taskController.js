import Task from "../models/task.model.js";

export const createTask = async (req, res) => {
    const { title, description, status } = req.body;
    const task = await Task.create({
        title,
        description,
        status,
        user: req.user._id, 
    });

    res.status(201).json(task);
};

export const getTasks = async (req, res) => {
    const tasks = await Task.find({ user: req.user._id });
    res.json(tasks);
};

export const updateTask = async (req, res) => {
    const task = await Task.findOneAndUpdate(
        { _id: req.params.id, user: req.user._id },
        req.body,
        { new: true } // it returns the updated document after the update.
    );

    if(!task) {
        res.status(404);
        throw new Error("Task not found");
    }

    res.json(task);
};

export const deleteTask = async (req, res) => {
    const task = await Task.findOneAndDelete(
        {_id: req.params.id, user: req.user._id }
    );
    if(!task) {
        res.status(404);
        throw new Error("Task not found");
    }

    res.json({ message: "Task deleted successfully" });
};

// admin : get all tasks
export const getAllTasks = async (req, res) => {
    const tasks = await Task.find().populate("users", "name email"); // It replaces the users field’s ObjectId(s) with the actual user data(here name and email only).
    res.json({ success: true, tasks });
};