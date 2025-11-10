// 'use client'; // <-- Add this line to mark the file as a Client Component

// import { useState, useEffect } from 'react';
// import Modal from 'react-modal';
// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import { FaFacebook, FaWhatsapp, FaTwitter, FaInstagram, FaPhoneAlt, FaEnvelope, FaPhone, FaInfoCircle } from 'react-icons/fa';

// const HomePage: React.FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [theme, setTheme] = useState<'light' | 'dark'>('light');

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     // Automatically open the modal after 5 seconds
//     setTimeout(() => setIsVisible(true), 300); // Smooth fade-in effect
//     const timer = setTimeout(() => openModal(), 5000);
//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     // Check if theme is saved in localStorage
//     const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
//     if (savedTheme) {
//       setTheme(savedTheme);
//     } else {
//       // Default to light theme
//       setTheme('light');
//     }

//     AOS.init({ duration: 2000 });
//   }, []);

//   useEffect(() => {
//     // Save theme to localStorage when it changes
//     localStorage.setItem('theme', theme);
//     if (theme === 'dark') {
//       document.documentElement.classList.add('dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//     }
//   }, [theme]);

//   const toggleTheme = () => {
//     setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
//   };

//   return (
//     <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
//       {/* Navbar */}
//       <nav
//         className={`flex items-center justify-between py-6 px-12 shadow-lg fixed top-0 left-0 right-0 z-20 transition-all duration-300 ${
//           theme === 'dark' ? 'bg-gray-800' : 'bg-white'
//         }`}
//       >
//         {/* Logo */}
//         <motion.div
//           className="text-5xl font-extrabold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 1 }}
//         >
//           VentureLink
//         </motion.div>

//         {/* Navbar Links */}
//         <motion.ul
//           className="flex space-x-8 font-medium text-lg"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.3 }}
//         >
//           {[
//             { href: '#about', label: 'About', color: 'hover:text-blue-500' },
//             { href: '#services', label: 'Services', color: 'hover:text-green-500' },
//             { href: '#contact', label: 'Contact', color: 'hover:text-red-500' },
//             { href: 'https://www.google.com', label: 'Google', color: 'hover:text-yellow-500', external: true },
//             { href: '/home/admin', label: 'Admin', color: 'hover:text-purple-500' }, // Admin Button
//           ].map((link, index) => (
//             <li key={index} className="relative group">
//               <Link
//                 href={link.href}
//                 target={link.external ? '_blank' : '_self'}
//                 className={`text-lg font-semibold transition-all duration-300 ${link.color}`}
//               >
//                 {link.label}
//               </Link>
//               {/* Add underline hover effect */}
//               <div
//                 className={`absolute left-0 bottom-[-4px] h-[2px] w-0 bg-current transition-all duration-300 group-hover:w-full`}
//               ></div>
//             </li>
//           ))}
//         </motion.ul>

//         {/* Theme Toggle Button */}
//         <motion.button
//           onClick={toggleTheme}
//           className={`flex items-center gap-2 text-lg font-semibold py-2 px-6 rounded-full transition-all duration-300 shadow-md ${
//             theme === 'dark'
//               ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
//               : 'bg-blue-500 text-white hover:bg-blue-600'
//           }`}
//           initial={{ scale: 0.8, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ duration: 0.6, delay: 0.5 }}
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.9 }}
//         >
//           <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
//           {theme === 'dark' ? (
//             <i className="fas fa-sun text-yellow-400"></i>
//           ) : (
//             <i className="fas fa-moon text-blue-200"></i>
//           )}
//         </motion.button>

        
//       </nav>

//       <section
//   style={{
//     backgroundImage: theme === 'dark' ? "url('/images/home1.jpg')" : "url('/images/home1.jpg')",
//     backgroundSize: '60%',
//     backgroundPosition: 'left',
//     backgroundRepeat: 'no-repeat',
//   }}
//   className="flex items-center justify-end h-screen text-center px-6"
//   data-aos="fade-up"
// >
// <motion.div
//   className="max-w-4xl text-right absolute right-0 top-1/2 transform -translate-y-1/2 px-8"
//   data-aos="fade-up"
//   initial={{ opacity: 0, x: 200 }}
//   animate={{ opacity: 1, x: 0 }}
//   transition={{ duration: 1.5 }}
// >
//   <motion.h1
//     className="text-6xl font-extrabold mb-6"
//     initial={{ opacity: 0, x: 100 }}
//     animate={{ opacity: 1, x: 0 }}
//     transition={{ duration: 1.5 }}
//     whileHover={{ scale: 1.1 }}
//     whileTap={{ scale: 0.95 }}
//   >
//     Welcome to VentureLink
//   </motion.h1>

//   <motion.p
//     className="text-2xl mb-8 font-bold"
//     data-aos="zoom-in-up"
//     data-aos-duration="1500"
//     initial={{ opacity: 0, scale: 0.8 }}
//     animate={{ opacity: 1, scale: 1 }}
//     transition={{ duration: 1.5 }}
//   >
//     Connecting investors and startups for mutual growth and success. Join us today!
//   </motion.p>

//   <div className="flex justify-end">
//   <motion.div
//     whileHover={{ scale: 1.1, rotate: 0 }}
//     transition={{ type: 'spring', stiffness: 300 }}
//     data-aos="fade-left"
//   >
//     <Link
//       href="/login"
//       className="bg-blue-600 text-white py-4 px-12 rounded-lg shadow-lg hover:bg-blue-700 transform hover:scale-105 transition duration-300 ease-in-out text-xl"
//     >
//     Get Started 
//     </Link>
//   </motion.div>
// </div>

// </motion.div>
// </section>
//       {/* Video Section */}
// <section
//   id="video"
//   className={`relative py-16 text-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} max-w-2xl mx-auto`}
// >
//   <h2 className="text-4xl font-semibold mb-6">Watch Our Video</h2>
//   <div className="mx-auto max-w-full">
//     <div className="relative aspect-w-16 aspect-h-9 h-[400px] mx-auto"> {/* Adjust height and centering */}
//       <motion.iframe
//         className="rounded-lg shadow-lg w-full h-full"
//         src="https://www.youtube.com/embed/bgTJl8nL2tw" // Corrected embed link
//         title="VentureLink Promo Video"
//         allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
//         allowFullScreen
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 1 }}
//       ></motion.iframe>
//     </div>
//   </div>
// </section>




