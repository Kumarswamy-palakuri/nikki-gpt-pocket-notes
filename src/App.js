import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Notes from "./components/Notes";
import GroupPopup from "./components/GroupPopup";
import "./styles.css";

const App = () => {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const savedGroups = JSON.parse(localStorage.getItem("groups")) || [];
    setGroups(savedGroups);
    if (savedGroups.length > 0) {
      setSelectedGroup(savedGroups[0].id);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("groups", JSON.stringify(groups));
  }, [groups]);

  const handleAddGroup = async (groupName, color) => {
    if (groupName.length < 2 || groups.some(g => g.name.toLowerCase() === groupName.toLowerCase())) return;
  
    const newGroup = { id: Date.now(), name: groupName, initials: groupName.slice(0, 2).toUpperCase(), color };
    setGroups([...groups, newGroup]);
    setSelectedGroup(newGroup.id);
    setIsPopupOpen(false);
  };
  

  return (
    <div className="app-container">
      <Sidebar groups={groups} selectedGroup={selectedGroup} onSelectGroup={setSelectedGroup} onAddGroup={() => setIsPopupOpen(true)} />
      {selectedGroup && <Notes groupId={selectedGroup} />}
      {isPopupOpen && <GroupPopup onClose={() => setIsPopupOpen(false)} onSubmit={handleAddGroup} />}
    </div>
  );
};

export default App;
