import React, { useContext, useState } from 'react';
import HERO from '../assets/HERO.jpeg';
import { useNavigate } from 'react-router-dom';
import Login from './Auth/Login';
import SighUp from './Auth/SighUp';
import Model from '../components/Modal';
import Modal from '../components/Modal';
import { UserContext } from '../Context/userContext';
import ProfileInfocard from '../components/Cards/ProfileInfocard';


const LandingPage = () => {
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");
    const {user}= useContext(UserContext);
  const handleCTA = () => {
   
  };

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-16">
          <div className="text-2xl font-bold   " 
          style={{
              background: "linear-gradient(135deg, #00FF7F, #1E90FF, #FF69B4, #FFD700, #9400D3)",
              backgroundSize: "300% 300%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "pattern-animation 5s ease infinite",
            }}>Resume Builder</div>
         { user ?  <ProfileInfocard />   : <button
            className="bg-purple-100 text-sm font-semibold text-black px-4 py-2.5  rounded-lg hover:bg-gray-700 hover:text-white transition-colors cursor-pointer"
            onClick={() => setOpenAuthModal(true)}
          > 
            Login/Sign Up
          </button>}
        </header>

        {/* Hero Content */}
        <div className="flex flex-col md:flex-row  md:px-25 items-center">
          <div className="w-full md:w-1/2 pr-4 mb-8 md:mb-0">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Build Your{" "}
              <span className="flowing-radial-text">
      Resume Effortlessly
    </span>

            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Craft a standout resume in minutes with our smart and intuitive resume builder.
            </p>
            <button
              className="bg-black text-sm font-semibold text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
              onClick={handleCTA}
            >
              Get Started
            </button>
          </div>
          <div className="w-full md:w-1/2">
            <img src={HERO} alt="Hero" className="w-full rounded-lg" />
          </div>
        </div>

        {/* Features Section */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-center mb-12">
            Features That Make You Shine
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Feature 1 */}
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <h3 className="text-lg font-semibold mb-3">Easy Editing</h3>
              <p className="text-gray-600">
                Update your resume sections with live previews and instant formatting.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <h3 className="text-lg font-semibold mb-3">Beautiful Templates</h3>
              <p className="text-gray-600">
                Choose from modern, professional templates that are easy to customize.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <h3 className="text-lg font-semibold mb-3">One-Click Export</h3>
              <p className="text-gray-600">
                Download your resume instantly as a high-quality PDF with one click.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="text-sm bg-gray-50 text-secondary text-center p-5 mt-5">
          Made with ❤️...
        </div>
      </div>

      {/* Modal for Authentication */}
      {openAuthModal && (
        <Modal
          isOpen={openAuthModal}
          onClose={() => {
            setOpenAuthModal(false);
            setCurrentPage("login");
          }}
        >
          <div>
            {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
            {currentPage === "signup" && <SighUp setCurrentPage={setCurrentPage} />}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default LandingPage;