// {/* Popup Modal */}
// <Modal
//   isOpen={isModalOpen}
//   onRequestClose={closeModal}
//   contentLabel="Video Popup"
//   className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
// >
//   <div className="bg-white p-6 rounded-lg max-w-2xl w-full h-[500px]"> {/* Reduced height */}
//     <h2 className="text-2xl font-bold mb-4">Exclusive Promo Video</h2>
//     <div className="relative aspect-w-16 aspect-h-9 h-[350px] mx-auto"> {/* Adjusted iframe height */}
//       <iframe
//         className="rounded-lg shadow-lg w-full h-full"
//         src="https://www.youtube.com/embed/bgTJl8nL2tw" // Corrected embed link
//         title="VentureLink Promo Video"
//         allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
//         allowFullScreen
//       ></iframe>
//     </div>
//     <div className="mt-6 text-center">
//       <button onClick={closeModal} className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600">
//         Close
//       </button>
//     </div>
//   </div>
// </Modal>





// {/* Latest Blog and News Section */}
// <section
//   id="latest-blog-news"
//   className={`py-28 text-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
// >
//   <h2 className={`text-5xl font-extrabold mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
//     Latest Blog and News
//   </h2>
//   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-8">
//     {[{
//         title: "New Investment Opportunities",
//         description: "Discover exciting new investment opportunities on our platform. Stay ahead of the curve!",
//         link: "/home/opportunity",
//         icon: "fa-chart-line", // Icon for investment opportunities
//         shadowColor: "hover:shadow-[0_4px_30px_0_rgba(99,102,241,0.7),_0_0_10px_4px_rgba(34,197,94,0.6)]", // Indigo + Green
//       },
//       {
//         title: "Startup Success Stories",
//         description: "Read inspiring stories of startups who have succeeded with the support of our platform.",
//         link: "/home/stories",
//         icon: "fa-rocket", // Icon for startup success
//         shadowColor: "hover:shadow-[0_4px_30px_0_rgba(234,179,8,0.7),_0_0_10px_4px_rgba(239,68,68,0.6)]", // Yellow + Red
//       },
//       {
//         title: "Tech Innovations in Investment",
//         description: "Explore the latest trends in technology and how they're changing the investment landscape.",
//         link: "/home/Tech",
//         icon: "fa-cogs", // Icon for tech innovations
//         shadowColor: "hover:shadow-[0_4px_30px_0_rgba(59,130,246,0.7),_0_0_10px_4px_rgba(99,102,241,0.6)]", // Blue + Indigo
//       },
//     ].map((blog, index) => (
//       <div
//         key={index}
//         className={`bg-white dark:bg-gray-800 dark:text-white p-8 rounded-lg shadow-lg transition-transform transform hover:-translate-y-4 hover:scale-110 duration-300 overflow-hidden ${blog.shadowColor}`}
//       >
//         <div className="flex items-center mb-6">
//           <i className={`fa ${blog.icon} text-3xl text-indigo-600 dark:text-indigo-400 mr-4`} /> {/* Icon */}
//           <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">
//             {blog.title}
//           </h3>
//         </div>
//         <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">{blog.description}</p>
//         <Link href={blog.link} className="text-blue-500 hover:text-blue-700 text-lg font-semibold">Read More</Link>
//       </div>
//     ))}
//   </div>
// </section>



//                  {/* Objectives Section */}
// <section id="objectives" className={`py-28 text-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-indigo-100'}`}>
//   <motion.h2
//     className="text-5xl font-extrabold mb-8"
//     initial={{ opacity: 0, y: -50 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 1, ease: "easeOut" }}
//   >
//     Our Objectives
//   </motion.h2>
//   <motion.p
//     className="text-lg max-w-4xl mx-auto mb-10 font-semibold"
//     initial={{ opacity: 0, scale: 0.8 }}
//     animate={{ opacity: 1, scale: 1 }}
//     transition={{ duration: 1.2, delay: 0.3 }}
//   >
//     VentureLink aims to empower investors and startups with tools and opportunities to thrive. Our key objectives are:
//   </motion.p>

//   <motion.div
//     className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-8"
//     initial="hidden"
//     whileInView="visible"
//     viewport={{ once: true, amount: 0.3 }}
//     variants={{
//       hidden: { opacity: 0 },
//       visible: { opacity: 1, transition: { staggerChildren: 0.3, delayChildren: 0.5 } },
//     }}
//   >
//     {[{
//         title: "Connecting Innovators",
//         description: "Bring together visionary startups and forward-thinking investors to foster innovation.",
//         icon: "fa-lightbulb",  // FontAwesome icon for innovation
//         shadowColor: "hover:shadow-[0_4px_30px_0_rgba(99,102,241,0.7),_0_0_10px_4px_rgba(34,197,94,0.6)]", // Indigo + Green gradient effect
//       },
//       {
//         title: "Promoting Growth",
//         description: "Provide resources and funding opportunities that help startups achieve their potential.",
//         icon: "fa-chart-line",  // FontAwesome icon for growth
//         shadowColor: "hover:shadow-[0_4px_30px_0_rgba(99,102,241,0.7),_0_0_10px_4px_rgba(34,197,94,0.6)]", // Indigo + Green gradient effect
//       },
//       {
//         title: "Fostering Sustainability",
//         description: "Encourage sustainable business practices for a positive global impact.",
//         icon: "fa-leaf",  // FontAwesome icon for sustainability
//         shadowColor: "hover:shadow-[0_4px_30px_0_rgba(99,102,241,0.7),_0_0_10px_4px_rgba(34,197,94,0.6)]", // Indigo + Green gradient effect
//       },
//       {
//         title: "AI-Powered Matchmaking",
//         description: "Leverage artificial intelligence to connect investors and startups with precision and efficiency.",
//         icon: "fa-robot",  // FontAwesome icon for AI
//         shadowColor: "hover:shadow-[0_4px_30px_0_rgba(99,102,241,0.7),_0_0_10px_4px_rgba(34,197,94,0.6)]", // Indigo + Green gradient effect
//       },
//       {
//         title: "Marketplace Investment Opportunities",
//         description: "Offer a dynamic marketplace for discovering lucrative and innovative investment opportunities.",
//         icon: "fa-store",  // FontAwesome icon for marketplace
//         shadowColor: "hover:shadow-[0_4px_30px_0_rgba(99,102,241,0.7),_0_0_10px_4px_rgba(34,197,94,0.6)]", // Indigo + Green gradient effect
//       },
//       {
//         title: "Global Expansion",
//         description: "Enable startups to expand globally through strategic connections and partnerships.",
//         icon: "fa-globe",  // FontAwesome icon for global
//         shadowColor: "hover:shadow-[0_4px_30px_0_rgba(99,102,241,0.7),_0_0_10px_4px_rgba(34,197,94,0.6)]", // Indigo + Green gradient effect
//       },
//     ].map((objective, index) => (
//       <motion.div
//         key={index}
//         className={`relative group bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg transition-transform transform hover:-translate-y-4 hover:scale-110 duration-300 overflow-hidden ${objective.shadowColor}`}
//         initial={{ opacity: 0, y: 50 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true, amount: 0.2 }}
//         transition={{ duration: 1, ease: "easeOut" }}
//       >
//         <div className="flex items-center mb-6">
//           <i className={`fa ${objective.icon} text-3xl text-indigo-600 dark:text-indigo-400 mr-4`} /> {/* Icon */}
//           <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">
//             {objective.title}
//           </h3>
//         </div>
//         <p className="text-lg text-gray-600 dark:text-gray-300">
//           {objective.description}
//         </p>
//       </motion.div>
//     ))}
//   </motion.div>
// </section>





