import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-blue-100 text-gray-900 relative"
    >
      {/* Background Image with Pencil Sketch Effect */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{
          backgroundImage: "url('https://source.unsplash.com/1600x900/?sketch,doodle,hand-drawn')",
        }}
      ></div>

      {/* Main Content */}
      <div className="bg-white bg-opacity-90 p-8 rounded-lg text-center max-w-2xl shadow-lg relative z-10">
        <h1 className="text-4xl font-bold mb-6">Protect Your Future, Secure Your Life</h1>

        {/* Quote Section with Black Background */}
        <div className="bg-black text-white p-6 rounded-lg mt-4">
          <p className="text-lg italic">
            "Insurance is not just about life; it's about a <strong>secure</strong> future for you and your loved ones."
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
