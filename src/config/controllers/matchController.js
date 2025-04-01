const User = require("../model/userSchema");

const getMatches = async (req, res) => {
    try {
        const { minAge, maxAge, preferredReligion, preferredCaste, location, gender } = req.query;

        if (!minAge || !maxAge || !gender) {
            return res.status(400).json({ error: "Required fields: minAge, maxAge, gender" });
        }

        // Convert age range to date range
        const currentDate = new Date();
        const minDOB = new Date();
        minDOB.setFullYear(currentDate.getFullYear() - parseInt(maxAge, 10));
        const maxDOB = new Date();
        maxDOB.setFullYear(currentDate.getFullYear() - parseInt(minAge, 10));


        // Build query with case-insensitive matching
        let query = {
            _id: { $ne: req.user.id },
            // gender: gender.trim(), // Exclude logged-in user
            gender: { $regex: new RegExp(`^${gender}$`, "i") },
            dateOfBirth: { $gte: minDOB, $lte: maxDOB }, // Ensure proper age filtering
        };

        if (preferredReligion) query.religion = { $regex: new RegExp(`^${preferredReligion}$`, "i") };
        if (preferredCaste) query.caste = { $regex: new RegExp(`^${preferredCaste}$`, "i") };
        if (location) query.location = { $regex: new RegExp(location.trim(), "i") }; // Remove extra spaces


        // Fetch users & compute age dynamically
        const matches = await User.find(query).select("-password").lean();


        const processedMatches = matches.map(user => ({
            ...user,
            age: new Date().getFullYear() - new Date(user.dateOfBirth).getFullYear(),
        }));

        res.status(200).json(processedMatches);
    } catch (error) {
        console.error("Error fetching matches:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports = getMatches;
