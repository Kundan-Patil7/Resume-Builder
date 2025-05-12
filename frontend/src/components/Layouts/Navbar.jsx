import React from 'react';
import ProfileInfocard from "../Cards/ProfileInfocard";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="h-16 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-2.5 px-4 md:px-0 sticky top-0 z-30">
      <div className="container mx-auto flex items-center justify-between gap-5">
        <Link to={"/dashboard"}>
          <h2
            className="text-lg md:text-xl font-extrabold md:pl-20 leading-5"
            style={{
              background: "linear-gradient(135deg, #00FF7F, #1E90FF, #FF69B4, #FFD700, #9400D3)",
              backgroundSize: "300% 300%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "pattern-animation 5s ease infinite",
            }}
          >
            Resume Builder
          </h2>
        </Link>

        <ProfileInfocard />
      </div>
    </div>
  );
};

export default Navbar;
