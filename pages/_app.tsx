import { AppProps } from "next/app";
import { PropsWithChildren, ReactElement, ReactNode } from "react";
import "../styles/index.scss";
import "../node_modules/tailwindcss/tailwind.css";
import "react-toastify/dist/ReactToastify.css";

import {
  AppContextProvider,
  ContractProvider,
  NotesContextProvider,
} from "../contexts";

type AppPropsWithLayout = AppProps & {
  Component: ReactNode;
  PageProps: PropsWithChildren<ReactElement>;
};

const App = ({ Component, PageProps }: AppPropsWithLayout) => {
  return (
    <AppContextProvider>
      <NotesContextProvider>
        <ContractProvider>
          <Component {...PageProps} />
        </ContractProvider>
      </NotesContextProvider>
    </AppContextProvider>
  );
};


export default App;
