import React, { useEffect, useState } from "react";
import { Nav, NoteList } from ".";
import { useNotes } from "../contexts";

const Main = () => {
  const [darkMode, setDarkMode] = useState(false);
  const { notes, setNotes } = useNotes();
  const [newNotes, setNewNotes] = useState(notes);

  useEffect(() => {
    setNewNotes(notes);
  }, [notes]);

  return (
    <main
      className={darkMode ? "bg-[#030313]  transition-colors duration-100" : ""}
    >
      <Nav
        setDarkMode={setDarkMode}
        darkMode={darkMode}
        notes={notes}
        setNotes={setNewNotes}
      />
      <NoteList darkMode={darkMode} notes={newNotes} setNotes={setNotes} />
    </main>
  );
};

export default Main;
