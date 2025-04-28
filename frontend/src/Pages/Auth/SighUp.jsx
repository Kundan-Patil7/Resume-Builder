import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../../Utils/healper';
import Input from '../../components/Inputs/Input';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';

const SignUp = ({ setCurrentPage }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!fullName) {
      setError('Please enter your full name.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setError('Please enter a password.');
      return;
    }

    setError(null); // Clear errors

    try {
      // Implement sign-up logic here, such as API calls
    } catch (error) {
      setError('An error occurred while signing up. Please try again.');
    }
  };

  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex  flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">Create An Account</h3>
      <p className="text-xs text-slate-700 mt-2 mb-6">
        Join us today by entering your details
      </p>

      <form onSubmit={handleSignup}>

      <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

        <Input
          value={fullName}
          onChange={({ target }) => setFullName(target.value)}
          label="Full Name"
          placeholder="John Doe"
          type="text"
          className="mb-4"
        />
        <Input
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          label="Email Address"
          placeholder="john@example.com"
          type="email"
          className="mb-4"
        />
        <Input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          label="Password"
          placeholder="Minimum 8 characters"
          type="password"
          className="mb-4"
        />

        {error && <p className="text-red-500 text-xs mb-4">{error}</p>}

        <button
          type="submit"
          className="btn-primary w-full"
        >
          SIGN UP
        </button>

        <p className="text-[13px] text-slate-800 mt-3 text-center">
          Already have an account?{' '}
          <button
            type="button"
            className="font-medium text-primary underline cursor-pointer"
            onClick={() => setCurrentPage('login')}
          >
            Log In
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
