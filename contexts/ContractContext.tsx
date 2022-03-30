import React, {
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ethers } from "ethers";
import { getProvider } from "../helpers";

const ContractContext = createContext(null);
const ContractProvider = ({
  children,
}: PropsWithChildren<Partial<ReactNode>>) => {
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const contractABI = require("../artifacts/contracts/Note.sol/Note.json");
  useEffect(() => {
    //Blockchain config
    const contractAddress = `${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`;
    const provider = getProvider();
    provider.listAccounts().then((accs) => setAccounts(accs));
    const signer = provider.getSigner();
    const noteContract = new ethers.Contract(
      contractAddress,
      contractABI.abi,
      signer
    );
    setContract(noteContract);
  }, [undefined]);

  return (
    <ContractContext.Provider value={{ contract, accounts }}>
      {children}{" "}
    </ContractContext.Provider>
  );
};
const useContract = () => useContext(ContractContext);
export { ContractProvider, useContract };
