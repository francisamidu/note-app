import React, {
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ethers } from "ethers";

const ContractContext = createContext(null);
const ContractProvider = ({
  children,
}: PropsWithChildren<Partial<ReactNode>>) => {
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const contractABI = require("../artifacts/contracts/Note.sol/Note.json");
  useEffect(() => {
    //Blockchain config
    // const contractAddress = "0x2104Df21CAF52550d3d1eC3E2680319338f8E10f";
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const provider = new ethers.providers.JsonRpcProvider(
      "http://127.0.0.1:8545/"
      // `https://ropsten.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`
    );
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
