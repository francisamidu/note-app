import React, {
  createContext,
  useState,
  useContext,
  PropsWithChildren,
  ReactNode,
} from "react";

const AppContext = createContext<{
  name: string;
  year: number;
}>({
  name: "",
  year: 0,
});

export const AppContextProvider = ({
  children,
}: PropsWithChildren<ReactNode>) => {
  const [data, setData] = useState({
    name: "Noter",
    year: new Date().getFullYear(),
  });

  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);
