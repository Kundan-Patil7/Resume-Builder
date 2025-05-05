export const { BASE_URL } = "http://localhost:8000";

// utils/apiPaths.js
export const { API_PATHS } = {
  AUTH: {
    REGISTER: "/api/auth/register", // Signup
    LOGIN: "/api/auth/login", // Authenticate user & get token
    GET_PROFILE: "/api/auth/profile", // Get user details
  },
  RESUME: {
    CREATE: "/api/resume", // POST - Create new resume
    GET_ALL: "/api/resume", // GET - Get user's resumes
    GET_BY_ID: (id) => `/api/resume/${id}`, // GET - Get specific resume
    UPDATE: (id) => `/api/resume/${id}`, // PUT - Update resume
    DELETE: (id) => `/api/resume/${id}`, // DELETE - Delete resume
    UPLOAD_IMAGES: (id) => `/api/resume/${id}/upload-images`, // PUT - Upload images
  },
  IMAGE: {
    UPLOAD_IMAGE: "/api/image/upload", // More standard path
  },
};

//1.45
