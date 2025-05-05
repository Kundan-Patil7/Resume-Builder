const express = require("express");
const {
  createResume,
  getUserResume,
  getResumeById,
  updateResume,
  deleteResume,
} = require("../controllers/resumeController");

const { protect } = require("../middleware/authMiddleware");
const { uploadResumeImage } = require("../controllers/uploadImage");

const router = express.Router();

// Apply protect middleware globally
router.use(protect);

// Create a resume
router.post("/", createResume);

// Get user resumes
router.get("/", getUserResume);

// Get a specific resume by ID
router.get("/:id", getResumeById);

// Update a resume
router.put("/:id", updateResume);

// Delete a resume
router.delete("/:id", deleteResume);

// Upload images for a resume
router.put("/:id/upload-images", uploadResumeImage);

module.exports = router;
