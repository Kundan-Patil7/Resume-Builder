// import React, { useEffect, useRef, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   LuArrowLeft,
//   LuCircleAlert,
//   LuDownload,
//   LuPalette,
//   LuTrash2,
// } from "react-icons/lu";

// import toast from "react-hot-toast";
// import DashboardLayout from "../../components/Layouts/DashboardLayout";
// import TitleInput from "../../components/Inputs/TitleInput";
// import {useReactToPrint} from 'react-to-print'
// const EditResume = () => {
//   const { resumeId } = useParams();
//   const navigate = useNavigate();
//   const resumeRef = useRef(null);
//   const resumeDownloadRef = useRef(null);

//   const [baseWidth, setBaseWidth] = useState(800);
//   const [openThemeSelector, setOpenThemeSelector] = useState(false);
//   const [openPreviewModel, setOpenPreviewModel] = useState(false);
//   const [currentPage, setCurrentPage] = useState("profile-info");
//   const [progress, setProgress] = useState(0);

//   const [resumeData, setResumeData] = useState({
//     title: "",
//     thumbnailLink: "",
//     profileInfo: {
//       profilePreviewUrl: "",
//       fullName: "",
//       designation: "",
//       summary: "",
//     },
//     template: {
//       theme: "",
//       colorPalette: [""],
//     },
//     contactInfo: {
//       email: "",
//       phone: "",
//       location: "",
//       linkedin: "",
//       github: "",
//       website: "",
//     },
//     workExperience: [
//       {
//         company: "",
//         role: "",
//         startDate: "",
//         endDate: "",
//         description: "",
//       },
//     ],
//     education: [
//       {
//         degree: "",
//         institution: "",
//         startDate: "",
//         endDate: "",
//       },
//     ],
//     skills: [
//       {
//         name: "",
//         progress: 0,
//       },
//     ],
//     projects: [
//       {
//         title: "",
//         description: "",
//         github: "",
//         liveDemo: "",
//       },
//     ],
//     certifications: [
//       {
//         title: "",
//         issuer: "",
//         year: "",
//       },
//     ],
//     languages: [
//       {
//         name: "",
//         progress: 0,
//       },
//     ],
//     interests: [""], // Corrected from 'intereste'
//   });

//   const [errorMsg, setErrorMsg] = useState("");
//   const [isLoading, setIsLoading] = useState(false);


// // validate inputs
// const validateAndNext = (e) => {};

// //function to navigate to next page 
// const goToNextStep = ()=> {};
 

// //function to navigate to back page 
// const  goBack = () => {};


// const renderForm =()=>{};

// //update simple nested object (like profile info , constacINfo etc)

// const updateSection = (section , key , value) => {};

// // updates array item (like workExperience[0], skill[1], etc)

// const updateArrayItem = (section , index, key ,value)=> {};
 
// // add item to array 
// const addArrayItem = (sectiton, newItem) => {};

// //remove item form array
// const removeArrayItems= (section,index) => {};

// // fetch resume info by ID

// const fetchResumeDetailsById= async () =>{};

// // upload thubnail and resume profile img

// const updateResumeDetails = async(thubnailLink,profilePreviewUrl) =>{};

// // Delete Resume 
// const handleDeleteResume = async () =>{};

// // download resume
// const reactToPrintFn = useReactToPrint({contentRef: resumeDownloadRef});

// // function to update baseWidth based on the resume container size 
// const updateBaseWidth = () =>{};


// useEffect(() => {
  
//   updateBaseWidth();
//   Window.addEventListener("resize", updateBaseWidth);
//   if(resumeId){
//     fetchResumeDetailsById();

//     return()=>.{
//       window.removeEventListener("resize",updateBaseWidhth);
//     }

//   }
// }, [])



//   return (
//     <DashboardLayout>
//       <div className="container mx-auto">
//         <div className="flex items-center justify-center gap-5 bg-white rounded-lg border-purple-100 py-3 px-4 mb-4">
//           <TitleInput
//             title={resumeData.title}
//             setTitle={(value) =>
//               setResumeData((prevState) => ({
//                 ...prevState,
//                 title: value,
//               }))
//             }
//           />
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// };

// export default EditResume;




import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  LuArrowLeft,
  LuCircleAlert,
  LuDownload,
  LuPalette,
  LuTrash2,
} from "react-icons/lu";

import toast from "react-hot-toast";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import TitleInput from "../../components/Inputs/TitleInput";
import { useReactToPrint } from "react-to-print";

const EditResume = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();
  const resumeRef = useRef(null);
  const resumeDownloadRef = useRef(null);

  const [baseWidth, setBaseWidth] = useState(800);
  const [openThemeSelector, setOpenThemeSelector] = useState(false);
  const [openPreviewModal, setOpenPreviewModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("profile-info");
  const [progress, setProgress] = useState(0);

  const [resumeData, setResumeData] = useState({
    title: "",
    thumbnailLink: "",
    profileInfo: {
      profilePreviewUrl: "",
      fullName: "",
      designation: "",
      summary: "",
    },
    template: {
      theme: "",
      colorPalette: [""],
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
        progress: 0,
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
        progress: 0,
      },
    ],
    interests: [""],
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // validate inputs
  const validateAndNext = (e) => {};

  // function to navigate to next page
  const goToNextStep = () => {};

  // function to navigate to back page
  const goBack = () => {};

  const renderForm = () => {};

  // update simple nested object (like profile info, contactInfo, etc.)
  const updateSection = (section, key, value) => {};

  // updates array item (like workExperience[0], skill[1], etc.)
  const updateArrayItem = (section, index, key, value) => {};

  // add item to array
  const addArrayItem = (section, newItem) => {};

  // remove item from array
  const removeArrayItems = (section, index) => {};

  // fetch resume info by ID
  const fetchResumeDetailsById = async () => {};

  // upload thumbnail and resume profile image
  const updateResumeDetails = async (thumbnailLink, profilePreviewUrl) => {};

  // delete resume
  const handleDeleteResume = async () => {};

  // download resume
  const reactToPrintFn = useReactToPrint({ content: () => resumeDownloadRef.current });

  // function to update baseWidth based on the resume container size
  const updateBaseWidth = () => {};

  useEffect(() => {
    updateBaseWidth();
    window.addEventListener("resize", updateBaseWidth);

    if (resumeId) {
      fetchResumeDetailsById();
    }

    return () => {
      window.removeEventListener("resize", updateBaseWidth);
    };
  }, []);

  return (
    <DashboardLayout>
      <div className="container mx-auto">
        <div className="flex items-center justify-center gap-5 bg-white rounded-lg border-purple-100 py-3 px-4 mb-4">
          <TitleInput
            title={resumeData.title}
            setTitle={(value) =>
              setResumeData((prevState) => ({
                ...prevState,
                title: value,
              }))
            }
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EditResume;

