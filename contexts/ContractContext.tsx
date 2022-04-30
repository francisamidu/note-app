import React, {
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ethers } from "ethers";
import {  getProvider } from "../helpers";
import getConfig from "next/config"

const ContractContext = createContext(null);
const ContractProvider = ({
  children,
}: PropsWithChildren<Partial<ReactNode>>) => {
  const { publicRuntimeConfig } = getConfig()  
  const [contract, setContract] = useState(null);
  const contractABI = require("../artifacts/contracts/Note.sol/Note.json");
  useEffect(() => {
    //Blockchain config
    const contractAddress = `${publicRuntimeConfig.CONTRACT_ADDRESS}`;
    const wallet = ethers.Wallet.fromMnemonic(
      publicRuntimeConfig.MNEMONIC
    );

    const provider = new ethers.providers.JsonRpcProvider(
        `https://ropsten.infura.io/v3/${publicRuntimeConfig.INFURA_ID}`
    );

    const signer = wallet.connect(provider);

    const noteContract = new ethers.Contract(
      contractAddress,
      contractABI.abi,
      signer
    );
    setContract(noteContract);
  }, [undefined]);

  return (
    <ContractContext.Provider value={{ contract }}>
      {children}{" "}
    </ContractContext.Provider>
  );
};
const useContract = () => useContext(ContractContext);
export { ContractProvider, useContract };
