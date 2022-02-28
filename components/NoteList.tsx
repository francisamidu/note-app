import React, { useEffect, useState } from "react";

import { AddNote, Note } from ".";
import { useContract } from "../contexts";

const NoteList = ({ darkMode, notes, setNotes }) => {
  const { contract, accounts, web3 } = useContract();
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
  const txObject = {
    from: accounts[0],
    gas: Math.round(6721975 / 2),
    gasPrice: Math.round(67219750 / 2),
  };

  const fetchNotes = async () => {
    if (contract) {
      const {
        methods: { getAllNotes },
      } = contract;
      try {
        const response = await getAllNotes().call();
        const notes = response
          .map((r) => {
            console.log(r);
            return {
              id: r["id"],
              createdAt: r["createdAt"],
              deleted: r["deleted"],
              text: r["text"],
            };
          })
          .filter((r) => !r.deleted);
        setNotes(notes);
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    fetchNotes();
  }, [contract]);
  const handleAddNote = (text: string) => {
    if (contract) {
      const {
        methods: { createNote },
      } = contract;
      createNote(text, new Date().toDateString())
        .send(txObject)
        .then((res) => {
          const {
            events: {
              NoteCreated: { returnValues },
            },
          } = res;
          const note = {
            id: returnValues["id"],
            createdAt: returnValues["createdAt"],
            deleted: false,
            text: returnValues["text"],
          };
          setNotes([...notes, note]);
        })
        .catch(console.log);
    }
  };
  const handleEditNote = (id: number) => {
    const note = notes.find((n) => n.id === id);
    if (note) {
      setNote(note);
    }
  };
  const handleDeleteNote = (id: number) => {
    const {
      methods: { removeNote },
    } = contract;
    removeNote(id - 1)
      .send(txObject)
      .then(() => {
        const newNotes = notes.filter((note) => note.id !== id);
        setNotes(newNotes);
      })
      .catch(console.log);
  };
  const handleUpdateNote = (text: string) => {
    const {
      methods: { updateNote },
    } = contract;
    updateNote(note.id - 1, text)
      .send(txObject)
      .then((res) => {
        const {
          events: {
            NoteUpdated: { returnValues },
          },
        } = res;
        const note = {
          id: returnValues["id"],
          createdAt: returnValues["createdAt"],
          deleted: returnValues["deleted"] || false,
          text: returnValues["text"],
        };
        const newNotes = notes.map((n) => {
          if (n.id === note.id) {
            n = note;
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
      })
      .catch(console.log);
  };

  return (
    <section className="note-list md:max-w-screen-xl md:mx-auto min-h-screen pt-20 grid px-4 w-full">
      {notes.map((note, index) => (
        <Note
          darkMode={darkMode}
          key={note.id}
          text={note.text}
          createdAt={note.createdAt}
          id={note.id}
          index={index}
          length={notes.length}
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
