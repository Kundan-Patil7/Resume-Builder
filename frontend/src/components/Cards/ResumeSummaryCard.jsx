import React, { useEffect, useState } from 'react';
import { getLightColorFromImage } from '../../Utils/healper';

const ResumeSummaryCard = ({
  imgUrl,
  onSelect,
  title,
  lastUpdated,
}) => {
  const [bgColor, setBgColor] = useState('#ffffff');

  useEffect(() => {
    if (imgUrl) {
      getLightColorFromImage(imgUrl)
        .then((color) => {
          setBgColor(color);
        })
        .catch(() => {
          setBgColor('#ffffff');
        });
    }
  }, [imgUrl]);

  return (
    <div
      className="h-[300px] flex flex-col items-center justify-between rounded-lg border border-gray-200 hover:border-purple-300 overflow-hidden cursor-pointer"
      style={{ backgroundColor: bgColor }} // Apply dynamic background
      onClick={onSelect}
    >
      {/* Image Section */}
      <div className="p-4 w-full h-[200px] flex items-center justify-center">
        {imgUrl ? (
          <img
            src={imgUrl}
            alt="Resume Thumbnail"
            className="'w-[100%] h-[200px] pt-3 object-cover rounded"
          />
        ) : (
          <div className="text-gray-400 text-sm">No Image Available</div>
        )}
      </div>

      {/* Details Section */}
      <div className="w-full bg-white p-4 py-3">
        <h5 className="text-sm font-medium truncate overflow-hidden whitespace-nowrap">
          {title}
        </h5>
        <p className="text-xs font-medium text-gray-500 mt-1">
          Last Updated: {lastUpdated}
        </p>
      </div>
    </div>
  );
};

export default ResumeSummaryCard;