// {/* Services Section */}
// <section
//   id="services"
//   className={`py-20 text-center ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-indigo-100'}`}
//   data-aos="fade-up"
// >
//   <h2 className={`text-5xl font-extrabold mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
//     Why Choose Us?
//   </h2>
//   <p className="text-xl max-w-3xl mx-auto mb-12 font-semibold">
//     We offer a seamless experience for both investors and startups. Join our platform to unlock incredible opportunities.
//   </p>
//   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6">
//     {[{
//         title: "Seamless Investment",
//         description: "Easily discover startups and manage your investments with our simple interface.",
//         icon: "fa-wallet", // Wallet icon for investment
//       },
//       {
//         title: "Startup Growth",
//         description: "Get the funding and resources needed to scale your business and innovate.",
//         icon: "fa-arrow-up", // Up arrow icon for growth
//       },
//       {
//         title: "Data-Driven Decisions",
//         description: "Use our insights and analytics tools to make informed investment choices.",
//         icon: "fa-chart-line", // Chart line icon for data-driven decisions
//       },
//     ].map((service, index) => (
//       <div
//         key={index}
//         className="relative group bg-white dark:bg-gray-800 dark:text-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden"
//       >
//         <div className="absolute inset-0 bg-indigo-500 dark:bg-indigo-700 opacity-0 group-hover:opacity-20 transition-opacity duration-300 z-0"></div>
//         <div className="flex items-center justify-center mb-4 relative z-10">
//           <i className={`fa ${service.icon} text-4xl text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-800 dark:group-hover:text-indigo-500 mr-4`} />
//         </div>
//         <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300 relative z-10">
//           {service.title}
//         </h3>
//         <p className="text-lg text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300 relative z-10">
//           {service.description}
//         </p>
//       </div>
//     ))}
//   </div>
// </section>




// <section
//   id="about"
//   className={`py-20 text-center ${
//     theme === "dark" ? "bg-gray-900 text-white" : "bg-blue-100"
//   }`}
//   data-aos="fade-up"
// >
//   <h2 className="text-4xl font-bold mb-6">
//     <FaInfoCircle size={30} className="inline mr-2" /> About Us
//   </h2>
//   <p className="text-xl max-w-3xl mx-auto mb-8 font-semibold">
//     We bridge the gap between investors and startups, fostering innovation, growth, and success.
//   </p>
//   <p className="text-lg max-w-3xl mx-auto mb-8 font-semibold">
//     For more information, visit our website or connect with us on{" "}
//     <Link href="https://www.google.com" target="_blank" className="text-blue-600">
//       Google
//     </Link>
//     .
//   </p>
// </section>


// {/* Contact Section */}
// <section
//   id="contact"
//   className={`py-20 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-blue-200 text-gray-900"}`}
//   data-aos="fade-up"
// >
//   <div className="container mx-auto text-center">
//     <h2 className="text-4xl font-semibold mb-6">
//       <FaPhoneAlt size={30} className="inline mr-2" /> Contact Us
//     </h2>
//     <p className="text-lg max-w-2xl mx-auto mb-8">
//       Have questions? Get in touch with us for more information.
//     </p>

//     {/* Contact Links */}
//     <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-center items-center max-w-4xl mx-auto">
//       <div className="flex flex-col items-center">
//         <p className="text-lg font-semibold mb-2">Email Us</p>
//         <Link
//           href="mailto:chethancheth63@gmail.com"
//           className="text-blue-600 hover:text-blue-800 text-lg font-semibold transition duration-300"
//         >
//           <FaEnvelope size={20} className="inline mr-2" />
//           chethancheth63@gmail.com
//         </Link>
//       </div>
//       <div className="flex flex-col items-center">
//         <p className="text-lg font-semibold mb-2">Call Us</p>
//         <Link
//           href="tel:+919019717042"
//           className="text-blue-600 hover:text-blue-800 text-lg font-semibold transition duration-300"
//         >
//           <FaPhone size={20} className="inline mr-2" />
//           +91 90197 17042
//         </Link>
//       </div>
//     </div>
//   </div>
// </section>

// {/* Footer Section */}
//     <footer
//       className={`py-10 bg-black text-white transition-opacity duration-1000 ${
//         isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-6">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
//           {/* Logo Section */}
//           <div className="flex flex-col space-y-4">
//             <h2 className="text-2xl font-bold">VentureLink</h2>
//             <p className="text-sm">
//               Be the first to know what's new on VentureLink.
//             </p>
//             <div className="flex">
//               <input
//                 type="email"
//                 placeholder="Your email"
//                 className="px-4 py-2 rounded-l-md focus:outline-none text-black"
//               />
//               <button className="bg-green-500 px-4 py-2 rounded-r-md hover:bg-green-600 transition-all">
//                 →
//               </button>
//             </div>
//           </div>

//           {/* Navigation Links */}
//           <div className="grid grid-cols-3 text-sm gap-4">
//             <div>
//               <h3 className="font-semibold text-gray-300">Explore</h3>
//               <ul className="mt-2 space-y-2">
//                 <li>
//                   <Link href="#" className="hover:text-green-400 transition-all">
//                     Courses
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="hover:text-green-400 transition-all">
//                     Blog
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="hover:text-green-400 transition-all">
//                     Resources
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="font-semibold text-gray-300">Company</h3>
//               <ul className="mt-2 space-y-2">
//                 <li>
//                   <Link href="#" className="hover:text-green-400 transition-all">
//                     About Us
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="hover:text-green-400 transition-all">
//                     Careers
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="hover:text-green-400 transition-all">
//                     Contact
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="font-semibold text-gray-300">Support</h3>
//               <ul className="mt-2 space-y-2">
//                 <li>
//                   <Link href="#" className="hover:text-green-400 transition-all">
//                     Help Center
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="hover:text-green-400 transition-all">
//                     Terms & Privacy
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           {/* Social Media Links */}
//           <div className="flex justify-center md:justify-end space-x-4">
//             <Link href="https://www.facebook.com" target="_blank">
//               <FaFacebook
//                 size={30}
//                 className="hover:text-blue-500 transition-transform transform hover:scale-110"
//               />
//             </Link>
//             <Link href="https://wa.me/+919019717042" target="_blank">
//               <FaWhatsapp
//                 size={30}
//                 className="hover:text-green-500 transition-transform transform hover:scale-110"
//               />
//             </Link>
//             <Link href="https://twitter.com/your_twitter_handle" target="_blank">
//               <FaTwitter
//                 size={30}
//                 className="hover:text-blue-400 transition-transform transform hover:scale-110"
//               />
//             </Link>
//             <Link href="https://instagram.com/your_instagram_handle" target="_blank">
//               <FaInstagram
//                 size={30}
//                 className="hover:text-pink-500 transition-transform transform hover:scale-110"
//               />
//             </Link>
//           </div>
//         </div>

