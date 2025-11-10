// 'use client';

// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Mail, MessageCircle, HelpCircle, Send, Loader2, Users } from 'lucide-react';

// const faqs = [
//   { question: 'How do I reset my password?', answer: 'Go to Settings > Password and follow the instructions to reset your password.' },
//   { question: 'How can I update my profile information?', answer: 'Navigate to Settings > Profile to edit your personal information.' },
//   { question: 'How do I contact support?', answer: 'Use the contact form below to reach out to our support team.' },
// ];

// const HelpAndSupport = () => {
//   const [activeFaq, setActiveFaq] = useState<number | null>(null);
//   const [formData, setFormData] = useState({ name: '', email: '', role: 'Investor', message: '' });
//   const [loading, setLoading] = useState(false);
//   const [statusMessage, setStatusMessage] = useState<string | null>(null);

//   const handleFaqToggle = (index: number) => {
//     setActiveFaq(activeFaq === index ? null : index);
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setStatusMessage(null);

//     try {
//       const response = await fetch('/api/support', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setStatusMessage('✅ Your message has been sent successfully!');
//         setFormData({ name: '', email: '', role: 'Investor', message: '' });
//       } else {
//         setStatusMessage(`❌ ${data.error || 'Failed to send message'}`);
//       }
//     } catch (error) {
//       console.error('Error submitting support message:', error);
//       setStatusMessage('❌ Something went wrong. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-md space-y-6">
//       <h1 className="text-3xl font-bold text-blue-600 text-center">Help & Support</h1>

//       {/* FAQs Section */}
//       <section>
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">Frequently Asked Questions</h2>
//         {faqs.map((faq, index) => (
//           <motion.div
//             key={index}
//             whileHover={{ scale: 1.02 }}
//             className="border-b p-4 cursor-pointer rounded-xl bg-gray-50 hover:bg-gray-100 transition"
//             onClick={() => handleFaqToggle(index)}
//           >
//             <div className="flex justify-between items-center">
//               <h3 className="font-semibold text-gray-700 flex items-center gap-2">
//                 <HelpCircle className="text-blue-500" /> {faq.question}
//               </h3>
//               <span>{activeFaq === index ? '-' : '+'}</span>
//             </div>
//             {activeFaq === index && (
//               <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-2 text-gray-600">
//                 {faq.answer}
//               </motion.p>
//             )}
//           </motion.div>
//         ))}
//       </section>

//       {/* Contact Support Form */}
//       <section>
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Support</h2>
//         <motion.form
//           onSubmit={handleSubmit}
//           className="space-y-4 bg-gray-50 p-4 rounded-xl shadow-md"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           <div className="flex items-center gap-2">
//             <Mail className="text-green-500" />
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Your Name"
//               className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-green-400"
//               required
//             />
//           </div>

//           <div className="flex items-center gap-2">
//             <Mail className="text-blue-500" />
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Your Email"
//               className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400"
//               required
//             />
//           </div>

//           {/* Role Selection */}
//           <div className="flex items-center gap-2">
//             <Users className="text-orange-500" />
//             <select
//               name="role"
//               value={formData.role}
//               onChange={handleChange}
//               className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-orange-400 bg-white"
//               required
//             >
//               <option value="Investor">Investor</option>
//               <option value="Startup">Startup</option>
//             </select>
//           </div>

//           <div className="flex items-start gap-2">
//             <MessageCircle className="text-purple-500 mt-2" />
//             <textarea
//               name="message"
//               value={formData.message}
//               onChange={handleChange}
//               placeholder="Your Message"
//               className="border rounded-lg p-2 w-full h-28 focus:ring-2 focus:ring-purple-400"
//               required
//             />
//           </div>

//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             type="submit"
//             disabled={loading}
//             className="flex items-center justify-center gap-2 bg-blue-500 text-white p-3 rounded-xl w-full shadow-md transition duration-300 hover:bg-blue-600 disabled:bg-gray-400"
//           >
//             {loading ? <Loader2 className="animate-spin" /> : <Send />}
//             {loading ? 'Sending...' : 'Send Message'}
//           </motion.button>

//           {statusMessage && (
//             <p className={`text-center text-sm mt-2 ${statusMessage.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>
//               {statusMessage}
//             </p>
//           )}
//         </motion.form>
//       </section>
//     </div>
//   );
// };

// export default HelpAndSupport;


'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, HelpCircle, Send, Loader2, Users } from 'lucide-react';

const faqs = [
  { question: 'How do I reset my password?', answer: 'Go to Settings > Password and follow the instructions to reset your password.' },
  { question: 'How can I update my profile information?', answer: 'Navigate to Settings > Profile to edit your personal information.' },
  { question: 'How do I contact support?', answer: 'Use the contact form below to reach out to our support team.' },
];

const HelpAndSupport = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', role: 'Investor', message: '' });
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleFaqToggle = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null);

    try {
      const response = await fetch('/api/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatusMessage('✅ Your message has been sent successfully!');
        setFormData({ name: '', email: '', role: 'Investor', message: '' });
      } else {
        setStatusMessage(`❌ ${data.error || 'Failed to send message'}`);
      }
    } catch (error) {
      console.error('Error submitting support message:', error);
      setStatusMessage('❌ Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Help & Support Center</h1>
          <p className="text-lg text-gray-600">Find answers to common questions or contact our support team</p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* FAQs Section */}
          <motion.section
            className="bg-white rounded-xl shadow-lg p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center mb-6">
              <HelpCircle className="text-blue-600 w-8 h-8 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-800">Frequently Asked Questions</h2>
            </div>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  className={`border border-gray-200 rounded-lg overflow-hidden transition-all ${activeFaq === index ? 'bg-blue-50' : 'bg-white'}`}
                  whileHover={{ scale: 1.01 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  <button
                    onClick={() => handleFaqToggle(index)}
                    className="w-full text-left p-4 flex justify-between items-center"
                  >
                    <h3 className="font-medium text-gray-800">{faq.question}</h3>
                    <span className="text-blue-600 font-bold">
                      {activeFaq === index ? '−' : '+'}
                    </span>
                  </button>
                  {activeFaq === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-4 pb-4 text-gray-600"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Contact Form Section */}
          <motion.section
            className="bg-white rounded-xl shadow-lg p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center mb-6">
              <MessageCircle className="text-blue-600 w-8 h-8 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-800">Contact Our Team</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                  You are a
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Users className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white"
                    required
                  >
                    <option value="Investor">Investor</option>
                    <option value="Startup">Startup</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Message
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3">
                    <MessageCircle className="h-5 w-5 text-gray-400" />
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="How can we help you?"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="pt-2">
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin mr-2 h-4 w-4" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </div>

              {statusMessage && (
                <div className={`rounded-md p-3 ${statusMessage.startsWith('✅') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                  <p className="text-sm text-center">{statusMessage}</p>
                </div>
              )}
            </form>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default HelpAndSupport;