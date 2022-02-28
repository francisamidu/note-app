import React, { useState } from "react";
import { formatDate } from "../helpers";

import {
  AiFillDelete as Delete,
  AiFillEdit as Edit,
  AiFillPushpin as Pin,
} from "react-icons/ai";

const Note = ({
  id,
  text,
  createdAt,
  handleDelete,
  darkMode,
  index,
  length,
}: any) => {
  const [showOptions, setShowOptions] = useState(false);
  return (
    <div
      className={`rounded-md ${
        darkMode ? "bg-blue-300" : "bg-yellow-300"
      } relative py-4 px-4 flex flex-col whitespace-pre-wrap justify-between col-start-${
        index === 0 ? 1 : ++index
      } col-end-${
        index === 0 ? 2 : length - ++index === 0 ? ++index : length
      } min-h-[175px] flex-1 transition-colors duration-300 mb-4`}
    >
      <div className="flex flex-row">
        <p className="w-full h-full">{text}</p>
        <div className="flex flex-row items-center">
          <div className="flex flex-row items-center">
            <Pin className="text-[#010101] cursor-pointer mr-4" />
            <Edit
              className="text-[#010101] cursor-pointer"
              onClick={() => setShowOptions(!showOptions)}
            />
          </div>
          {showOptions && (
            <div className="bg-[#ddd] flex flex-col rounded-md shadow transition-opacity duration-200">
              <span className="mb-3 hover:bg-slate-100 transition-colors duration-300 p-2 cursor-pointer">
                Edit
              </span>
              <span className="hover:bg-slate-100 transition-colors duration-300 p-2 cursor-pointer">
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