//         {/* Bottom Copyright */}
//         <div className="mt-8 text-center text-gray-400 text-sm">
//           &copy; 2025 VentureLink. All rights reserved.
//         </div>
//       </div>
//     </footer>
  




//     </div>
//   );
// };

// export default HomePage; 



'use client';

import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { 
  FaFacebook, FaWhatsapp, FaTwitter, FaInstagram, 
  FaPhoneAlt, FaEnvelope, FaPhone, FaInfoCircle,
  FaNetworkWired,
  FaLightbulb, FaRocket, FaCogs, FaWallet,
  FaArrowUp, FaChartLine, FaGlobe, FaRobot,
  FaStore, FaSearch, FaUserTie, FaChartBar,
  FaShieldAlt, FaHandshake, FaDatabase
} from 'react-icons/fa';

const HomePage: React.FC = () => {
  // All existing state hooks remain exactly the same
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('investors');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // All existing useEffect hooks remain exactly the same
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 300);
    const timer = setTimeout(() => openModal(), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    setTheme(savedTheme || 'light');
    AOS.init({ duration: 2000 });
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // All existing functions remain exactly the same
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-950 text-gray-100' : 'bg-gray-50 text-gray-900'} font-sans`}>
      
      {/* Premium Glass Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 py-3 px-6 md:px-12 backdrop-blur-xl ${theme === 'dark' ? 'bg-gray-900/80 border-b border-gray-800' : 'bg-white/95 border-b border-gray-200'} shadow-sm`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Animated 3D Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center"
          >
            <motion.div 
              whileHover={{ rotateY: 180 }}
              transition={{ duration: 0.8 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg mr-3 flex items-center justify-center"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white">
                <path fill="currentColor" d="M12,2L4,12L12,22L20,12L12,2M12,6L16.5,12L12,18L7.5,12L12,6Z" />
              </svg>
            </motion.div>
            <span className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">VentureLink</span>
          </motion.div>

          {/* Holographic Navigation */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex items-center space-x-8"
          >
            {[
              { href: '#features', label: 'Features' },
              { href: '#solutions', label: 'Solutions' },
              { href: '#resources', label: 'Resources' },
              { href: '#pricing', label: 'Pricing' },
              { href: '/home/admin', label: 'Admin' },
            ].map((link, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <Link
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} transition-colors`}
                >
                  {link.label}
                </Link>
                <motion.div
                  layoutId="navHighlight"
                  className={`absolute inset-0 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'} z-[-1] opacity-0 hover:opacity-100 transition-opacity`}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Interactive Controls */}
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-800 text-yellow-300 hover:bg-gray-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} transition-colors`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="lg:hidden p-2 rounded-md"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </motion.button>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="hidden lg:block"
            >
              <Link
                href="/login"
                className={`px-4 py-2 rounded-lg font-medium text-sm ${theme === 'dark' ? 'bg-purple-600 hover:bg-purple-700' : 'bg-blue-600 hover:bg-blue-700'} text-white shadow-lg hover:shadow-xl transition-all`}
              >
                Get Started
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`lg:hidden ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} mt-2 rounded-xl shadow-2xl overflow-hidden`}
          >
            <div className="px-4 py-3 space-y-2">
              {[
                { href: '#features', label: 'Features' },
                { href: '#solutions', label: 'Solutions' },
                { href: '#resources', label: 'Resources' },
                { href: '#pricing', label: 'Pricing' },
                { href: '/home/admin', label: 'Admin' },
              ].map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  onClick={toggleMenu}
                  className={`block px-3 py-2 rounded-lg text-base font-medium ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} transition-colors`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                <Link
                  href="/login"
                  className={`block w-full text-center px-3 py-2 rounded-lg text-base font-medium ${theme === 'dark' ? 'bg-purple-600 hover:bg-purple-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Immersive Hero Section */}
<section className="relative h-screen flex items-center justify-start overflow-hidden pt-16 bg-[url('/images/your-background.jpg')] bg-cover bg-center">
  {/* Optional dark overlay for readability */}
  <div className="absolute inset-0 bg-black/30 z-0" />

 <div className={`absolute inset-0 z-0 ${theme === 'dark' ? 'bg-gray-950/70' : 'bg-gray-50/70'}`}>
  {/* Optional gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-600/10 to-pink-500/10"></div>

  {/* Background image full screen and properly scaled */}
  <div className="absolute inset-0 opacity-20">
    <div className="absolute inset-0 bg-[url('/images/home1.jpg')] bg-cover bg-center bg-no-repeat"></div>
  </div>
</div>


  <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 flex items-start justify-start">
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-left flex flex-col items-start"
    >
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-4xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 leading-tight"
      >
        Intelligent Capital <br /> Meets Innovation
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-xl md:text-2xl max-w-3xl mb-8 text-gray-600 dark:text-gray-400"
      >
        VentureLink's AI-powered platform connects visionary startups with strategic investors for exponential growth.
      </motion.p>

      <div className="flex flex-col sm:flex-row gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block"
        >
          <Link
            href="/login"
            className={`px-8 py-4 rounded-xl font-semibold text-lg shadow-xl ${theme === 'dark' ? 'bg-purple-600 hover:bg-purple-700' : 'bg-blue-600 hover:bg-blue-700'} text-white transition-all`}
          >
            Start Investing
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block"
        >
          <Link
            href="/login"
            className={`px-8 py-4 rounded-xl font-semibold text-lg shadow-xl ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700' : 'bg-white hover:bg-gray-100 border border-gray-200'} text-gray-900 dark:text-gray-100 transition-all`}
          >
            Raise Capital
          </Link>
        </motion.div>
      </div>
    </motion.div>
  </div>

  {/* Floating Particles Animation */}
  <div className="absolute inset-0 overflow-hidden z-0">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: -20, x: Math.random() * 100 - 50 }}
        animate={{
          opacity: [0, 0.8, 0],
          y: [0, Math.random() * 200 + 100],
          x: [0, Math.random() * 200 - 100]
        }}
        transition={{
          duration: Math.random() * 15 + 15,
          repeat: Infinity,
          ease: "linear",
          delay: Math.random() * 5
        }}
        className={`absolute rounded-full ${theme === 'dark' ? 'bg-blue-400/20' : 'bg-blue-500/15'}`}
        style={{
          width: `${Math.random() * 12 + 4}px`,
          height: `${Math.random() * 12 + 4}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`
        }}
      />
    ))}
  </div>
