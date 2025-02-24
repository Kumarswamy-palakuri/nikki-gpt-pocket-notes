import React, { useState, useEffect, useRef } from "react";

const COLORS = ["#FF5733", "#33A8FF", "#33FF57", "#FF33A8", "#FFC300", "#8E44AD"];

const GroupPopup = ({ onClose, onSubmit }) => {
  const [groupName, setGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
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
        <input 
          type="text" 
          placeholder="Group Name" 
          value={groupName} 
          onChange={(e) => setGroupName(e.target.value)} 
        />
        <div className="color-picker">
          {COLORS.map(color => (
            <div 
              key={color} 
              className={`color-circle ${color === selectedColor ? "selected" : ""}`} 
              style={{ backgroundColor: color }} 
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </div>
        <button onClick={() => onSubmit(groupName, selectedColor)} disabled={!groupName.trim()}>Create</button>
      </div>
    </div>
  );
};

export default GroupPopup;
