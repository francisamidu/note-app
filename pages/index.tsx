import React from "react";
import Head from "next/head";
import { useApp } from "../contexts";
import { Main } from "../components";

const App = () => {
  const { name } = useApp();
  return (
    <>
      <main className="overflow-hidden">
        <Head>
          <title>{name} - A simple note taking app</title>
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta
            name="description"
            content={`${name} is a simple note taking app`}
          />
          <meta name="author" content="Francis Amidu" />
          <meta name="site_name" content={name} />
        </Head>
      </main>
      <Main />
    </>
  );
};
export default App;
