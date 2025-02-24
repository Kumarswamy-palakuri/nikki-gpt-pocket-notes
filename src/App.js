import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Notes from "./components/Notes";
import GroupPopup from "./components/GroupPopup";
import "./styles.css";

const App = () => {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Load groups from LocalStorage on page load
  useEffect(() => {
    const savedGroups = JSON.parse(localStorage.getItem("groups")) || [];
    setGroups(savedGroups);
    if (savedGroups.length > 0) {
      setSelectedGroup(savedGroups[0].id);
    }
  }, []);

  // Save groups to LocalStorage whenever they change
  useEffect(() => {
    localStorage.setItem("groups", JSON.stringify(groups));
  }, [groups]);

  // Function to add a new group
  const handleAddGroup = (groupName, color) => {
    if (groupName.length < 2 || groups.some(g => g.name.toLowerCase() === groupName.toLowerCase())) return;

    const newGroup = {
      id: Date.now(),
      name: groupName,
      initials: groupName.slice(0, 2).toUpperCase(),
      color
    };

    const updatedGroups = [...groups, newGroup];
    setGroups(updatedGroups);
    setSelectedGroup(newGroup.id);
    localStorage.setItem("groups", JSON.stringify(updatedGroups)); // Save to LocalStorage
    setIsPopupOpen(false);
  };

  // Function to delete a group
  const handleDeleteGroup = (groupId) => {
    const updatedGroups = groups.filter(group => group.id !== groupId);
    setGroups(updatedGroups);
    localStorage.setItem("groups", JSON.stringify(updatedGroups));

    // Remove the group's notes from LocalStorage
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || {};
    delete savedNotes[groupId];
    localStorage.setItem("notes", JSON.stringify(savedNotes));

    // Update selected group
    setSelectedGroup(updatedGroups.length > 0 ? updatedGroups[0].id : null);
  };

  return (
    <div className="app-container">
      <Sidebar
        groups={groups}
        selectedGroup={selectedGroup}
        onSelectGroup={setSelectedGroup}
        onAddGroup={() => setIsPopupOpen(true)}
        onDeleteGroup={handleDeleteGroup}
      />
      {selectedGroup && <Notes groupId={selectedGroup} />}
      {isPopupOpen && <GroupPopup onClose={() => setIsPopupOpen(false)} onSubmit={handleAddGroup} />}
    </div>
  );
};

export default App;
