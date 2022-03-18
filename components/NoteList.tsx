import React, { useEffect, useState } from "react";

import { AddNote, Note } from ".";
import { useContract } from "../contexts";
import { formatNote } from "../helpers";

const NoteList = ({
  darkMode,
  notes,
  setNotes,
  setNotification,
  sortNotes,
}) => {
  const { contract } = useContract();
  const [note, setNote] = useState<{
    id: any;
    createdAt: any;
    deleted: boolean;
    text: any;
  }>({
    id: 0,
    createdAt: 0,
    deleted: false,
    text: "",
  });

  const fetchNotes = async () => {
    if (contract) {
      const { getAllNotes } = contract;
      try {
        const response = await getAllNotes();
        const notes = response
          .filter((r) => !r["deleted"])
          .map((r) => formatNote(r));
        setNotes(sortNotes(notes, "ASC"));
      } catch (error) {
        console.log(error)
        addNotification(
          "Couldn't fetch your notes. Please make sure you have an internet connection",
          "ERROR"
        );
      }
    }
  };
  useEffect(() => {
    fetchNotes();
  }, [contract]);

  const addNotification = (
    message: string,
    type: string,
    duration?: number
  ) => {
    setNotification({
      message,
      type,
    });
    setTimeout(() => {
      setNotification({
        message: "",
        type: "",
      });
    }, duration || 2000);
  };
  const handleAddNote = async (text: string) => {
    if (contract) {
      const { createNote } = contract;
      addNotification("Creating a new note..", "LOADING", 1000);
      try {
        const res = await createNote(
          text,
          new Date("2021 05 05").toDateString()
        );
        const tx = await res.wait();
        const { events } = tx;
        const { args } = events[0];
        const note = {
          id: args["id"],
          createdAt: args["createdAt"],
          deleted: false,
          text: args["text"],
        };
        setNotes([...notes, note]);
        setTimeout(() => {
          addNotification("Note successfully added", "SUCCESS");
        }, 1000);
      } catch {
        addNotification("Couldn't create a new note", "ERROR");
      }
    }
  };
  const handleEditNote = (id: number) => {
    const note = notes.find((n) => n.id === id);
    if (note) {
      setNote(note);
    }
  };
  const handleDeleteNote = async (id: number) => {
    const { removeNote } = contract;
    try {
      await removeNote(id - 1);
      const newNotes = notes.filter((note) => note.id !== id);
      setNotes(newNotes);
      addNotification("Note has been removed", "SUCCESS");
    } catch {
      addNotification("Couldn't delete note", "ERROR");
    }
  };
  const handleUpdateNote = async (text: string) => {
    const { updateNote } = contract;
    try {
      const res = await updateNote(note.id - 1, text);
      const tx = await res.wait();
      const { events } = tx;
      const { args } = events[0];
      const newNote = {
        id: args["id"],
        createdAt: args["createdAt"],
        deleted: args["deleted"] || false,
        text: args["text"],
      };
      const newNotes = notes.map((n) => {
        if (n.id === note.id) {
          n = newNote;
        }
        return n;
      });
      setNotes(newNotes);
      setNote({
        createdAt: 0,
        deleted: false,
        id: 0,
        text: "",
      });
      addNotification("Note has been updated", "SUCCESS");
    } catch {
      addNotification("Couldn't update note", "ERROR");
    }
  };

  return (
    <section className="note-list md:max-w-screen-xl md:mx-auto min-h-screen pt-10 mt-10 grid px-4 w-full">
      {notes.map((note, index) => (
        <Note
          darkMode={darkMode}
          note={note}
          key={note.id}
          createdAt={note.createdAt}
          index={index}
          length={notes.length}
          pinned={note.pinned}
          handleEdit={handleEditNote}
          handleDelete={handleDeleteNote}
        />
      ))}
      <AddNote
        addNote={handleAddNote}
        updateNote={handleUpdateNote}
        note={note}
      />
    </section>
  );
};

export default NoteList;
