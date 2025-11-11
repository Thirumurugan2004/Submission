import React from "react";

const Popup = ({ show, onClose, title, children }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl w-96 p-6 text-center">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">{title}</h2>
        <div className="text-gray-600 mb-5">{children}</div>

        <button
          onClick={onClose}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
