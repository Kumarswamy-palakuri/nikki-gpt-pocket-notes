import React from "react";

const Sidebar = ({ groups, selectedGroup, onSelectGroup, onAddGroup }) => {
  return (
    <div className="sidebar">
      <h2>Pocket Notes</h2>
      {groups.map(group => (
        <div 
          key={group.id} 
          className={`group-item ${group.id === selectedGroup ? "active" : ""}`} 
          onClick={() => onSelectGroup(group.id)}
        >
          <span className="group-icon" style={{ background: group.color }}>{group.initials}</span>
          {group.name}
        </div>
      ))}
      <button className="add-group-btn" onClick={onAddGroup}>+</button>
    </div>
  );
};


export default Sidebar;
