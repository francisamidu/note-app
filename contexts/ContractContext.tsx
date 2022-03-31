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

const ContractContext = createContext(null);
const ContractProvider = ({
  children,
}: PropsWithChildren<Partial<ReactNode>>) => {
  const [contract, setContract] = useState(null);
  const contractABI = require("../artifacts/contracts/Note.sol/Note.json");
  useEffect(() => {
    //Blockchain config
    const contractAddress = `${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`;
    const wallet = ethers.Wallet.fromMnemonic(
      process.env.NEXT_PUBLIC_MNEMONIC
    );

    const provider = getProvider();

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