</section>


      {/* Trust Indicators */}
      {/* <section className="py-12 bg-gray-100 dark:bg-gray-900/50 border-y border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-8">
            Trusted by leading organizations worldwide
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-center">
            {['TechCrunch', 'Forbes', 'Y Combinator', 'Sequoia', 'Andreessen'].map((company, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1 }}
                className="flex justify-center"
              >
                <div className={`h-12 flex items-center text-xl font-bold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {company}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our platform is designed to give you the competitive edge in today's fast-moving investment landscape
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <FaRobot className="text-blue-500 text-3xl" />,
                title: "AI Matchmaking",
                description: "Our proprietary algorithm connects you with the most compatible investment opportunities",
                color: "from-blue-500 to-blue-600"
              },
              {
                icon: <FaDatabase className="text-purple-500 text-3xl" />,
                title: "Data Analytics",
                description: "Comprehensive metrics and predictive analytics for informed decision making",
                color: "from-purple-500 to-purple-600"
              },
              {
                icon: <FaNetworkWired className="text-green-500 text-3xl" />,
                title: "Global Network",
                description: "Access to a worldwide network of investors and startups across industries",
                color: "from-green-500 to-green-600"
              },
              {
                icon: <FaShieldAlt className="text-yellow-500 text-3xl" />,
                title: "Secure Platform",
                description: "Bank-grade security and compliance for all your transactions",
                color: "from-yellow-500 to-yellow-600"
              },
              {
                icon: <FaChartBar className="text-red-500 text-3xl" />,
                title: "Performance Tracking",
                description: "Real-time monitoring of your portfolio performance and KPIs",
                color: "from-red-500 to-red-600"
              },
              {
                icon: <FaHandshake className="text-indigo-500 text-3xl" />,
                title: "Deal Management",
                description: "End-to-end deal flow management from initial contact to closing",
                color: "from-indigo-500 to-indigo-600"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className={`bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-800 p-6 relative group`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.color}`}></div>
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-lg bg-blue-50 dark:bg-gray-800 mr-4 group-hover:rotate-12 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Tailored Solutions</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Whether you're an investor or a startup, we have the perfect solution for your needs
            </p>
          </div>
          
          <div className="flex justify-center mb-8">
            <div className={`inline-flex rounded-xl p-1 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}>
              <button
                onClick={() => setActiveTab('investors')}
                className={`px-6 py-2 rounded-lg text-sm font-medium ${activeTab === 'investors' ? (theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900 shadow') : (theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900')}`}
              >
                For Investors
              </button>
              <button
                onClick={() => setActiveTab('startups')}
                className={`px-6 py-2 rounded-lg text-sm font-medium ${activeTab === 'startups' ? (theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900 shadow') : (theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900')}`}
              >
                For Startups
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {activeTab === 'investors' ? (
              <>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-800"
                >
                  <div className="p-8">
                    <div className="flex items-center mb-6">
                      <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 mr-4">
                        <FaSearch className="text-xl" />
                      </div>
                      <h3 className="text-2xl font-bold">Deal Sourcing</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Access our curated pipeline of high-quality investment opportunities across all stages and sectors.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "AI-powered recommendations",
                        "Verified financial metrics",
                        "Customizable search filters",
                        "Sector-specific opportunities"
                      ].map((item, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-1 gap-8"
                >
                  {[
                    {
                      icon: <FaChartBar className="text-purple-500 text-xl" />,
                      title: "Portfolio Management",
                      description: "Track and optimize your investment portfolio with real-time analytics and reporting tools."
                    },
                    {
                      icon: <FaUserTie className="text-green-500 text-xl" />,
                      title: "Investor Relations",
                      description: "Streamlined communication and reporting for your LPs and stakeholders."
                    },
                    {
                      icon: <FaLightbulb className="text-yellow-500 text-xl" />,
                      title: "Market Intelligence",
                      description: "Access proprietary research and insights on emerging trends and sectors."
                    }
                  ].map((item, index) => (
                    <div key={index} className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-800 p-6">
                      <div className="flex items-center mb-4">
                        <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 mr-4">
                          {item.icon}
                        </div>
                        <h3 className="text-xl font-bold">{item.title}</h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                    </div>
                  ))}
                </motion.div>
              </>
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-800"
                >
                  <div className="p-8">
                    <div className="flex items-center mb-6">
                      <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 mr-4">
                        <FaStore className="text-xl" />
                      </div>
                      <h3 className="text-2xl font-bold">Fundraising Platform</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Connect with the right investors for your startup and manage your entire fundraising process in one place.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Targeted investor matching",
                        "Pitch deck hosting",
                        "Deal room management",
                        "Investor communication tools"
                      ].map((item, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-1 gap-8"
                >
                  {[
                    {
                      icon: <FaGlobe className="text-purple-500 text-xl" />,
                      title: "Growth Resources",
                      description: "Access our network of mentors, advisors, and service providers to accelerate your growth."
                    },
                    {
                      icon: <FaHandshake className="text-green-500 text-xl" />,
                      title: "Investor Relations",
                      description: "Maintain strong relationships with your investors through our communication tools."
                    },
                    {
                      icon: <FaChartLine className="text-yellow-500 text-xl" />,
                      title: "Performance Tracking",
                      description: "Monitor your KPIs and metrics to demonstrate progress to current and potential investors."
                    }
                  ].map((item, index) => (
                    <div key={index} className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-800 p-6">
                      <div className="flex items-center mb-4">
                        <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 mr-4">
                          {item.icon}
                        </div>
                        <h3 className="text-xl font-bold">{item.title}</h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                    </div>
                  ))}
                </motion.div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Video Demo Section */}
      <section className="py-20 bg-gradient-to-br from-blue-500 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">See VentureLink in Action</h2>
            <p className="text-xl max-w-2xl mx-auto">Discover how our platform is transforming the way investors and startups connect</p>
          </motion.div>
          
          <div className="relative aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-2xl max-w-4xl mx-auto">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/bgTJl8nL2tw"
              title="VentureLink Platform Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources" className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Resources & Insights</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Stay ahead with our latest research, guides, and success stories
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                category: "Guide",
                title: "The Complete Guide to Startup Investing",
                description: "Learn the strategies and frameworks used by top investors to identify winning startups.",
                link: "home/stories",
                color: "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400"
              },
              {
                category: "Case Study",
                title: "How DeepTech Found $5M in Seed Funding",
                description: "Discover how this AI startup leveraged our platform to secure strategic funding.",
                link: "home/opportunity",
                color: "bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400"
              },
              {
                category: "Research",
                title: "2025 Venture Capital Trends Report",
                description: "Our annual analysis of emerging trends and opportunities in the VC landscape.",
                link: "home/News",
                color: "bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400"
              }
            ].map((resource, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-800"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={`h-48 ${index === 0 ? 'bg-blue-50 dark:bg-blue-900/20' : index === 1 ? 'bg-purple-50 dark:bg-purple-900/20' : 'bg-green-50 dark:bg-green-900/20'} flex items-center justify-center`}>
                  <div className={`px-4 py-2 rounded-full text-xs font-medium ${resource.color}`}>
                    {resource.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">{resource.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">{resource.description}</p>
                  <Link href={resource.link} className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
                    Read More →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Choose the plan that fits your needs. No hidden fees, no surprises.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Starter",
                price: "$99",
                period: "per month",
                description: "Perfect for individual angels and early-stage startups",
                features: [
                  "5 deal views/month",
                  "Basic search filters",
                  "Email support",
                  "Standard analytics"
                ],
                highlight: false
              },
              {
                name: "Professional",
                price: "$499",
                period: "per month",
                description: "For active investors and growing startups",
                features: [
                  "Unlimited deal views",
                  "Advanced search filters",
                  "Priority support",
                  "Enhanced analytics",
                  "Deal tracking"
                ],
                highlight: true
              },
              {
                name: "Enterprise",
                price: "Custom",
                period: "",
                description: "For funds, family offices, and scaling startups",
                features: [
                  "Dedicated account manager",
                  "API access",
                  "Custom reporting",
                  "White-glove onboarding",
                  "Portfolio management"
                ],
                highlight: false
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                className={`rounded-xl overflow-hidden border ${plan.highlight ? (theme === 'dark' ? 'border-purple-500 shadow-lg shadow-purple-500/20' : 'border-purple-500 shadow-lg shadow-purple-500/10') : (theme === 'dark' ? 'border-gray-800' : 'border-gray-200')}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={`p-6 ${plan.highlight ? (theme === 'dark' ? 'bg-gray-800' : 'bg-white') : (theme === 'dark' ? 'bg-gray-800/70' : 'bg-white')}`}>
                  <h3 className={`text-xl font-bold mb-1 ${plan.highlight ? 'text-purple-500' : ''}`}>{plan.name}</h3>
                  <div className="flex items-end mb-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && <span className="text-gray-500 dark:text-gray-400 ml-2">{plan.period}</span>}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">{plan.description}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <svg className={`h-5 w-5 ${plan.highlight ? 'text-purple-500' : 'text-gray-400'} mr-2 mt-0.5`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button className={`w-full py-3 rounded-lg font-medium ${plan.highlight ? 'bg-purple-600 hover:bg-purple-700 text-white' : (theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900')}`}>
                    Get Started
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Investment Strategy?</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Join thousands of investors and startups already growing with VentureLink
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Link
                  href="/login"
                  className="px-8 py-4 rounded-xl font-semibold text-lg shadow-xl bg-white text-blue-600 hover:bg-gray-100 transition-all"
                >
                  Get Started for Free
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <button
                  onClick={openModal}
                  className="px-8 py-4 rounded-xl font-semibold text-lg shadow-xl bg-transparent border-2 border-white hover:bg-white/10 transition-all"
                >
                  Watch Demo
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Get In Touch</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                Have questions or want to learn more? Our team is here to help you navigate the VentureLink platform.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 mr-4">
                    <FaEnvelope className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Email Us</h3>
                    <Link href="mailto:chethancheth63@gmail.com" className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
                      chethancheth63@gmail.com
                    </Link>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 mr-4">
                    <FaPhoneAlt className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Call Us</h3>
                    <Link href="tel:+919019717042" className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
                      +91 90197 17042
                    </Link>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 mr-4">
                    <FaWhatsapp className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">WhatsApp</h3>
                    <Link href="https://wa.me/+919019717042" target="_blank" className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
                      Chat with our team
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-gray-800"
            >
              <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                    placeholder="Your email"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
                  <select
                    id="subject"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                  >
                    <option value="">Select a subject</option>
                    <option value="investor">Investor Inquiry</option>
                    <option value="startup">Startup Support</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                    placeholder="Your message"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className={`py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} border-t border-gray-200 dark:border-gray-800`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mr-2"></div>
                <span className="text-xl font-bold">VentureLink</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                The intelligent platform connecting investors and startups for mutual growth.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#features" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Features</Link></li>
                <li><Link href="#solutions" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Solutions</Link></li>
                <li><Link href="#pricing" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Pricing</Link></li>
                <li><Link href="/login" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Login</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#about" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">About Us</Link></li>
                <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Careers</Link></li>
                <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Press</Link></li>
                <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Blog</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Help Center</Link></li>
                <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">API Docs</Link></li>
                <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Community</Link></li>
                <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Events</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Connect</h4>
              <div className="flex space-x-4 mb-4">
                <Link href="https://www.facebook.com" target="_blank" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                  <FaFacebook size={18} />
                </Link>
                <Link href="https://twitter.com" target="_blank" className="text-gray-600 dark:text-gray-400 hover:text-blue-400 dark:hover:text-blue-300 transition-colors">
                  <FaTwitter size={18} />
                </Link>
                <Link href="https://instagram.com" target="_blank" className="text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400 transition-colors">
                  <FaInstagram size={18} />
                </Link>
                <Link href="https://wa.me/+919019717042" target="_blank" className="text-gray-600 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors">
                  <FaWhatsapp size={18} />
                </Link>
              </div>
              
              <div className="mt-6">
                <h5 className="font-bold mb-2 text-sm">Subscribe to our newsletter</h5>
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="Your email" 
                    className="px-4 py-2 rounded-l-lg focus:outline-none text-gray-900 w-full text-sm"
                  />
                  <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-lg transition-colors text-sm text-white">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} VentureLink. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Privacy Policy</Link>
              <Link href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Terms of Service</Link>
              <Link href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Enhanced Video Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Video Modal"
        className="fixed inset-0 flex items-center justify-center p-4 z-50 focus:outline-none"
        overlayClassName="fixed inset-0 bg-black/75 backdrop-blur-sm"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", damping: 25, stiffness: 500 }}
          className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden w-full max-w-4xl border border-gray-200 dark:border-gray-800"
        >
          <div className="relative aspect-w-16 aspect-h-9">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/bgTJl8nL2tw"
              title="VentureLink Platform Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="p-4 flex justify-end">
            <button 
              onClick={closeModal}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-colors text-gray-900 dark:text-gray-100"
            >
              Close
            </button>
          </div>
        </motion.div>
      </Modal>
    </div>
  );
};

export default HomePage;




// 'use client';

// import { useState, useEffect } from 'react';
// import Modal from 'react-modal';
// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import { FaFacebook, FaWhatsapp, FaTwitter, FaInstagram, FaPhoneAlt, FaEnvelope, FaPhone, FaInfoCircle, FaChevronRight } from 'react-icons/fa';
// import { FiBarChart, FiTrendingUp, FiLayers, FiDatabase, FiPlayCircle, FiClock } from "react-icons/fi";
// import { Briefcase, User, Settings } from "lucide-react";

// const HomePage = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [theme, setTheme] = useState<'light' | 'dark'>('light');
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     setTimeout(() => setIsVisible(true), 300);
//     const timer = setTimeout(() => setIsModalOpen(true), 5000);
//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
//     setTheme(savedTheme || 'light');
//     AOS.init({ duration: 2000 });
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('theme', theme);
//     document.documentElement.classList.toggle('dark', theme === 'dark');
//   }, [theme]);

//   const toggleTheme = () => {
//     setTheme(prev => prev === 'dark' ? 'light' : 'dark');
//   };

//   const closeModal = () => setIsModalOpen(false);

//   return (
//     <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
//       {/* Enhanced Navbar */}
//       <nav className={`fixed top-0 left-0 right-0 z-50 py-4 px-6 lg:px-12 transition-all duration-500 ${theme === 'dark' ? 'bg-gray-800/90 backdrop-blur-md' : 'bg-white/90 backdrop-blur-md shadow-sm'}`}>
//         <div className="max-w-7xl mx-auto flex items-center justify-between">
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}
//             className="flex items-center"
//           >
//             <div className={`w-10 h-10 rounded-lg ${theme === 'dark' ? 'bg-indigo-600' : 'bg-indigo-500'} flex items-center justify-center mr-3`}>
//               <Briefcase className="text-white" size={20} />
//             </div>
//             <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
//               VentureLink
//             </span>
//           </motion.div>

//           <div className="hidden lg:flex items-center space-x-8">
//             {[
//               { href: '#about', label: 'About' },
//               { href: '#services', label: 'Services' },
//               { href: '#contact', label: 'Contact' },
//               { href: 'https://www.google.com', label: 'Google', external: true },
//               { href: '/home/admin', label: 'Admin' },
//             ].map((link, index) => (
//               <Link
//                 key={index}
//                 href={link.href}
//                 target={link.external ? '_blank' : '_self'}
//                 className={`relative text-lg font-medium group ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}
//               >
//                 {link.label}
//                 <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${theme === 'dark' ? 'bg-indigo-400' : 'bg-indigo-600'} transition-all duration-300 group-hover:w-full`}></span>
//               </Link>
//             ))}
//           </div>

//           <motion.button
//             onClick={toggleTheme}
//             className={`flex items-center justify-center w-10 h-10 rounded-full ${theme === 'dark' ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//           >
//             {theme === 'dark' ? (
//               <i className="fas fa-sun text-lg"></i>
//             ) : (
//               <i className="fas fa-moon text-lg"></i>
//             )}
//           </motion.button>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section className="relative h-screen flex items-center justify-center overflow-hidden">
//         <div className={`absolute inset-0 z-0 ${theme === 'dark' ? 'bg-black/60' : 'bg-white/30'}`}></div>
//         <div 
//           className="absolute inset-0 z-[-1] bg-cover bg-center"
//           style={{ backgroundImage: "url('/images/home1.jpg')" }}
//         ></div>
        
//         <motion.div 
//           className="max-w-7xl mx-auto px-6 lg:px-12 z-10 text-center"
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//         >
//           <motion.h1 
//             className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 1, delay: 0.3 }}
//           >
//             <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
//               Connecting Visionaries
//             </span> <br />with Capital
//           </motion.h1>
          
//           <motion.p
//             className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 font-medium"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 1, delay: 0.6 }}
//           >
//             The premier platform linking innovative startups with forward-thinking investors
//           </motion.p>

//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 1, delay: 0.9 }}
//             className="flex flex-col sm:flex-row justify-center gap-4"
//           >
//             <Link
//               href="/login"
//               className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
//             >
//               Get Started Now
//             </Link>
//             <Link
//               href="#video"
//               className="px-8 py-4 border-2 border-indigo-600 text-indigo-600 dark:text-white dark:border-white rounded-lg font-bold text-lg hover:bg-indigo-600 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all duration-300"
//             >
//               Watch Demo
//             </Link>
//           </motion.div>
//         </motion.div>
//       </section>

//       {/* Video Section */}
//       <section id="video" className="py-20 bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-800">
//         <div className="max-w-7xl mx-auto px-6 lg:px-12">
//           <motion.div 
//             className="text-center mb-16"
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//             transition={{ duration: 1 }}
//           >
//             <h2 className="text-3xl md:text-4xl font-bold mb-4">See VentureLink in Action</h2>
//             <p className="text-xl max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
//               Discover how our platform transforms the investment landscape
//             </p>
//           </motion.div>

//           <motion.div 
//             className="relative aspect-w-16 aspect-h-9 rounded-3xl overflow-hidden shadow-2xl"
//             initial={{ opacity: 0, y: 50 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//           >
//             <iframe 
//               className="w-full h-full"
//               src="https://www.youtube.com/embed/bgTJl8nL2tw"
//               title="VentureLink Platform Demo"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//             ></iframe>
//           </motion.div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-20 bg-white dark:bg-gray-900">
//         <div className="max-w-7xl mx-auto px-6 lg:px-12">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
//             <p className="text-xl max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
//               Everything you need to connect, invest, and grow
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {[
//               {
//                 icon: <FiBarChart className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />,
//                 title: "Advanced Analytics",
//                 description: "Real-time data and insights to make informed investment decisions",
//                 color: "from-indigo-100 to-indigo-50 dark:from-indigo-900/50 dark:to-indigo-800/30"
//               },
//               {
//                 icon: <FiTrendingUp className="w-12 h-12 text-green-600 dark:text-green-400" />,
//                 title: "Growth Tracking",
//                 description: "Monitor startup progress and performance metrics",
//                 color: "from-green-100 to-green-50 dark:from-green-900/50 dark:to-green-800/30"
//               },
//               {
//                 icon: <FiLayers className="w-12 h-12 text-blue-600 dark:text-blue-400" />,
//                 title: "Portfolio Management",
//                 description: "Organize and manage all your investments in one place",
//                 color: "from-blue-100 to-blue-50 dark:from-blue-900/50 dark:to-blue-800/30"
//               },
//               {
//                 icon: <FiDatabase className="w-12 h-12 text-purple-600 dark:text-purple-400" />,
//                 title: "Comprehensive Database",
//                 description: "Access to thousands of vetted startup opportunities",
//                 color: "from-purple-100 to-purple-50 dark:from-purple-900/50 dark:to-purple-800/30"
//               },
//               {
//                 icon: <FiPlayCircle className="w-12 h-12 text-red-600 dark:text-red-400" />,
//                 title: "Interactive Demos",
//                 description: "Experience startup products before investing",
//                 color: "from-red-100 to-red-50 dark:from-red-900/50 dark:to-red-800/30"
//               },
//               {
//                 icon: <FiClock className="w-12 h-12 text-yellow-600 dark:text-yellow-400" />,
//                 title: "Time-saving Tools",
//                 description: "Efficient workflows to streamline your investment process",
//                 color: "from-yellow-100 to-yellow-50 dark:from-yellow-900/50 dark:to-yellow-800/30"
//               }
//             ].map((feature, index) => (
//               <motion.div
//                 key={index}
//                 className={`p-8 rounded-2xl bg-gradient-to-br ${feature.color} shadow-md hover:shadow-xl transition-all duration-300`}
//                 initial={{ opacity: 0, y: 50 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 whileHover={{ y: -10 }}
//               >
//                 <div className="flex justify-center mb-6">
//                   {feature.icon}
//                 </div>
//                 <h3 className="text-xl font-bold mb-3 text-center">{feature.title}</h3>
//                 <p className="text-gray-600 dark:text-gray-300 text-center">{feature.description}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
//         <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
//           <motion.h2 
//             className="text-3xl md:text-4xl font-bold mb-6"
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//             transition={{ duration: 1 }}
//           >
//             Ready to Transform Your Investment Strategy?
//           </motion.h2>
//           <motion.p 
//             className="text-xl max-w-3xl mx-auto mb-8"
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//             transition={{ duration: 1, delay: 0.3 }}
//           >
//             Join thousands of investors and startups already benefiting from VentureLink
//           </motion.p>
//           <motion.div
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//             transition={{ duration: 1, delay: 0.6 }}
//           >
//             <Link
//               href="/register"
//               className="inline-block px-8 py-4 bg-white text-indigo-600 rounded-lg font-bold text-lg shadow-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300"
//             >
//               Create Free Account <FaChevronRight className="inline ml-2" />
//             </Link>
//           </motion.div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className={`py-16 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
//         <div className="max-w-7xl mx-auto px-6 lg:px-12">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
//             <div>
//               <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
//                 VentureLink
//               </h3>
//               <p className="mb-6 text-gray-600 dark:text-gray-300">
//                 The premier platform connecting investors with innovative startups worldwide.
//               </p>
//               <div className="flex space-x-4">
//                 {[
//                   { icon: <FaFacebook className="text-xl" />, color: "hover:text-blue-500" },
//                   { icon: <FaTwitter className="text-xl" />, color: "hover:text-blue-400" },
//                   { icon: <FaInstagram className="text-xl" />, color: "hover:text-pink-500" },
//                   { icon: <FaWhatsapp className="text-xl" />, color: "hover:text-green-500" },
//                 ].map((social, index) => (
//                   <Link
//                     key={index}
//                     href="#"
//                     className={`text-gray-500 dark:text-gray-400 ${social.color} transition-colors duration-300`}
//                   >
//                     {social.icon}
//                   </Link>
//                 ))}
//               </div>
//             </div>

//             {[
//               {
//                 title: "Company",
//                 links: ["About Us", "Careers", "Blog", "Press"]
//               },
//               {
//                 title: "Resources",
//                 links: ["Help Center", "Tutorials", "Webinars", "Investor Handbook"]
//               },
//               {
//                 title: "Legal",
//                 links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"]
//               }
//             ].map((column, index) => (
//               <div key={index}>
//                 <h4 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
//                   {column.title}
//                 </h4>
//                 <ul className="space-y-3">
//                   {column.links.map((link, linkIndex) => (
//                     <li key={linkIndex}>
//                       <Link
//                         href="#"
//                         className={`text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300`}
//                       >
//                         {link}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}

//             <div>
//               <h4 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
//                 Contact Us
//               </h4>
//               <ul className="space-y-3">
//                 <li className="flex items-center">
//                   <FaEnvelope className="mr-3 text-gray-500 dark:text-gray-400" />
//                   <span className="text-gray-600 dark:text-gray-400">contact@venturelink.com</span>
//                 </li>
//                 <li className="flex items-center">
//                   <FaPhone className="mr-3 text-gray-500 dark:text-gray-400" />
//                   <span className="text-gray-600 dark:text-gray-400">+1 (555) 123-4567</span>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           <div className="border-t border-gray-200 dark:border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
//             <p className="text-gray-500 dark:text-gray-400 mb-4 md:mb-0">
//               &copy; {new Date().getFullYear()} VentureLink. All rights reserved.
//             </p>
//             <div className="flex space-x-6">
//               <Link href="#" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
//                 Privacy Policy
//               </Link>
//               <Link href="#" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
//                 Terms of Service
//               </Link>
//               <Link href="#" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
//                 Cookies
//               </Link>
//             </div>
//           </div>
//         </div>
//       </footer>

//       {/* Video Modal */}
//       <Modal
//         isOpen={isModalOpen}
//         onRequestClose={closeModal}
//         contentLabel="Video Modal"
//         className="fixed inset-0 flex items-center justify-center p-4 z-50"
//         overlayClassName="fixed inset-0 bg-black/75 backdrop-blur-sm z-40"
//       >
//         <motion.div 
//           className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl w-full max-w-4xl"
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 0.9 }}
//         >
//           <div className="relative aspect-w-16 aspect-h-9">
//             <iframe
//               className="w-full h-full"
//               src="https://www.youtube.com/embed/bgTJl8nL2tw"
//               title="VentureLink Platform Overview"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//             ></iframe>
//           </div>
//           <div className="p-6 flex justify-end">
//             <button
//               onClick={closeModal}
//               className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300"
//             >
//               Close
//             </button>
//           </div>
//         </motion.div>
//       </Modal>
//     </div>
//   );
// };

// export default HomePage;