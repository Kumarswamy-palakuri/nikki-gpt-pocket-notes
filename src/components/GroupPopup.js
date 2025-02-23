import React, { useState, useEffect, useRef } from "react";

const GroupPopup = ({ onClose, onSubmit }) => {
  const [groupName, setGroupName] = useState("");
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div className="popup-overlay">
      <div className="popup-content" ref={popupRef}>
        <h3>Create New Group</h3>
        <input type="text" placeholder="Group Name" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
        <button onClick={() => onSubmit(groupName)}>Create</button>
      </div>
    </div>
  );
};

export default GroupPopup;
