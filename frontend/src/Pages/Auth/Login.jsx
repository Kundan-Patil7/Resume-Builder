import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../../Utils/healper';
import Input from '../../components/Inputs/Input';
import { UserContext } from '../../Context/userContext';
import axiosInstance from '../../Utils/axiosInstance';
import { API_PATHS } from '../../Utils/ApiPath';

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password.");
      return;
    }
    setError(null);

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (err) {
      
    }
  };

  return (
    <div className="w-[90vw] max-w-lg mx-auto p-6 bg-white shadow rounded-md md:w-[33vw]">
      <h3 className="text-lg font-semibold text-black">Welcome Back</h3>
      <p className="text-sm text-slate-700 mt-2 mb-6">
        Please enter your details to log in.
      </p>

      <form onSubmit={handleLogin}>
        <Input
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          placeholder="john@example.com"
          label="Email Address"
          type="email"
        />
        <Input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          placeholder="Minimum 8 characters"
          label="Password"
          type="password"
        />

        {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

        <button className="btn-primary mt-4" type="submit">
          LOGIN
        </button>
        <p className="text-sm text-slate-800 mt-4">
          Don’t have an account?{' '}
          <button
            type="button"
            className="font-medium text-primary underline"
            onClick={() => setCurrentPage('signup')}
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;












// import React, { useContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { validateEmail } from '../../Utils/healper';
// import Input from '../../components/Inputs/Input';
// import { UserContext } from '../../Context/userContext';
// import axios from 'axios';

// const Login = ({ setCurrentPage }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);
//   const { updateUser } = useContext(UserContext);

//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     if (!validateEmail(email)) {
//       setError("Please enter a valid email address.");
//       return;
//     }

//     if (!password) {
//       setError("Please enter the password.");
//       return;
//     }
//     setError(null);

//     try {
//       const response = await axios.post('http://localhost:8000/api/auth/login', {
//         email,
//         password,
//       });

//       const { token } = response.data;
//       if (token) {
//         localStorage.setItem("token", token);
//         updateUser(response.data);
//         navigate("/dashboard");
//       }
//     } catch (err) {
//       setError("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <div className="w-[90vw] max-w-lg mx-auto p-6 bg-white shadow rounded-md md:w-[33vw]">
//       <h3 className="text-lg font-semibold text-black">Welcome Back</h3>
//       <p className="text-sm text-slate-700 mt-2 mb-6">
//         Please enter your details to log in.
//       </p>

//       <form onSubmit={handleLogin}>
//         <Input
//           value={email}
//           onChange={({ target }) => setEmail(target.value)}
//           placeholder="john@example.com"
//           label="Email Address"
//           type="email"
//         />
//         <Input
//           value={password}
//           onChange={({ target }) => setPassword(target.value)}
//           placeholder="Minimum 8 characters"
//           label="Password"
//           type="password"
//         />

//         {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

//         <button className="btn-primary mt-4" type="submit">
//           LOGIN
//         </button>
//         <p className="text-sm text-slate-800 mt-4">
//           Don’t have an account?{' '}
//           <button
//             type="button"
//             className="font-medium text-primary underline"
//             onClick={() => setCurrentPage('signup')}
//           >
//             Sign Up
//           </button>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Login;
