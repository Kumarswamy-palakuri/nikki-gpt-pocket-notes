import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Notes from "./components/Notes";
import GroupPopup from "./components/GroupPopup";
import "./styles.css";

const GROUPS_KEY = "groups";
const SELECTED_GROUP_KEY = "selectedGroup";
// Notes are assumed to be stored under key "notes" as an object: { [groupId]: Note[] }

const App = () => {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Initial load: groups + selectedGroup
  useEffect(() => {
    try {
      const savedGroups = JSON.parse(localStorage.getItem(GROUPS_KEY)) || [];
      setGroups(savedGroups);

      const savedSelected = localStorage.getItem(SELECTED_GROUP_KEY);
      const parsedSelected = savedSelected ? JSON.parse(savedSelected) : null;

      // Validate saved selectedGroup still exists
      const effectiveSelected =
        parsedSelected && savedGroups.some(g => g.id === parsedSelected)
          ? parsedSelected
          : savedGroups.length > 0
            ? savedGroups[0].id
            : null;

      setSelectedGroup(effectiveSelected);
      if (effectiveSelected !== parsedSelected) {
        localStorage.setItem(SELECTED_GROUP_KEY, JSON.stringify(effectiveSelected));
      }
    } catch {
      // Fallback to empty
      setGroups([]);
      setSelectedGroup(null);
      localStorage.removeItem(GROUPS_KEY);
      localStorage.removeItem(SELECTED_GROUP_KEY);
    }
  }, []);

  // Persist groups whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(GROUPS_KEY, JSON.stringify(groups));
    } catch {
      // ignore storage failures
    }
  }, [groups]);

  // Persist selectedGroup whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(SELECTED_GROUP_KEY, JSON.stringify(selectedGroup));
    } catch {
      // ignore storage failures
    }
  }, [selectedGroup]);

  // Function to add a new group
  const handleAddGroup = (groupName, color) => {
    const trimmed = (groupName || "").trim();
    if (
      trimmed.length < 2 ||
      groups.some(g => g.name.toLowerCase() === trimmed.toLowerCase())
    ) {
      return;
    }

    const newGroup = {
      id: Date.now(),
      name: trimmed,
      initials: trimmed.slice(0, 2).toUpperCase(),
      color
    };

    const updatedGroups = [...groups, newGroup];
    setGroups(updatedGroups);
    setSelectedGroup(newGroup.id);
    setIsPopupOpen(false);
  };

  // Function to delete a group
  const handleDeleteGroup = (groupId) => {
    const updatedGroups = groups.filter(group => group.id !== groupId);
    setGroups(updatedGroups);

    // Remove the group's notes from LocalStorage
    try {
      const savedNotes = JSON.parse(localStorage.getItem("notes")) || {};
      if (savedNotes && Object.prototype.hasOwnProperty.call(savedNotes, groupId)) {
        delete savedNotes[groupId];
        localStorage.setItem("notes", JSON.stringify(savedNotes));
      } else if (savedNotes && Object.prototype.hasOwnProperty.call(savedNotes, String(groupId))) {
        // In case keys were strings
        delete savedNotes[String(groupId)];
        localStorage.setItem("notes", JSON.stringify(savedNotes));
      }
    } catch {
      // ignore storage failures
    }

    // Update selected group
    const nextSelected = updatedGroups.length > 0 ? updatedGroups[0].id : null;
    setSelectedGroup(nextSelected);
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
      {isPopupOpen && (
        <GroupPopup
          onClose={() => setIsPopupOpen(false)}
          onSubmit={handleAddGroup}
        />
      )}
    </div>
  );
};

export default App;
