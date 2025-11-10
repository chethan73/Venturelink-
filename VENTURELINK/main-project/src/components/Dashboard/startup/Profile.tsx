// 'use client';

// import React, { useEffect, useState } from 'react';
// import { Phone, Instagram, Briefcase, Users } from 'lucide-react';
// import { FaTwitter, FaLinkedin, FaGithub, FaFacebook } from 'react-icons/fa'; // Add LinkedIn, GitHub, and Facebook icons

// // User Profile Interface
// interface UserProfile {
//   id: string;
//   full_name: string;
//   bio: string;
//   number: string;
//   email: string;
//   sector: string;
//   role: string;
//   whatsapp: string;
//   instagram: string;
//   twitter: string;
//   linkedin: string; // Add LinkedIn
//   github: string; // Add GitHub
// }

// const Profile = () => {
//   const [profile, setProfile] = useState<UserProfile | null>(null);
//   const [user, setUser] = useState<any>(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem('users2');
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       if (user && user.id) {
//         try {
//           const response = await fetch(`http://localhost:5000/api/register/${user.id}`);
//           if (!response.ok) throw new Error(`Error: ${response.status}`);
          
//           const data = await response.json();
//           setProfile(data);
//         } catch (error) {
//           console.error('Error fetching profile:', error);
//         }
//       }
//     };

//     fetchProfile();
//   }, [user]);

//   if (!profile) {
//     return <div className="text-center text-gray-700 dark:text-white p-6">Loading Profile...</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
//       <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
//         {/* Profile Header with Animation */}
//         <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-8 text-center text-white relative overflow-hidden animate__animated animate__fadeIn">
//           <div className="animate-bounce text-6xl mb-4">
//             👋
//           </div>
//           <h1 className="text-3xl font-bold mt-4 animate__animated animate__fadeIn animate__delay-1s">
//             {profile.full_name}
//           </h1>
//           <p className="text-lg mt-2 animate__animated animate__fadeIn animate__delay-2s">
//             {profile.bio || "Welcome to my profile!"}
//           </p>
//           <p className="text-md mt-2 text-gray-300 animate__animated animate__fadeIn animate__delay-3s">
//             {profile.email}
//           </p>
//         </div>
        
//         {/* Profile Content */}
//         <div className="p-6 space-y-6">
//           {/* About Me */}
//           <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
//             <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">About Me</h2>
//             <p className="text-gray-600 dark:text-gray-400 mt-2">
//               {profile.bio || "I am passionate about technology and development. I love solving problems and creating innovative solutions. Always excited to collaborate with talented individuals!"}
//             </p>
//           </div>

//           {/* Sector and Role */}
//           <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
//             <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Sector & Role</h2>
//             <div className="flex items-center mt-2 space-x-4">
//               <div className="flex items-center space-x-2">
//                 <Briefcase className="text-indigo-600 dark:text-indigo-400 w-6 h-6" />
//                 <span className="text-gray-600 dark:text-gray-400">Role: {profile.role}</span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <Users className="text-green-600 dark:text-green-400 w-6 h-6" />
//                 <span className="text-gray-600 dark:text-gray-400">Sector: {profile.sector}</span>
//               </div>
//             </div>
//           </div>

//           {/* Achievements (Optional) */}
//           {profile.achievements && profile.achievements.length > 0 && (
//             <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md">
//               <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Achievements</h2>
//               <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 mt-2">
//                 {profile.achievements.map((achievement, idx) => (
//                   <li key={idx}>{achievement}</li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {/* Social Proof (Followers/Connections) */}
//           <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Connections</h2>
//             <div className="flex space-x-4 mt-2">
//               <span className="text-gray-600 dark:text-gray-400">Followers: {profile.followers || 0}</span>
//               <span className="text-gray-600 dark:text-gray-400">Following: {profile.following || 0}</span>
//             </div>
//           </div>

//           {/* Contact Information */}
//           <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
//             <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Contact Information</h2>
//             <div className="space-y-2 mt-4">
//               {/* Display Email */}
//               <p><strong>Email: </strong>{profile.email}</p>

//               {/* Display Phone */}
//               <p><strong>Phone: </strong>{profile.number}</p>

//               {/* Display Social Media Links */}
//               <div className="flex space-x-6 mt-4">
//                 {profile.whatsapp && (
//                   <a href={`https://wa.me/${profile.whatsapp}`} target="_blank" rel="noopener noreferrer" className="p-4 bg-green-500 text-white rounded-full hover:bg-green-600 transform hover:scale-110 transition-all duration-300">
//                     <Phone className="w-6 h-6" />
//                   </a>
//                 )}
//                 {profile.instagram && (
//                   <a href={`https://instagram.com/${profile.instagram}`} target="_blank" rel="noopener noreferrer" className="p-4 bg-pink-500 text-white rounded-full hover:bg-pink-600 transform hover:scale-110 transition-all duration-300">
//                     <Instagram className="w-6 h-6" />
//                   </a>
//                 )}
//                 {profile.twitter && (
//                   <a href={`https://twitter.com/${profile.twitter}`} target="_blank" rel="noopener noreferrer" className="p-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 transform hover:scale-110 transition-all duration-300">
//                     <FaTwitter className="w-6 h-6" />
//                   </a>
//                 )}
//                 {profile.linkedin && (
//                   <a href={`https://linkedin.com/in/${profile.linkedin}`} target="_blank" rel="noopener noreferrer" className="p-4 bg-blue-700 text-white rounded-full hover:bg-blue-800 transform hover:scale-110 transition-all duration-300">
//                     <FaLinkedin className="w-6 h-6" />
//                   </a>
//                 )}
//                 {profile.github && (
//                   <a href={`https://github.com/${profile.github}`} target="_blank" rel="noopener noreferrer" className="p-4 bg-gray-800 text-white rounded-full hover:bg-gray-900 transform hover:scale-110 transition-all duration-300">
//                     <FaGithub className="w-6 h-6" />
//                   </a>
//                 )}
//                 {profile.facebook && (
//                   <a href={`https://facebook.com/${profile.facebook}`} target="_blank" rel="noopener noreferrer" className="p-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transform hover:scale-110 transition-all duration-300">
//                     <FaFacebook className="w-6 h-6" />
//                   </a>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;


// 'use client';

// import React, { useEffect, useState } from 'react';
// import { Phone, Instagram, Briefcase, Users, Mail, Award, Link2 } from 'lucide-react';
// import { FaTwitter, FaLinkedin, FaGithub, FaFacebook, FaWhatsapp } from 'react-icons/fa';

// interface UserProfile {
//   id: string;
//   full_name: string;
//   bio: string;
//   number: string;
//   email: string;
//   sector: string;
//   role: string;
//   whatsapp: string;
//   instagram: string;
//   twitter: string;
//   linkedin: string;
//   github: string;
// }

// const Profile = () => {
//   const [profile, setProfile] = useState<UserProfile | null>(null);
//   const [user, setUser] = useState<any>(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem('users2');
//     console.log('Stored User:', storedUser);
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       if (user && user.id) {
//         try {
//           const response = await fetch(`http://localhost:5000/api/register/${user.id}`);
//           if (!response.ok) throw new Error(`Error: ${response.status}`);
          
//           const data = await response.json();
//           setProfile(data);
//         } catch (error) {
//           console.error('Error fetching profile:', error);
//         }
//       }
//     };

//     fetchProfile();
//   }, [user]);

//   if (!profile) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
//         <div className="animate-pulse flex flex-col items-center">
//           <div className="h-24 w-24 bg-gray-300 dark:bg-gray-700 rounded-full mb-4"></div>
//           <div className="h-6 w-64 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
//           <div className="h-4 w-80 bg-gray-300 dark:bg-gray-700 rounded"></div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         {/* Profile Card */}
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
//           {/* Profile Header */}
//           <div className="relative">
//             <div className="h-48 bg-gradient-to-r from-blue-500 to-indigo-600 w-full"></div>
//             <div className="absolute -bottom-16 left-8">
//               <div className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 bg-white dark:bg-gray-700 flex items-center justify-center shadow-lg">
//                 <div className="text-5xl">👤</div>
//               </div>
//             </div>
//           </div>

//           {/* Profile Content */}
//           <div className="pt-20 px-8 pb-8">
//             {/* Name and Bio */}
//             <div className="mb-8">
//               <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{profile.full_name}</h1>
//               <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">{profile.role}</p>
//               <p className="text-gray-500 dark:text-gray-400 mt-4">{profile.bio || "Passionate professional with a drive for excellence."}</p>
//             </div>

//             {/* Divider */}
//             <div className="border-t border-gray-200 dark:border-gray-700 my-6"></div>

//             {/* Info Sections */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* About Section */}
//               <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
//                 <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
//                   <Briefcase className="mr-2 text-indigo-600 dark:text-indigo-400" />
//                   Professional Info
//                 </h2>
//                 <div className="space-y-4">
//                   <div>
//                     <p className="text-sm text-gray-500 dark:text-gray-400">Sector</p>
//                     <p className="text-gray-800 dark:text-gray-200 font-medium">{profile.sector}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500 dark:text-gray-400">Role</p>
//                     <p className="text-gray-800 dark:text-gray-200 font-medium">{profile.role}</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Contact Section */}
//               <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
//                 <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
//                   <Mail className="mr-2 text-blue-600 dark:text-blue-400" />
//                   Contact
//                 </h2>
//                 <div className="space-y-4">
//                   <div>
//                     <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
//                     <p className="text-gray-800 dark:text-gray-200 font-medium">{profile.email}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
//                     <p className="text-gray-800 dark:text-gray-200 font-medium">{profile.number}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Social Links */}
//             <div className="mt-8">
//               <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
//                 <Link2 className="mr-2 text-purple-600 dark:text-purple-400" />
//                 Connect With Me
//               </h2>
//               <div className="flex flex-wrap gap-4">
//                 {profile.whatsapp && (
//                   <a 
//                     href={`https://wa.me/${profile.whatsapp}`} 
//                     target="_blank" 
//                     rel="noopener noreferrer"
//                     className="flex items-center px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
//                   >
//                     <FaWhatsapp className="mr-2 text-green-600 dark:text-green-400" />
//                     WhatsApp
//                   </a>
//                 )}
//                 {profile.instagram && (
//                   <a 
//                     href={`https://instagram.com/${profile.instagram}`} 
//                     target="_blank" 
//                     rel="noopener noreferrer"
//                     className="flex items-center px-4 py-2 bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200 rounded-full hover:bg-pink-200 dark:hover:bg-pink-800 transition-colors"
//                   >
//                     <Instagram className="mr-2 text-pink-600 dark:text-pink-400" />
//                     Instagram
//                   </a>
//                 )}
//                 {profile.twitter && (
//                   <a 
//                     href={`https://twitter.com/${profile.twitter}`} 
//                     target="_blank" 
//                     rel="noopener noreferrer"
//                     className="flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
//                   >
//                     <FaTwitter className="mr-2 text-blue-600 dark:text-blue-400" />
//                     Twitter
//                   </a>
//                 )}
//                 {profile.linkedin && (
//                   <a 
//                     href={`https://linkedin.com/in/${profile.linkedin}`} 
//                     target="_blank" 
//                     rel="noopener noreferrer"
//                     className="flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
//                   >
//                     <FaLinkedin className="mr-2 text-blue-600 dark:text-blue-400" />
//                     LinkedIn
//                   </a>
//                 )}
//                 {profile.github && (
//                   <a 
//                     href={`https://github.com/${profile.github}`} 
//                     target="_blank" 
//                     rel="noopener noreferrer"
//                     className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
//                   >
//                     <FaGithub className="mr-2" />
//                     GitHub
//                   </a>
//                 )}
//                 {profile.facebook && (
//                   <a 
//                     href={`https://facebook.com/${profile.facebook}`} 
//                     target="_blank" 
//                     rel="noopener noreferrer"
//                     className="flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
//                   >
//                     <FaFacebook className="mr-2 text-blue-600 dark:text-blue-400" />
//                     Facebook
//                   </a>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;



'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Briefcase, Mail, Link2, Edit } from 'lucide-react';
import { FaTwitter, FaLinkedin, FaGithub, FaWhatsapp, FaInstagram } from 'react-icons/fa';

interface UserProfile {
  id: string;
  full_name: string;
  bio?: string;
  number?: string;
  email?: string;
  sector?: string;
  role?: string;
  whatsapp?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  github?: string;
  profile_image?: string;
}

const ProfilePage = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedUser = localStorage.getItem('users2');
        if (!storedUser) {
          throw new Error('No user found');
        }

        const user = JSON.parse(storedUser);
        if (!user?.id) {
          throw new Error('Invalid user data');
        }

        // Fetch profile data
        const profileResponse = await fetch(`http://localhost:5000/api/register/${user.id}`);
        if (!profileResponse.ok) throw new Error('Profile fetch failed');
        const profileData = await profileResponse.json();
        setProfile(profileData);

        // Fetch profile photo if exists
        if (profileData.profile_image) {
          setPhotoUrl(`http://localhost:5000/uploads/${profileData.profile_image}`);
        } else {
          // Try to fetch from user-photo endpoint as fallback
          try {
            const photoResponse = await fetch(`http://localhost:5000/api/user-photo/${user.id}`);
            if (photoResponse.ok) {
              const photoData = await photoResponse.json();
              if (photoData.photo_path) {
                setPhotoUrl(`http://localhost:5000/uploads/${photoData.photo_path}`);
              }
            }
          } catch (photoError) {
            console.log('No profile photo found');
          }
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleEditClick = () => {
    router.push('/startup/settings');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">Failed to load profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          {/* Profile Header */}
          <div className="relative h-48 bg-gradient-to-r from-blue-500 to-indigo-600">
            <div className="absolute -bottom-16 left-6">
              <div 
                className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 bg-white dark:bg-gray-700 flex items-center justify-center overflow-hidden shadow-lg cursor-pointer"
                onClick={() => photoUrl && window.open(photoUrl, '_blank')}
              >
                {photoUrl ? (
                  <img src={photoUrl} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-4xl text-gray-400">👤</div>
                )}
              </div>
            </div>
            <button
              onClick={handleEditClick}
              className="absolute top-4 right-4 bg-white/90 dark:bg-gray-700/90 px-4 py-2 rounded-full flex items-center shadow-sm hover:bg-white dark:hover:bg-gray-600 transition-colors"
            >
              <Edit className="w-4 h-4 mr-2 text-indigo-600 dark:text-indigo-400" />
              <span className="text-sm font-medium">Edit</span>
            </button>
          </div>

          {/* Profile Content */}
          <div className="pt-20 px-6 pb-8">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{profile.full_name}</h1>
              {profile.role && (
                <p className="text-indigo-600 dark:text-indigo-400 mt-1">{profile.role}</p>
              )}
              {profile.bio && (
                <p className="text-gray-600 dark:text-gray-300 mt-4">{profile.bio}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Professional Info */}
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <h2 className="flex items-center text-lg font-semibold text-gray-800 dark:text-white mb-3">
                  <Briefcase className="mr-2 text-indigo-600 dark:text-indigo-400" />
                  Professional
                </h2>
                {profile.sector && (
                  <div className="mb-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Sector</p>
                    <p className="text-gray-800 dark:text-gray-200">{profile.sector}</p>
                  </div>
                )}
                {profile.role && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Role</p>
                    <p className="text-gray-800 dark:text-gray-200">{profile.role}</p>
                  </div>
                )}
              </div>

              {/* Contact Info */}
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <h2 className="flex items-center text-lg font-semibold text-gray-800 dark:text-white mb-3">
                  <Mail className="mr-2 text-blue-600 dark:text-blue-400" />
                  Contact
                </h2>
                {profile.email && (
                  <div className="mb-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                    <p className="text-gray-800 dark:text-gray-200">{profile.email}</p>
                  </div>
                )}
                {profile.number && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                    <p className="text-gray-800 dark:text-gray-200">{profile.number}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h2 className="flex items-center text-lg font-semibold text-gray-800 dark:text-white mb-3">
                <Link2 className="mr-2 text-purple-600 dark:text-purple-400" />
                Connect
              </h2>
              <div className="flex flex-wrap gap-3">
                {profile.whatsapp && (
                  <a
                    href={`https://wa.me/${profile.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-3 py-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                  >
                    <FaWhatsapp className="mr-2 text-green-600 dark:text-green-400" />
                    <span>WhatsApp</span>
                  </a>
                )}
                {profile.instagram && (
                  <a
                    href={`https://instagram.com/${profile.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-3 py-2 bg-pink-50 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300 rounded-lg hover:bg-pink-100 dark:hover:bg-pink-900/30 transition-colors"
                  >
                    <FaInstagram className="mr-2 text-pink-600 dark:text-pink-400" />
                    <span>Instagram</span>
                  </a>
                )}
                {profile.twitter && (
                  <a
                    href={`https://twitter.com/${profile.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-3 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                  >
                    <FaTwitter className="mr-2 text-blue-600 dark:text-blue-400" />
                    <span>Twitter</span>
                  </a>
                )}
                {profile.linkedin && (
                  <a
                    href={`https://linkedin.com/in/${profile.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-3 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                  >
                    <FaLinkedin className="mr-2 text-blue-600 dark:text-blue-400" />
                    <span>LinkedIn</span>
                  </a>
                )}
                {profile.github && (
                  <a
                    href={`https://github.com/${profile.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-3 py-2 bg-gray-50 dark:bg-gray-700/20 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/30 transition-colors"
                  >
                    <FaGithub className="mr-2" />
                    <span>GitHub</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;