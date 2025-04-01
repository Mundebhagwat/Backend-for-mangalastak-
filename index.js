const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./src/config/config");
const { Server } = require("socket.io");
const http = require("http");
const userRoutes = require("./src/config/routes/userRoutes");
const authRoutes = require("./src/config/routes/authRoutes");
const matchProfilesRoutes = require("./src/config/routes/matchRoutes");
const requestRoutes = require("./src/config/routes/requestRoutes");
const emailVerifyRoutes = require("./src/config/routes/emailVerifyRoutes");
const messageRoutes = require("./src/config/routes/messageRoutes");

const app = express();
dotenv.config();
connectDB();

// server for scoket io
// const server = http.createServer(app);

// middleware
// CORS Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json({ limit: "10mb" }));


// routes
app.get("/", (req, res) => {
    res.send("Matrimonial Backend is Running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/match", matchProfilesRoutes);
app.use("/api/request", requestRoutes);
app.use("/api/emailverify", emailVerifyRoutes);
app.use("/api/message", messageRoutes)


// // Initialize Socket.io with CORS
// const io = new Server(server, {
//     cors: {
//         origin: "http://localhost:5173",
//         methods: ["GET", "POST"],
//     },
// });


// io.on("connection", (socket) => {
//     console.log("✅ User connected:", socket.id);

//     socket.on("joinChat", (chatRoom) => {
//         socket.join(chatRoom);
//         console.log(`🔹 User joined chat room: ${chatRoom}`);
//     });

//     socket.on("sendMessage", (message) => {
//         console.log("📨 Message sent:", message);

//         // 🔹 Emit the message only to users in the same chatRoom
//         io.to(message.chatRoom).emit("receiveMessage", message);
//     });

//     socket.on("disconnect", () => {
//         console.log("❌ User disconnected:", socket.id);
//     });
// });



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
