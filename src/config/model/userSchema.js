// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema(
//     {
//         fullName: { type: String, required: true },
//         email: { type: String, required: true, unique: true },
//         password: { type: String, required: true }, // Hashed password
//         phone: { type: String, required: true, },
//         gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
//         dateOfBirth: { type: Date, required: true },
//         religion: { type: String },
//         caste: { type: String },
//         location: { type: String },
//         bio: { type: String, maxlength: 500 },
//         profilePicture: { type: String }, // Cloudinary/Firebase URL
//         partnerPreferences: {
//             minAge: { type: Number },
//             maxAge: { type: Number },
//             preferredReligion: { type: String },
//             preferredCaste: { type: String },
//             location: { type: String },
//             preferredGender: { type: String, enum: ["Male", "Female", "Other"] },
//             education: { type: String },
//             occupation: { type: String },
//         },
//         shortlistedProfiles: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
//         sentRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
//         receivedRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
//         role: { type: String, enum: ["User", "Admin"], default: "User" },
//         isVerified: { type: Boolean, default: false },
//         sentRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
//         receivedRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
//     },
//     { timestamps: true }
// );

// const User = mongoose.model("User", userSchema);
// module.exports = User;



const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true }, // Hashed password
        phone: { type: String, required: true },
        gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
        dateOfBirth: { type: Date, required: true },
        religion: { type: String },
        caste: { type: String },
        location: { type: String },
        bio: { type: String, maxlength: 500 },
        profilePicture: { type: String }, // Cloudinary/Firebase URL
        partnerPreferences: {
            minAge: { type: Number },
            maxAge: { type: Number },
            preferredReligion: { type: String },
            preferredCaste: { type: String },
            location: { type: String },
            preferredGender: { type: String, enum: ["Male", "Female", "Other"] },
            education: { type: String },
            occupation: { type: String },
        },
        shortlistedProfiles: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

        // ✅ New Structure: Maintain Compatibility
        sentRequests: [
            {
                userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
                status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
            },
        ],

        receivedRequests: [
            {
                userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
                status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
            },
        ],

        role: { type: String, enum: ["User", "Admin"], default: "User" },
        isVerified: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
