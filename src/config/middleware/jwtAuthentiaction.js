const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    // const token = req.header("Authorization");
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token." });
    }
};

const adminMiddleware = (req, res, next) => {
    if (!req.user || req.user.role !== "Admin") {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }
    next();
};

const generateVerificationToken = (userId, role) => {
    return jwt.sign({ userId, role }, process.env.EMAIL_SECRET, { expiresIn: "1h" });
};

module.exports = { authMiddleware, adminMiddleware, generateVerificationToken };
