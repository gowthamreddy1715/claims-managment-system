import React from "react";
import { motion } from "framer-motion";
import about from "../../../about_pic.webp"

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg border border-gray-300 rounded-lg p-8 max-w-4xl w-full flex flex-col md:flex-row"
      >
        <div className="md:w-1/2 flex justify-center items-center">
          <img
            src={about}
            alt="Insurance Claims"
            className="rounded-lg w-full h-auto object-cover"
          />
        </div>
        <div className="md:w-1/2 p-6">
          <h2 className="text-3xl font-bold text-blue-600 mb-4">About Our Claims Management System</h2>
          <p className="text-gray-700 mb-4">
            Our Insurance Claims Management System simplifies the claims process for policyholders, agents, and administrators. We provide a seamless and efficient platform to file, track, and manage claims with complete transparency.
          </p>
          <ul className="list-disc pl-5 text-gray-700 mb-4">
            <li>📌 Easy claim submission</li>
            <li>📌 Real-time tracking</li>
            <li>📌 Secure document management</li>
            <li>📌 Fast claim approval process</li>
          </ul>
          <p className="text-gray-700">
            We are committed to ensuring a smooth experience for our users, reducing paperwork, and increasing efficiency through automation and digital transformation.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutUs;
