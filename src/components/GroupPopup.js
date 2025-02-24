import React, { useState, useEffect, useRef } from "react";

const colors = ["#ff6b6b", "#ffcc00", "#6bcf6b", "#6b8cff", "#ff6bcc", "#6b6b6b"];

const GroupPopup = ({ onClose, onSubmit }) => {
  const [groupName, setGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState(colors[0]); // Default color
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

        {/* Color Picker */}
        <div className="color-picker">
          {colors.map((color) => (
            <div
              key={color}
              className={`color-option ${selectedColor === color ? "selected" : ""}`}
              style={{ background: color }}
              onClick={() => setSelectedColor(color)}
            ></div>
          ))}
        </div>

        <button onClick={() => onSubmit(groupName, selectedColor)}>Create</button>
      </div>
    </div>
  );
};

export default GroupPopup;
