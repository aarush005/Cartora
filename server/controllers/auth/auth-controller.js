const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

// Register User
const registerUser = async (req, res) => {
    const { userName, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email is already in use",
            });
        }

        // Hash password
        const hashPassword = await bcrypt.hash(password, 12);

        // Save user to DB
        const newUser = new User({
            userName,
            email,
            password: hashPassword // ✅ Fix applied here
        });

        await newUser.save();

        res.status(201).json({
            success: true,
            msg: "User created successfully",
        });

    } catch (e) {
        console.error("Error in registerUser:", e);
        res.status(500).json({
            success: false,
            message: "Error registering user"
        });
    }
};

module.exports = { registerUser };
