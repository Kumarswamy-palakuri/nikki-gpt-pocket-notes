import React from "react";

const Sidebar = ({ groups, selectedGroup, onSelectGroup, onAddGroup, onDeleteGroup }) => {
  return (
    <div className="sidebar">
      <h2>Pocket Notes</h2>
      {groups.map(group => (
        <div 
          key={group.id} 
          className={`group-item ${group.id === selectedGroup ? "active" : ""}`} 
          onClick={() => onSelectGroup(group.id)}
        >
          <span className="group-icon" style={{ backgroundColor: group.color }}>{group.initials}</span>
          <span className="group-name">{group.name}</span>
          <button className="delete-group-btn" onClick={(e) => { e.stopPropagation(); onDeleteGroup(group.id); }}>✖</button>
        </div>
      ))}
      <button className="add-group-btn" onClick={onAddGroup}>+</button>
    </div>
  );
};

export default Sidebar;
