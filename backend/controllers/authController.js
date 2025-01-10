import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { getUserByEmail, saveUser } from '../models/userModel.js';

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

// Register a new user
export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        // Hash the password
        const passwordHash = await bcrypt.hash(password, 10);

        // Save the user to the database
        const newUser = await saveUser({ username, email, passwordHash });

        res.status(201).json({ message: 'User registered successfully!', user: { id: newUser.id, username, email } });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user.', error: error.message });
    }
};

// Login a user
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user in the database
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful!', token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in user.', error: error.message });
    }
};

// Verify a JWT token
export const verifyToken = (req, res) => {
    res.status(200).json({ message: 'Token is valid!', user: req.user });
};