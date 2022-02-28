import React from "react";
import { Search } from ".";

import { IoIosMoon as Moon } from "react-icons/io";
import { useApp } from "../contexts";
const Nav = ({ setDarkMode, darkMode, notes, setNotes }) => {
  const { name } = useApp();
  const handleSearch = (query: string) => {
    if (query) {
      const newNotes = notes.filter((note) =>
        note.text.includes(query.toLocaleLowerCase())
      );
      setNotes(newNotes);
    } else {
      setNotes(notes);
    }
  };
  return (
    <nav
      className={`bg-white ${
        darkMode && "bg-[#02000f]"
      } shadow-md w-full fixed top-0 left-0 flex items-center justify-between py-3 px-6`}
    >
      <h1 className={`font-bold text-2xl ${darkMode && "text-white"}`}>
        {name}
      </h1>
      <Search handleSearch={handleSearch} />
      <Moon
        className={`text-2xl cursor-pointer ${darkMode && "text-white"}`}
        onClick={() => setDarkMode(!darkMode)}
      />
    </nav>
  );
};

export default Nav;
