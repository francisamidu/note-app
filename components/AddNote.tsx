import React, { useEffect, useRef, useState } from "react";

const AddNote = ({ addNote, note, updateNote }: any) => {
  const [text, setText] = useState("");
  const textarea = useRef(null);
  useEffect(() => {
    setText(note.text);
    textarea?.current?.focus();
  }, [note]);
  let characterLimit = 200;
  const handleAddNote = () => {
    if (text.trim().length) {
      addNote(text);
      setText("");
    }
  };
  return (
    <div className="bg-blue-200 rounded py-4 px-4 flex flex-col justify-between  min-h-[175px] h-[180px] min-w-[300px] max-w-[350px]">
      <textarea
        className="bg-inherit border-none resize-none outline-none w-full"
        name=""
        id=""
        cols={10}
        rows={8}
        value={text}
        ref={textarea}
        onChange={(event) => {
          if (characterLimit - event.target.value.length >= 0) {
            setText(event.target.value);
          }
        }}
        placeholder="Type to add a note..."
      ></textarea>
      <div className="flex items-center justify-between">
        <small>{characterLimit - text.length} characters remaining</small>
        <button
          onClick={() => {
            if (note.text) {
              updateNote();
            } else {
              handleAddNote();
            }
          }}
          className=" ml-2 py-2 px-6 rounded-sm bg-gray-200 border-none outline-none cursor-pointer flex flex-row items-center justify-center min-h-[30px] min-w-[100px]"
        >
          {note.text ? "Update" : "Save"}
        </button>
      </div>
    </div>
  );
};

export default AddNote;
