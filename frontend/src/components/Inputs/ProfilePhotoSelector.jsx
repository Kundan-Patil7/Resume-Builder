import React, { useRef, useState } from 'react';
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(preview || null);

  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Fixed typo `targe` to `target`

    if (file) {
      setImage(file); // Update the image state
      const preview = URL.createObjectURL(file); // Generate preview URL

      if (setPreview) {
        setPreview(preview);
      }
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);

    if (setPreview) {
      setPreview(null);
    }
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex justify-center mb-6">
      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange} // Fixed the syntax `onChange=(handleImagechange)` to `onChange={handleImageChange}`
        className="hidden"
      />

      {!image ? (
        <div className="relative w-20 h-20 flex items-center justify-center bg-gray-200 rounded-full cursor-pointer">
          <LuUser className="text-4xl text-gray-500" />
          <button
            type="button"
            className="absolute w-8 h-8 flex items-center justify-center bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-full bottom-0 right-0 transform translate-x-1 translate-y-1"
            onClick={onChooseFile}
          >
            <LuUpload />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={preview || previewUrl} // Fixed typo `prevoewUrl` to `previewUrl`
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover"
          />
          <button
            type="button"
            className="absolute w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full bottom-0 right-0 transform translate-x-1 translate-y-1"
            onClick={handleRemoveImage}
          >
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
