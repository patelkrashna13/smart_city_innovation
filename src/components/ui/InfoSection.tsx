import React from "react";

export const InfoSection: React.FC = () => (
  <div className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-6 shadow-md mt-8">
    <h2 className="text-xl font-bold mb-4 text-gray-700 dark:text-gray-200">
      About Smart City Innovation
    </h2>
    <p className="mb-2 text-gray-700 dark:text-gray-300">
      Smart City Innovation is a platform to monitor, manage, and optimize urban
      infrastructure using real-time data and AI-driven insights. Our goal is to
      empower city officials and citizens for a smarter, greener, and more
      efficient city.
    </p>
    <h3 className="font-semibold mt-4 mb-1 text-gray-800 dark:text-gray-100">
      Contact
    </h3>
    <p className="text-gray-700 dark:text-gray-300">
      Email:{" "}
      <a
        href="mailto:info@smartcity.com"
        className="text-blue-600 dark:text-blue-400 underline"
      >
        info@smartcity.com
      </a>
    </p>
  </div>
);
