import React, {
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
  useState,
} from "react";
import Note from "../types/Note";

const NotesContext = createContext<Note[] | any>([]);

const NotesContextProvider = ({ children }: PropsWithChildren<ReactNode>) => {
  const [notes, setNotes] = useState<Note[]>([]);

  return (
    <NotesContext.Provider value={{ notes, setNotes }}>
      {children}
    </NotesContext.Provider>
  );
};
const useNotes = () => useContext(NotesContext);

export { NotesContextProvider, useNotes };
