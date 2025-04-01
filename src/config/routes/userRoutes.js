const express = require("express");
const { authMiddleware, adminMiddleware } = require("../middleware/jwtAuthentiaction.js");
const { getAllUsers, getAnyUser, deleteUser, updatePartnerPreferences, getShortlistedProfiles, getPotentialMatches, sendRequest, cancelRequest, getSentRequests } = require("../controllers/userController");
const { shortlistProfile, checkShortlistStatus } = require("../controllers/shortListController.js")

const router = express.Router();


router.get("/shortlisted-profiles", authMiddleware, getShortlistedProfiles);
router.get("/getAll", authMiddleware, adminMiddleware, getAllUsers);
router.get("/potential-matches", authMiddleware, getPotentialMatches);
router.get("/sent-requests", authMiddleware, getSentRequests);
router.get("/:userId", authMiddleware, getAnyUser);
router.post("/cancel-request/:profileId", authMiddleware, cancelRequest);
router.delete("/:id", authMiddleware, adminMiddleware, deleteUser);
router.put("/preferences/:userId", authMiddleware, updatePartnerPreferences);
router.put("/shortlist/:profileId", authMiddleware, shortlistProfile);
router.get("/shortlist-status/:profileId", authMiddleware, checkShortlistStatus);
router.post("/send-request/:profileId", authMiddleware, sendRequest);



module.exports = router;