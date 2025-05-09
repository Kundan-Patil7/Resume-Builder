import React, { useEffect, useState } from 'react';
import axiosInstance from '../../Utils/axiosInstance';
import { API_PATHS } from '../../Utils/ApiPath';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/Layouts/DashboardLayout';
import { LuCirclePlus } from 'react-icons/lu';
import moment from 'moment';
import ResumeSummaryCard from '../../components/Cards/ResumeSummaryCard';
import CreatResumeForm from './CreatResumeForm';
import Modal from '../../components/Modal';

const Dashboard = () => {
  const navigate = useNavigate();

  const [openCreateModel, setOpenCreateModel] = useState(false);
  const [allResume, setAllResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllData = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.RESUME.GET_ALL);
      setAllResume(response.data);
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error('Error fetching resumes:', err);
      setError('Failed to fetch resumes. Please try again later.');
    } finally {
      setLoading(false); // Ensure loading is turned off
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <DashboardLayout>
      <div className="grid md:pl-25 grid-cols-1 md:grid-cols-5 gap-4 md:gap-7 pt-1 pb-7 px-4 md:px-0">
        {/* Add New Resume */}
        <div
          className="h-[300px] flex flex-col gap-5 items-center justify-center bg-white rounded-lg border border-purple-100 hover:border-purple-300 hover:bg-purple-50/5 cursor-pointer"
          onClick={() => setOpenCreateModel(true)}
        >
          <div className="w-12 h-12 flex items-center justify-center bg-purple-200/60 rounded-2xl">
            <LuCirclePlus className="text-xl text-purple-500" />
          </div>
          <h3 className="font-medium text-gray-800">Add new Resume</h3>
        </div>

        {/* Display Resumes */}
        {loading && (
          <div className="col-span-full text-center text-gray-600">Loading resumes...</div>
        )}
        {error && (
          <div className="col-span-full text-center text-red-500">{error}</div>
        )}
        {!loading && !error && allResume?.length === 0 && (
          <div className="col-span-full text-center text-gray-600">
            No resumes found. Click "Add new Resume" to create one.
          </div>
        )}
        {!loading &&
          !error &&
          allResume?.map((resume) => (
            <ResumeSummaryCard
              key={resume?._id}
              imgUrl={resume?.thumbnailLink || null}
              title={resume?.title || 'Untitled Resume'}
              lastUpdated={
                resume?.updatedAt
                  ? moment(resume.updatedAt).format('Do MMM YYYY')
                  : 'Unknown'
              }
              onSelect={() => navigate(`/resume/${resume?._id}`)}
            />
          ))}
      </div>

            <Modal
            isOpen={openCreateModel}
            onClose={()=>{
              setOpenCreateModel(false);
            }}
            hideHeader
            >

              <div className=''>
              <CreatResumeForm/>
              </div>
            </Modal>


    </DashboardLayout>
  );
};

export default Dashboard;
