'use client';

import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhoneAlt, FaCommentDots } from 'react-icons/fa';

const ContactSupport: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/support-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();

      if (response.ok) {
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Failed to send message. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-md animate__animated animate__fadeIn mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">Contact Support</h2>
      <p className="text-gray-600 text-center mb-6">Need help? Fill out the form below or reach out to us directly.</p>

      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex items-center">
          <FaUser className="text-gray-500 mr-2" />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Your Name"
            required
          />
        </div>

        <div className="mb-4 flex items-center">
          <FaEnvelope className="text-gray-500 mr-2" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Your Email"
            required
          />
        </div>

        <div className="mb-4 flex items-center">
          <FaCommentDots className="text-gray-500 mr-2" />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md h-28"
            placeholder="Your Message"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-700"><FaEnvelope className="inline text-blue-500" /> support@venturelink.com</p>
        <p className="text-gray-700 mt-2"><FaPhoneAlt className="inline text-blue-500" /> +1 (234) 567-890</p>
      </div>

      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg text-center">
            <h3 className="text-lg font-semibold text-green-600">Message sent successfully!</h3>
          </div>
        </div>
      )}

      {error && (
        <p className="text-red-500 text-center mt-4">{error}</p>
      )}
    </div>
  );
};

export default ContactSupport;
