const fs = require("node:fs");
const path = require("node:path");
const Resume = require("../models/Resume");

const createResume = async (req, res) => {
  try {
    const { title } = req.body;

    // Validate required fields
    if (!title) {
      return res.status(400).json({ message: "Title is required." });
    }

    // Default resume data
    const defaultResumeData = {
      profileInfo: {
        profilePreviewUrl: "",
        fullName: "",
        designation: "",
        summary: "",
      },
      contactInfo: {
        email: "",
        phone: "",
        location: "",
        linkedin: "",
        github: "",
        website: "",
      },
      workExperience: [
        {
          company: "",
          role: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
      education: [
        {
          degree: "",
          institution: "",
          startDate: "",
          endDate: "",
        },
      ],
      skills: [
        {
          name: "",
          progress: "",
        },
      ],
      projects: [
        {
          title: "",
          description: "",
          github: "",
          liveDemo: "",
        },
      ],
      certifications: [
        {
          title: "",
          issuer: "",
          year: "",
        },
      ],
      languages: [
        {
          name: "",
          progress: "",
        },
      ],
      interests: [""],
    };

    // Create the resume with default data and user input
    const newResume = await Resume.create({
      userId: req.user._id,
      title,
      ...defaultResumeData,
    });

    // Send success response
    res.status(201).json({
      message: "Resume created successfully.",
      resume: newResume,
    });
  } catch (error) {
    console.error("Error creating resume:", error);
    res.status(500).json({
      message: "Failed to create resume.",
      error: error.message,
    });
  }
};

const getUserResume = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user._id }).sort({
      updatedAt: -1,
    });

    res.status(200).json(resumes);
  } catch (error) {
    console.error("Error fetching user resumes:", error);
    res.status(500).json({
      message: "Failed to fetch resumes.",
      error: error.message,
    });
  }
};

const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found.",
      });
    }

    res.status(200).json(resume);
  } catch (error) {
    console.error("Error fetching resume by ID:", error);
    res.status(500).json({
      message: "Failed to fetch resume.",
      error: error.message,
    });
  }
};

const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found or unauthorized.",
      });
    }

    Object.assign(resume, req.body);
    const updatedResume = await resume.save();

    res.status(200).json({
      message: "Resume updated successfully.",
      resume: updatedResume,
    });
  } catch (error) {
    console.error("Error updating resume:", error);
    res.status(500).json({
      message: "Failed to update resume.",
      error: error.message,
    });
  }
};


const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found or unauthorized.",
      });
    }

    // Delete thumbnail and profile preview url images from folder
    const uploadsFolder = path.join(__dirname, "..", "uploads");
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    try {
      // Delete thumbnail image if exists
      if (resume.thumbnailLink) {
        const thumbnailPath = resume.thumbnailLink.replace(baseUrl, '');
        const oldThumbnail = path.join(uploadsFolder, path.basename(thumbnailPath));
        if (fs.existsSync(oldThumbnail)) {
          fs.unlinkSync(oldThumbnail);
        }
      }

      // Delete profile image if exists
      if (resume.profileInfo?.profilePreviewUrl) {
        const profilePath = resume.profileInfo.profilePreviewUrl.replace(baseUrl, '');
        const oldProfile = path.join(uploadsFolder, path.basename(profilePath));
        if (fs.existsSync(oldProfile)) {
          fs.unlinkSync(oldProfile);
        }
      }
    } catch (fileError) {
      console.error("Error deleting associated files:", fileError);
      // Continue with resume deletion even if file deletion fails
    }

    const deletedResume = await Resume.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!deletedResume) {
      return res.status(404).json({
        message: "Resume not found or already deleted.",
      });
    }

    res.status(200).json({
      message: "Resume deleted successfully.",
      resumeId: req.params.id,
    });
  } catch (error) {
    console.error("Error deleting resume:", error);
    res.status(500).json({
      message: "Failed to delete resume.",
      error: error.message,
    });
  }
};

module.exports = {
  createResume,
  getUserResume,
  getResumeById,
  updateResume,
  deleteResume,
};