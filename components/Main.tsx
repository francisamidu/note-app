import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { CustomSelect, Nav, NoteList } from ".";
import { useNotes } from "../contexts";

const Main = () => {
  const [darkMode, setDarkMode] = useState(false);
  const { notes, setNotes } = useNotes();
  const [newNotes, setNewNotes] = useState(notes);
  const [notification, setNotification] = useState<{
    message: string;
    type: "MESSAGE" | "ERROR" | "SUCCESS" | "";
  }>({
    message: "",
    type: "",
  });

  const sortNotes = (notes: any, mode: "ASC" | "DESC") => {
    const newNotes =
      mode === "ASC"
        ? notes.sort(
            (firstNote, secondNote) =>
              new Date(secondNote.createdAt).getTime() -
              new Date(firstNote.createdAt).getTime()
          )
        : notes.sort(
            (firstNote, secondNote) =>
              new Date(firstNote.createdAt).getTime() -
              new Date(secondNote.createdAt).getTime()
          );
    return newNotes;
  };

  const filterNotes = (event) => {
    const {
      target: { value },
    } = event;
    const mode = value?.includes("ASC") ? "ASC" : "DESC";
    const newNotes = sortNotes(notes, mode);
    setNewNotes(newNotes);
    setNotes(newNotes);
  };

  useEffect(() => {
    setNewNotes(notes);
  }, [notes]);
  useEffect(() => {
    if (notification?.message && notification?.type) {
      toast(notification.message);
    }
  }, [notification]);

  return (
    <main
      className={darkMode ? "bg-[#030313]  transition-colors duration-100" : ""}
    >
      {notification.message && (
        <ToastContainer
          className={
            notification.type === "ERROR"
              ? "text-red-200"
              : notification.type === "MESSAGE"
              ? "text-blue-200"
              : "text-green-200"
          }
        />
      )}
      <Nav
        setDarkMode={setDarkMode}
        darkMode={darkMode}
        notes={notes}
        setNotes={setNewNotes}
      />
      {/**TODO - FIX sorting */}
      {/* <div className="mt-10 pt-10 p-4 mb-4 md:max-w-screen-xl md:mx-auto">
        <div className="w-1/5">
          <CustomSelect
            onChange={(event) => filterNotes(event)}
            text="Sort By"
          />
        </div>
      </div> */}
      <NoteList
        darkMode={darkMode}
        notes={newNotes}
        setNotes={setNotes}
        setNotification={setNotification}
        sortNotes={sortNotes}
      />
    </main>
  );
};

export default Main;
