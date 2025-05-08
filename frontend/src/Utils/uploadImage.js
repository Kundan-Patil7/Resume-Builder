import { API_PATHS } from './ApiPath';
import axiosInstance from './axiosInstance';

const uploadImage = async (imageFile) => {
  // Validate the file type before proceeding
  if (!imageFile || !imageFile.type.startsWith('image/')) {
    throw new Error('The uploaded file must be an image.');
  }

  const formData = new FormData();
  formData.append('image', imageFile);

  try {
    const response = await axiosInstance.post("/api/auth/upload-image", formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Set header for file upload
      },
    });

    // Check if response includes the expected data
    if (response.data && response.data.imageUrl) {
      return response.data.imageUrl; // Return only the image URL
    } else {
      throw new Error('Image upload failed. Please try again.');
    }
  } catch (error) {
    console.error('Error uploading the image:', error);

    // Provide a user-friendly error message
    throw new Error('Unable to upload the image. Please check your connection and try again.');
  }
};

export default uploadImage;
