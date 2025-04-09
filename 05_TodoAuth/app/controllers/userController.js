import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// register
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password) 
        return res.status(400).json({ message: "All fields are required "});

    const userExist = await User.findOne({ email }); //  Search the database for an existing user with the same email.
    if(userExist) return res.status(400).json({message: "User exist"});

    const salt = await bcrypt.genSalt(10); // Generate a cryptographic salt using bcrypt.(A salt is random data added to a password before hashing, to increase security.)
    const hashed = await bcrypt.hash(password, salt); // Hash the password using bcrypt and the generated salt.

    // const hashed = await bcrypt.hash(password, 10); this single line also works as above two lines but above lines give more control.


    const user = await User.create({ name, email, password: hashed }); // Create a new user in the database with the hashed password.
    res.status(201).json({ user });
}

//login
export const loginUser = async  (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password); // bcrypt.compare() extracts salt from storedHashedPassword, Hashes enteredPassword with it then compares both hashes.
    if(!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" }); // jwt token generation and jwt.sign creates a signed token (i.e., JWT) that the server gives to the user after successful login or registration.

    res.json({ token }); // Send the token to frontend (usually saved in cookies or localStorage)
}
   


