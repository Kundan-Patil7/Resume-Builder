const fs = require("fs");
const path = require("path");
const Resume = require("../models/Resume");
const upload = require("../middleware/uplodMiddleware");

const uploadResumeImage = async (req, res) => {
  try {
    upload.fields([{ name: "thumbnail" }, { name: "profileImage" }])(
      req,
      res,
      async (err) => {
        if (err) {
          return res.status(400).json({
            message: "File upload failed",
            error: err.message,
          });
        }

        const resumeId = req.params.id;
        const resume = await Resume.findOne({
          _id: resumeId,
          userId: req.user._id,
        });

        if (!resume) {
          return res.status(404).json({
            message: "Resume not found or unauthorized",
          });
        }

        const uploadsFolder = path.join(__dirname, "..", "uploads");
        const baseUrl = `${req.protocol}://${req.get("host")}`;

        // Corrected file access - matches the field names in upload.fields()
        const newThumbnail = req.files?.thumbnail?.[0];
        const newProfileImage = req.files?.profileImage?.[0];

        // If new thumbnail uploaded, delete old one
        if (newThumbnail) {
          if (resume.thumbnailLink) {
            const oldThumbnail = path.join(
              uploadsFolder,
              path.basename(resume.thumbnailLink)
            );
            try {
              if (fs.existsSync(oldThumbnail)) {
                fs.unlinkSync(oldThumbnail);
              }
            } catch (err) {
              console.error("Error deleting old thumbnail:", err);
            }
          }
          resume.thumbnailLink = `${baseUrl}/uploads/${newThumbnail.filename}`;
        }

        // If new profile image uploaded, delete old one
        if (newProfileImage) {
          if (resume.profileInfo?.profilePreviewUrl) {
            const oldProfile = path.join(
              uploadsFolder,
              path.basename(resume.profileInfo.profilePreviewUrl)
            );
            try {
              if (fs.existsSync(oldProfile)) {
                fs.unlinkSync(oldProfile);
              }
            } catch (err) {
              console.error("Error deleting old profile image:", err);
            }
          }
          resume.profileInfo.profilePreviewUrl = `${baseUrl}/uploads/${newProfileImage.filename}`;
        }

        await resume.save();

        res.status(200).json({
          message: "Images uploaded successfully",
          thumbnailLink: resume.thumbnailLink,
          profilePreviewUrl: resume.profileInfo?.profilePreviewUrl,
        });
      }
    );
  } catch (error) {
    console.error("Error in uploadResumeImage:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = { uploadResumeImage };
