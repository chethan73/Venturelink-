// 'use client'; // Required for React Server Components in Next.js

// import React, { useState, useEffect } from 'react';
// import { FaEnvelope, FaLock, FaUser, FaPhone, FaBriefcase } from 'react-icons/fa';
// import { motion } from 'framer-motion';
// import { useRouter } from 'next/navigation';

// type LoginRegister = {
//   email: string;
//   password: string;
//   confirmPassword?: string;
//   full_name: string;
//   number: string;
//   role: string;
//   sector: string;
// };

// const LoginRegisterPage = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState<LoginRegister>({
//     email: '',
//     password: '',
//     confirmPassword: '',
//     full_name: '',
//     number: '',
//     role: '',
//     sector: '',
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [imageLoaded, setImageLoaded] = useState(false);
//   const router = useRouter();

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const validateForm = (formData: LoginRegister) => {
//     if (!formData.email || !formData.password) {
//       setError('Email and Password are required');
//       return false;
//     }
//     if (!isLogin && formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match');
//       return false;
//     }
//     setError('');
//     return true;
//   };

//   const registerInvestor = async () => {
//     if (validateForm(formData)) {
//       setLoading(true);
//       try {
//         const response = await fetch('/api/register', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(formData),
//         });
//         const data = await response.json();
//         if (!response.ok) throw new Error(data.error || 'Registration failed');
//         console.log("login data" , data)
//         alert('Registration successful! Redirecting to login...');
//         router.push('/login'); // Redirect to the login page
//       } catch (error: any) {
//         setError(error.message || 'An error occurred');
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const loginInvestor = async () => {
//         if (validateForm(formData)) {
//           setLoading(true);
//           try {
//             const response = await fetch('/api/login', {
//               method: 'POST',
//               headers: { 'Content-Type': 'application/json' },
//               body: JSON.stringify({ email: formData.email, password: formData.password }),
//             });
    
//             // Ensure response is valid JSON
//             const responseData = await response.json();
    
//             if (!response.ok) {
//                 if (response.status === 403) {
//                     throw new Error('Your account has been blocked. Please contact support.');
//                 } else {
//                     throw new Error(responseData.error || 'Login failed');
//                 }
//             }
    
//             alert('Login successful');
    
//             // Store user details
//             localStorage.setItem("users2", JSON.stringify(responseData.user));
    
//             console.log("User Role from API:", responseData.user.role); // Debugging log
    
//             // Redirect based on the role
//             if (responseData.user.role === 'Investor') {
//               router.push('/dashboard/investor'); // Route for Investor Dashboard
//             } else {
//               router.push('/dashboard/startup'); // Route for Startup Dashboard
//             }
    
//           } catch (error: any) {
//             setError(error.message || 'An error occurred');
//             alert(error.message); // Show error alert to user
//           } finally {
//             setLoading(false);
//           }
//         }
//     };
    
    
  

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (isLogin) {
//       loginInvestor();
//     } else {
//       registerInvestor();
//     }
//   };

//   useEffect(() => {
//     const img = new Image();
//     img.src = '/images/login.jpg';
//     img.onload = () => setImageLoaded(true);
//   }, []);

//   return (
//     <motion.div
//       className="flex justify-center items-center min-h-screen bg-gray-50"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.8 }}
//     >
//       <div className="flex flex-col lg:flex-row w-full max-w-4xl p-6 rounded-lg shadow-lg bg-white">
//         {/* Left Image Section */}
//         <div className="lg:flex-1 hidden lg:flex justify-center items-center">
//           {imageLoaded ? (
//             <img
//               src="/images/login.jpg"
//               alt="Investor"
//               className="max-w-[350px] w-full h-auto rounded-lg"
//             />
//           ) : (
//             <div className="max-w-[350px] w-full h-auto rounded-lg bg-gray-200 animate-pulse" />
//           )}
//         </div>

//         {/* Form Section */}
//         <div className="flex-1 p-8">
//           <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
//             {isLogin ? 'Login' : 'Register'}
//           </h2>

//           <div className="text-center mb-6">
//             <button
//               onClick={() => setIsLogin(true)}
//               className={`px-8 py-3 mx-2 font-medium rounded-lg transition-colors ${
//                 isLogin ? 'bg-blue-600 text-white' : 'bg-gray-200 text-blue-600'
//               } hover:bg-blue-500`}
//             >
//               Login
//             </button>
//             <button
//               onClick={() => setIsLogin(false)}
//               className={`px-8 py-3 mx-2 font-medium rounded-lg transition-colors ${
//                 !isLogin ? 'bg-blue-600 text-white' : 'bg-gray-200 text-blue-600'
//               } hover:bg-blue-500`}
//             >
//               Register
//             </button>
//           </div>



//           <form onSubmit={handleSubmit} className="space-y-6">
//             {error && <div className="text-red-500 text-center">{error}</div>}

//             {!isLogin && (
//               <>
//                 <div className="flex items-center border-b-2 border-gray-300 py-2">
//                   <FaUser className="text-gray-600 mr-4" />
//                   <input
//                     type="text"
//                     name="full_name"
//                     placeholder="Full Name"
//                     value={formData.full_name}
//                     onChange={handleInputChange}
//                     className="w-full p-2 text-gray-700 outline-none focus:ring-2 focus:ring-blue-600"
//                     required
//                   />
//                 </div>
//                 <div className="flex items-center border-b-2 border-gray-300 py-2">
//                   <FaPhone className="text-gray-600 mr-4" />
//                   <input
//                     type="text"
//                     name="number"
//                     placeholder="Phone Number"
//                     value={formData.number}
//                     onChange={handleInputChange}
//                     className="w-full p-2 text-gray-700 outline-none focus:ring-2 focus:ring-blue-600"
//                     required
//                   />
//                 </div>
//                 <div className="flex items-center border-b-2 border-gray-300 py-2">
//                   <FaBriefcase className="text-gray-600 mr-4" />
//                   <select
//                     name="role"
//                     value={formData.role}
//                     onChange={handleSelectChange}
//                     className="w-full p-2 text-gray-700 outline-none focus:ring-2 focus:ring-blue-600"
//                     required
//                   >
//                     <option value="">Select Role</option>
//                     <option value="Investor">Investor</option>
//                     <option value="Startup">Startup</option>
//                   </select>
//                 </div>
//                 <div className="flex items-center border-b-2 border-gray-300 py-2">
//                   <select
//                     name="sector"
//                     value={formData.sector}
//                     onChange={handleSelectChange}
//                     className="w-full p-2 text-gray-700 outline-none focus:ring-2 focus:ring-blue-600"
//                     required
//                   >
//                     <option value="">Select Sector</option>
//                     <option value="Technology">Technology</option>
//                     <option value="Finance">Finance</option>
//                     <option value="Healthcare">Healthcare</option>
//                     <option value="Other">Other</option>
//                   </select>
//                 </div>
//               </>
//             )}

//             <div className="flex items-center border-b-2 border-gray-300 py-2">
//               <FaEnvelope className="text-gray-600 mr-4" />
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 className="w-full p-2 text-gray-700 outline-none focus:ring-2 focus:ring-blue-600"
//                 required
//               />
//             </div>
//             <div className="flex items-center border-b-2 border-gray-300 py-2">
//               <FaLock className="text-gray-600 mr-4" />
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleInputChange}
//                 className="w-full p-2 text-gray-700 outline-none focus:ring-2 focus:ring-blue-600"
//                 required
//               />
//             </div>
//             {!isLogin && (
//               <div className="flex items-center border-b-2 border-gray-300 py-2">
//                 <FaLock className="text-gray-600 mr-4" />
//                 <input
//                   type="password"
//                   name="confirmPassword"
//                   placeholder="Confirm Password"
//                   value={formData.confirmPassword}
//                   onChange={handleInputChange}
//                   className="w-full p-2 text-gray-700 outline-none focus:ring-2 focus:ring-blue-600"
//                   required
//                 />
//               </div>
//             )}
//             <div className="text-center">
//               <button
//                 type="submit"
//                 className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition-all disabled:bg-gray-300"
//                 disabled={loading}
//               >
//                 {loading ? 'Submitting...' : isLogin ? 'Login' : 'Register'}
//               </button>
//             </div>
//             <div className="text-center mt-4">
//   {isLogin && (
//     <motion.div 
//       initial={{ opacity: 0, y: 10 }} 
//       animate={{ opacity: 1, y: 0 }} 
//       transition={{ duration: 0.5, delay: 0.2 }}
//       className="space-y-3"
//     >
//       <motion.p
//         whileHover={{ scale: 1.05 }}
//         className="text-sm text-gray-600 flex items-center justify-center space-x-2"
//       >
//         <FaLock className="text-blue-600" />
//         <a href="/forgot-password" className="text-blue-600 hover:underline">
//           Forgot Password?
//         </a>
//       </motion.p>

//       <motion.p
//         whileHover={{ scale: 1.05 }}
//         className="text-sm text-gray-600 flex items-center justify-center space-x-2"
//       >
        
//         <FaEnvelope className="text-blue-600" />
//         <a href="/home/contact" className="text-blue-600 hover:underline">
//           Contact Support
//         </a>
//       </motion.p>
//     </motion.div>
//   )}
// </div>

//           </form>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default LoginRegisterPage;

// 'use client'; // Required for React Server Components in Next.js

// import React, { useState, useEffect } from 'react';
// import { FaEnvelope, FaLock, FaUser, FaPhone, FaBriefcase } from 'react-icons/fa';
// import { motion } from 'framer-motion';
// import { useRouter } from 'next/navigation';

// type LoginRegister = {
//   email: string;
//   password: string;
//   confirmPassword?: string;
//   full_name: string;
//   number: string;
//   role: string;
//   sector: string;
// };

// const LoginRegisterPage = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState<LoginRegister>({
//     email: '',
//     password: '',
//     confirmPassword: '',
//     full_name: '',
//     number: '',
//     role: '',
//     sector: '',
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [imageLoaded, setImageLoaded] = useState(false);
//   const router = useRouter();

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const validateForm = (formData: LoginRegister) => {
//     if (!formData.email || !formData.password) {
//       setError('Email and Password are required');
//       return false;
//     }
//     if (!isLogin && formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match');
//       return false;
//     }
//     setError('');
//     return true;
//   };

//   const registerInvestor = async () => {
//     if (validateForm(formData)) {
//       setLoading(true);
//       try {
//         const response = await fetch('/api/register', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(formData),
//         });
//         const data = await response.json();
//         if (!response.ok) throw new Error(data.error || 'Registration failed');
//         console.log("login data" , data);
//         alert('Registration successful! Redirecting to login...');
//         router.push('/login'); // Redirect to the login page
//       } catch (error: any) {
//         setError(error.message || 'An error occurred');
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const loginInvestor = async () => {
//     if (validateForm(formData)) {
//       setLoading(true);
//       try {
//         const response = await fetch('/api/login', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ email: formData.email, password: formData.password }),
//         });

//         const responseData = await response.json();

//         if (!response.ok) {
//           if (response.status === 403) {
//             throw new Error('Your account has been blocked. Please contact support.');
//           } else {
//             throw new Error(responseData.error || 'Login failed');
//           }
//         }

//         alert('Login successful');

//         // Store user details
//         localStorage.setItem("users2", JSON.stringify(responseData.user));
//         console.log("User data from API:", responseData.user); // Debugging log
//         // console.log("User Role from API:", responseData.user.role); // Debugging log
//         localStorage.setItem("user_id",responseData.user.id);// Store user role in local storage
//         console.log("User ID from API:", responseData.user.id); // Debugging log

//         console.log("User Role from API:", responseData.user.role); // Debugging log
//         console.log("Usern name from API:", responseData.user.full_name); // Debugging log")

//         // Redirect based on the role
//         if (responseData.user.role === 'Investor') {
//           router.push('/dashboard/investor'); // Route for Investor Dashboard
//         } else {
//           router.push('/dashboard/startup'); // Route for Startup Dashboard
//         }
//       } catch (error: any) {
//         setError(error.message || 'An error occurred');
//         alert(error.message); // Show error alert to user
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (isLogin) {
//       loginInvestor();
//     } else {
//       registerInvestor();
//     }
//   };

//   useEffect(() => {
//     const img = new Image();
//     img.src = '/images/login.jpg';
//     img.onload = () => setImageLoaded(true);
//   }, []);

//   return (
//     <motion.div
//       className="flex justify-center items-center min-h-screen bg-gray-50"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.8 }}
//     >
//       <div className="flex flex-col lg:flex-row w-full max-w-4xl p-6 rounded-lg shadow-lg bg-white">
//         {/* Left Image Section */}
//         <div className="lg:flex-1 hidden lg:flex justify-center items-center">
//           {imageLoaded ? (
//             <img
//               src="/images/login.jpg"
//               alt="Investor"
//               className="max-w-[350px] w-full h-auto rounded-lg"
//             />
//           ) : (
//             <div className="max-w-[350px] w-full h-auto rounded-lg bg-gray-200 animate-pulse" />
//           )}
//         </div>

//         {/* Form Section */}
//         <div className="flex-1 p-8">
//           <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
//             {isLogin ? 'Login' : 'Register'}
//           </h2>

//           <div className="text-center mb-6">
//             <button
//               onClick={() => setIsLogin(true)}
//               className={`px-8 py-3 mx-2 font-medium rounded-lg transition-colors ${
//                 isLogin ? 'bg-blue-600 text-white' : 'bg-gray-200 text-blue-600'
//               } hover:bg-blue-500`}
//             >
//               Login
//             </button>
//             <button
//               onClick={() => setIsLogin(false)}
//               className={`px-8 py-3 mx-2 font-medium rounded-lg transition-colors ${
//                 !isLogin ? 'bg-blue-600 text-white' : 'bg-gray-200 text-blue-600'
//               } hover:bg-blue-500`}
//             >
//               Register
//             </button>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {error && <div className="text-red-500 text-center">{error}</div>}

//             {!isLogin && (
//               <>
//                 <div className="flex items-center border-b-2 border-gray-300 py-2">
//                   <FaUser className="text-gray-600 mr-4" />
//                   <input
//                     type="text"
//                     name="full_name"
//                     placeholder="Full Name"
//                     value={formData.full_name}
//                     onChange={handleInputChange}
//                     className="w-full p-2 text-gray-700 outline-none focus:ring-2 focus:ring-blue-600"
//                     required
//                   />
//                 </div>
//                 <div className="flex items-center border-b-2 border-gray-300 py-2">
//                   <FaPhone className="text-gray-600 mr-4" />
//                   <input
//                     type="text"
//                     name="number"
//                     placeholder="Phone Number"
//                     value={formData.number}
//                     onChange={handleInputChange}
//                     className="w-full p-2 text-gray-700 outline-none focus:ring-2 focus:ring-blue-600"
//                     required
//                   />
//                 </div>
//                 <div className="flex items-center border-b-2 border-gray-300 py-2">
//                   <FaBriefcase className="text-gray-600 mr-4" />
//                   <select
//                     name="role"
//                     value={formData.role}
//                     onChange={handleSelectChange}
//                     className="w-full p-2 text-gray-700 outline-none focus:ring-2 focus:ring-blue-600"
//                     required
//                   >
//                     <option value="">Select Role</option>
//                     <option value="Investor">Investor</option>
//                     <option value="Startup">Startup</option>
//                   </select>
//                 </div>
//                 <div className="flex items-center border-b-2 border-gray-300 py-2">
//                   <select
//                     name="sector"
//                     value={formData.sector}
//                     onChange={handleSelectChange}
//                     className="w-full p-2 text-gray-700 outline-none focus:ring-2 focus:ring-blue-600"
//                     required
//                   >
//                     <option value="">Select Sector</option>
//                     <option value="Technology">Technology</option>
//                     <option value="Finance">Finance</option>
//                     <option value="Healthcare">Healthcare</option>
//                     <option value="Other">Other</option>
//                   </select>
//                 </div>
//               </>
//             )}

//             <div className="flex items-center border-b-2 border-gray-300 py-2">
//               <FaEnvelope className="text-gray-600 mr-4" />
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 className="w-full p-2 text-gray-700 outline-none focus:ring-2 focus:ring-blue-600"
//                 required
//               />
//             </div>
//             <div className="flex items-center border-b-2 border-gray-300 py-2">
//               <FaLock className="text-gray-600 mr-4" />
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleInputChange}
//                 className="w-full p-2 text-gray-700 outline-none focus:ring-2 focus:ring-blue-600"
//                 required
//               />
//             </div>
//             {!isLogin && (
//               <div className="flex items-center border-b-2 border-gray-300 py-2">
//                 <FaLock className="text-gray-600 mr-4" />
//                 <input
//                   type="password"
//                   name="confirmPassword"
//                   placeholder="Confirm Password"
//                   value={formData.confirmPassword}
//                   onChange={handleInputChange}
//                   className="w-full p-2 text-gray-700 outline-none focus:ring-2 focus:ring-blue-600"
//                   required
//                 />
//               </div>
//             )}
//             <div className="text-center">
//               <button
//                 type="submit"
//                 className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition-all disabled:bg-gray-300"
//                 disabled={loading}
//               >
//                 {loading ? 'Submitting...' : isLogin ? 'Login' : 'Register'}
//               </button>
//             </div>
//             <div className="text-center mt-4">
//               {isLogin && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: 0.2 }}
//                   className="space-y-3"
//                 >
//                   <motion.p
//                     whileHover={{ scale: 1.05 }}
//                     className="text-sm text-gray-600 flex items-center justify-center space-x-2"
//                   >
//                     <FaLock className="text-blue-600" />
//                     <a href="/forgot-password" className="text-blue-600 hover:underline">
//                       Forgot Password?
//                     </a>
//                   </motion.p>

//                   <motion.p
//                     whileHover={{ scale: 1.05 }}
//                     className="text-sm text-gray-600 flex items-center justify-center space-x-2"
//                   >
//                     <FaEnvelope className="text-blue-600" />
//                     <a href="/home/contact" className="text-blue-600 hover:underline">
//                       Contact Support
//                     </a>
//                   </motion.p>
//                 </motion.div>
//               )}
//             </div>
//           </form>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default LoginRegisterPage;


'use client';

import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaLock, FaUser, FaPhone, FaBriefcase, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

type LoginRegister = {
  email: string;
  password: string;
  confirmPassword?: string;
  full_name: string;
  number: string;
  role: string;
  sector: string;
};

const LoginRegisterPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<LoginRegister>({
    email: '',
    password: '',
    confirmPassword: '',
    full_name: '',
    number: '',
    role: '',
    sector: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageLoaded, setImageLoaded] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = (formData: LoginRegister) => {
    if (!formData.email || !formData.password) {
      setError('Email and Password are required');
      return false;
    }
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    setError('');
    return true;
  };

  const registerInvestor = async () => {
    if (validateForm(formData)) {
      setLoading(true);
      try {
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Registration failed');
        console.log("login data", data);
        alert('Registration successful! Redirecting to login...');
        router.push('/login');
      } catch (error: any) {
        setError(error.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    }
  };

  const loginInvestor = async () => {
    if (validateForm(formData)) {
      setLoading(true);
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.email, password: formData.password }),
        });

        const responseData = await response.json();

        if (!response.ok) {
          if (response.status === 403) {
            throw new Error('Your account has been blocked. Please contact support.');
          } else {
            throw new Error(responseData.error || 'Login failed');
          }
        }

        alert('Login successful');
        localStorage.setItem("users2", JSON.stringify(responseData.user));
        localStorage.setItem("user_id", responseData.user.id);

        if (responseData.user.role === 'Investor') {
          router.push('/dashboard/investor');
        } else {
          router.push('/dashboard/startup');
        }
      } catch (error: any) {
        setError(error.message || 'An error occurred');
        alert(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      loginInvestor();
    } else {
      registerInvestor();
    }
  };

  useEffect(() => {
    const img = new Image();
    img.src = '/images/login.jpg';
    img.onload = () => setImageLoaded(true);
  }, []);

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-full max-w-5xl bg-white rounded-xl shadow-2xl overflow-hidden"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex flex-col lg:flex-row h-full">
          {/* Left Image Section */}
          <div className="lg:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 hidden lg:flex flex-col justify-between">
            {imageLoaded ? (
              <motion.img
                src="/images/login.jpg"
                alt="Investor"
                className="w-full h-auto rounded-lg shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              />
            ) : (
              <div className="w-full h-64 bg-gray-200 rounded-lg animate-pulse" />
            )}
            
            <div className="mt-8 text-white">
              <h2 className="text-3xl font-bold mb-4">Welcome to VentureLink</h2>
              <p className="text-blue-100 mb-6">
                {isLogin 
                  ? "Login to access your investor dashboard and discover new opportunities."
                  : "Join our platform to connect with innovative startups and investors."}
              </p>
              <div className="flex items-center">
                <div className="w-12 h-1 bg-blue-400 mr-4"></div>
                <span className="text-sm font-medium text-blue-200">
                  {isLogin ? "New to VentureLink?" : "Already have an account?"}
                </span>
              </div>
              <motion.button
                onClick={() => setIsLogin(!isLogin)}
                className="mt-4 flex items-center text-blue-100 hover:text-white transition-colors"
                whileHover={{ x: 5 }}
              >
                {isLogin ? "Create an account" : "Sign in instead"}
                <FaArrowRight className="ml-2" />
              </motion.button>
            </div>
          </div>

          {/* Form Section */}
          <div className="lg:w-1/2 p-8 lg:p-12">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold text-gray-800">
                {isLogin ? "Sign In" : "Create Account"}
              </h1>
              <div className="flex lg:hidden">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                    isLogin ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                    !isLogin ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Register
                </button>
              </div>
            </div>

            {error && (
              <motion.div 
                className="mb-6 p-3 bg-red-100 text-red-700 rounded-lg text-sm"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <>
                  <div className="space-y-4">
                    <div className="relative">
                      <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="full_name"
                        placeholder="Full Name"
                        value={formData.full_name}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        required
                      />
                    </div>

                    <div className="relative">
                      <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="number"
                        placeholder="Phone Number"
                        value={formData.number}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <FaBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <select
                          name="role"
                          value={formData.role}
                          onChange={handleSelectChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white"
                          required
                        >
                          <option value="">Select Role</option>
                          <option value="Investor">Investor</option>
                          <option value="Startup">Startup</option>
                        </select>
                      </div>

                      <div className="relative">
                        <select
                          name="sector"
                          value={formData.sector}
                          onChange={handleSelectChange}
                          className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white"
                          required
                        >
                          <option value="">Select Sector</option>
                          <option value="Technology">Technology</option>
                          <option value="Finance">Finance</option>
                          <option value="Healthcare">Healthcare</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  required
                />
              </div>

              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  required
                />
              </div>

              {!isLogin && (
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    required
                  />
                </div>
              )}

              {isLogin && (
                <div className="flex justify-between items-center">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200" />
                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                  </label>
                  <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                    Forgot password?
                  </a>
                </div>
              )}

              <motion.button
                type="submit"
                className={`w-full py-3 px-4 rounded-lg font-medium text-white shadow-md transition-all ${
                  loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                }`}
                disabled={loading}
                whileHover={!loading ? { scale: 1.02 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : isLogin ? (
                  "Sign In"
                ) : (
                  "Create Account"
                )}
              </motion.button>
            </form>

            {isLogin && (
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <button 
                    onClick={() => setIsLogin(false)}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Sign up
                  </button>
                  <br />
                  <button 
                    // onClick={() => setIsLogin(false)}
                    onClick={() => router.push(`/home/contact`)}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Contact Support
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoginRegisterPage;