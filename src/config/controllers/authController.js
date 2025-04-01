const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");
const { generateVerificationToken } = require("../middleware/jwtAuthentiaction");
const { sendVerificationEmail } = require("../services/emailService");

// Create User (Signup)
const registerUser = async (req, res) => {
    try {
        const { fullName, email, password, phone, gender, dateOfBirth, religion, caste, location, bio, role, profilePicture } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const currentDate = new Date();
        if (new Date(dateOfBirth) > currentDate) {
            return res.status(400).json({ error: "Invalid date of birth. Cannot be in the future." });
        }



        // Inside your user registration route
        if (!password || password.length < 3) {
            return res.status(400).json({ message: "Password must be at least 3 characters long" });
        }


        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        if (!profilePicture) {
            return res.status(400).json({ message: "Profile picture is required" });
        }

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
            phone,
            gender,
            dateOfBirth,
            religion,
            caste,
            location,
            bio,
            role: role || "User",
            profilePicture,
        });

        await newUser.save();

        const token = generateVerificationToken(newUser._id, newUser.role);
        await sendVerificationEmail(newUser.email, token);

        res.status(201).json({ message: "User registered successfully Check email for verification.", userId: newUser._id });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// Login User
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });


        if (!user.isVerified) {
            return res.status(403).json({ message: "Please verify your email before logging in." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.status(200).json({ token, user });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Logged-in User Profile
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { registerUser, loginUser, getUserProfile };
