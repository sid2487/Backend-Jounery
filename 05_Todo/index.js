// step1: import all required modules
import express from 'express';
import mongoose, { mongo } from 'mongoose';
import dotenv from 'dotenv';

// step2: configure dotenv to use .env file
dotenv.config();

// step3: create express app
const app = express();

// step4: middleware to parse json data in request body
app.use(express.json());

// step5: connect to mongodb using mongoose
mongoose
.connect(process.env.MONGO_URI)
.then(() => console.log("Mongo Connected"))
.catch((err) => console.error("Mongo connection error", err));

// step6: create a mongoose schema and model
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
});
const User = mongoose.model("User", userSchema);

// step7: create api routes

// test rotue
app.get("/", (req, res) => {
    res.send("welcome to the basic backend api");
});

// Post: add a user
app.post("/add-user", async(req, res) => { 
    try {
        const { name, email } = req.body;

        const newUser = new User({ name, email }); // You're creating a new document with the given name & email in monodb collection.
        await newUser.save(); //  This writes the document into the MongoDB database.
        // const newUser = await UserActivation.create({ name, email }); ahortcut to do both the steps.

        res.status(201).json({ success: true, user: newUser});
    } catch(error){
        res.status(400).json({success: false, message: error.message });
    }
});

// get all user
app.get("/users", async(req, res) => {
    try {
        const users = await User.find(); // fetch all uses from mongodb collection
        res.json({ success: true, users }); // send back a json response
    } catch (error) {
        res.status(500).json({ success: false, message: error.message});
    }
});


// step8: start server on port from .env
const PORT = process.env.PORT || 500;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);  
})


