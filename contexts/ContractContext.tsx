import React, {
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import Web3 from "web3";
const web3 = new Web3("http://localhost:9545");

const ContractContext = createContext(null);
const ContractProvider = ({
  children,
}: PropsWithChildren<Partial<ReactNode>>) => {
  const [contract, setContract] = useState(null);
  const contractABI = require("../build/contracts/Note.json");
  const [accounts, setAccounts] = useState([]);
  useEffect(() => {
    //Blockchain config
    const contractAddress = "0x3Df96e473a07868776Ce7A4fE16424502aBDD7c5";
    const noteContract = new web3.eth.Contract(
      contractABI.abi,
      contractAddress
    );
    setContract(noteContract);
    web3.eth
      .getAccounts()
      .then((accounts) => setAccounts(accounts))
      .catch(console.log);
  }, [undefined]);

  return (
    <ContractContext.Provider value={{ contract, accounts, web3 }}>
      {children}{" "}
    </ContractContext.Provider>
  );
};
const useContract = () => useContext(ContractContext);
export { ContractProvider, useContract };
