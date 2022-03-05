import React, { useState } from "react";
import { formatDate } from "../helpers";
import { IoIosMore as Edit } from "react-icons/io";

const Note = ({
  handleDelete,
  handleEdit,
  darkMode,
  index,
  length,
  note: { id, text, createdAt },
}: any) => {
  const [showOptions, setShowOptions] = useState(false);
  return (
    <div
      className={`rounded-md ${
        darkMode ? "bg-blue-300" : "bg-gray-300"
      } relative py-4 px-4 flex flex-col whitespace-pre-wrap justify-between col-start-${
        index === 0 ? 1 : ++index
      } col-end-${
        index === 0 ? 2 : length - ++index === 0 ? ++index : length
      } max-h-[175px] min-h-[150px] transition-colors duration-300 mb-4`}
    >
      <div className="flex flex-row">
        <p className="w-full h-full">{text}</p>
        <div className="flex flex-row items-center relative">
          <div className="flex flex-row items-center">
            <Edit
              className="text-[#010101] cursor-pointer"
              onClick={() => setShowOptions(!showOptions)}
            />
          </div>
          {showOptions && (
            <div className="sm:bg-gray-300 bg-gray-200 flex flex-col rounded-md shadow transition-opacity duration-200 absolute sm:-right-12 -right-4 top-6 z-10">
              <span
                className="hover:bg-gray-200 transition-colors duration-300 p-2 cursor-pointer rounded-t-md"
                onClick={() => {
                  handleEdit(id);
                  setShowOptions(!showOptions);
                }}
              >
                Edit
              </span>
              <span
                className="hover:bg-gray-200 transition-colors duration-300 p-2 cursor-pointer rounded-b-md"
                onClick={() => {
                  handleDelete(id);
                  setShowOptions(!showOptions);
                }}
              >
                Delete
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-row items-center justify-between">
        <span className="text-[#010101]">{formatDate(createdAt)}</span>
      </div>
    </div>
  );
};

export default Note;
