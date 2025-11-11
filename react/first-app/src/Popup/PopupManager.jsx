import React, { useState } from "react";
import Popup from "./Popup";
import './Popup.css';

function PopupManager() {
  // ✅ Handles 3 popups + counts
  const [popupState, setPopupState] = useState({
    popup1: { show: false, count: 0 },
    popup2: { show: false, count: 0 },
    popup3: { show: false, count: 0 },
  });

  const handleOpen = (popupKey) => {
    setPopupState((prev) => ({
      ...prev,
      [popupKey]: {
        show: true,
        count: prev[popupKey].count + 1,
      },
    }));
  };

  const handleClose = (popupKey) => {
    setPopupState((prev) => ({
      ...prev,
      [popupKey]: { ...prev[popupKey], show: false },
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 gap-6">
      {/* Buttons */}
      <button
        onClick={() => handleOpen("popup1")}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Open Popup 1 ({popupState.popup1.count})
      </button>

      <button
        onClick={() => handleOpen("popup2")}
        className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
      >
        Open Popup 2 ({popupState.popup2.count})
      </button>

      <button
        onClick={() => handleOpen("popup3")}
        className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
      >
        Open Popup 3 ({popupState.popup3.count})
      </button>

      {/* Popups */}
      <Popup
        show={popupState.popup1.show}
        onClose={() => handleClose("popup1")}
        title={`Popup 1 opened ${popupState.popup1.count} ${
          popupState.popup1.count === 1 ? "time" : "times"
        }`}
      >
        <p>This is Popup 1 content.</p>
        <p>Clicked {popupState.popup1.count} times.</p>
      </Popup>

      <Popup
        show={popupState.popup2.show}
        onClose={() => handleClose("popup2")}
        title={`Popup 2 opened ${popupState.popup2.count} ${
          popupState.popup2.count === 1 ? "time" : "times"
        }`}
      >
        <p>This is Popup 2 content.</p>
        <p>Clicked {popupState.popup2.count} times.</p>
      </Popup>

      <Popup
        show={popupState.popup3.show}
        onClose={() => handleClose("popup3")}
        title={`Popup 3 opened ${popupState.popup3.count} ${
          popupState.popup3.count === 1 ? "time" : "times"
        }`}
      >
        <p>This is Popup 3 content.</p>
        <p>Clicked {popupState.popup3.count} times.</p>
      </Popup>
    </div>
  );
}

export default PopupManager;
