import React, { useEffect } from "react";

import { AddNote, Note } from ".";
import { useContract } from "../contexts";
import { uid } from "../helpers";

const NoteList = ({ darkMode, notes, setNotes }) => {
  const { contract, accounts, web3 } = useContract();
  const {
    eth: { getBalance, sendTransaction },
    utils: { fromWei, toWei },
  } = web3;
  const txObject = {
    from: accounts[0],
    gas: Math.round(6721975 / 2),
    gasPrice: Math.round(67219750 / 2),
  };

  const makeTransaction = async () => {
    if (contract) {
      const {
        methods: { getAllNotes },
      } = contract;
      try {
        const response = await getAllNotes().call();
        const notes = response
          .map((r) => ({
            id: r["id"],
            createdAt: r["createdAt"],
            deleted: r["deleted"],
            text: r["text"],
          }))
          .filter((r) => !r.deleted);
        setNotes(notes);
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    makeTransaction();
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
          handleDelete={handleDeleteNote}
        />
      ))}
      <AddNote addNote={handleAddNote} />
    </section>
  );
};

export default NoteList;
