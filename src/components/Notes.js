import React, { useState, useEffect } from "react";

const Notes = ({ groupId }) => {
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState("");

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || {};
    setNotes(savedNotes[groupId] || []);
  }, [groupId]);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || {};
    savedNotes[groupId] = notes;
    localStorage.setItem("notes", JSON.stringify(savedNotes));
  }, [notes, groupId]);

  const addNote = () => {
    if (!noteText.trim()) return;

    const newNote = { id: Date.now(), text: noteText, timestamp: new Date().toLocaleString() };
    setNotes([...notes, newNote]);
    setNoteText("");
  };

  return (
    <div className="notes-container">
      <h3>My Notes</h3>
      <div className="notes-list">
        {notes.map(note => (
          <div key={note.id} className="note-item">
            <p>{note.text}</p>
            <span>{note.timestamp}</span>
          </div>
        ))}
      </div>
      <div className="note-input">
        <input type="text" placeholder="Type your note..." value={noteText} onChange={(e) => setNoteText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addNote()} />
        <button onClick={addNote} disabled={!noteText.trim()}>➤</button>
      </div>
    </div>
  );
};

export default Notes;
