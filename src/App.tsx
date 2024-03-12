import React from "react";
import { useMetamaskWeb3 } from "./Web3Client"; // Import the custom hook
import "./App.css";
import Contract from "contracts/Lottery.json";

function App() {
  const { web3, account, connect } = useMetamaskWeb3(); // Use the hook
  const contract_address = Contract.networks[5777].address;

  const participants = async () => {
    try {
      await web3!.eth.sendTransaction({
        to: contract_address,
        from: account,
        value: web3!.utils.toWei("1", "ether"),
      });
      console.log("participant added successfully!");
    } catch (error) {
      console.error("Error calling participants", error);
    }
  };
  const selectWinner = async () => {
    const contract = new web3!.eth.Contract(Contract.abi, contract_address);
    try {
      await web3!.eth.sendTransaction({
        from: account,
        to: contract_address,
        data: contract.methods.selectWinner().encodeABI(),
      });
      //await contract.methods.selectWinner().send({from:account,gas:"30000"})
      console.log("selectWinner function called successfully!");
    } catch (error) {
      console.error("Error calling selectWinner:", error);
    }
  };
  const createAcc =async () => {
    try {
      var account_create = web3!.eth.accounts.create();
      console.log(account_create)
    } catch (error) {
      console.error("Error calling", error);
    }
  }

  return (
    <div>
      <h1>Web3 Metamask Example</h1>
      {account ? (
        <p>Connected Account: {account}</p>
      ) : (
        <button onClick={connect}>Connect to Metamask</button>
      )}
      <button onClick={participants}>get participants</button>
      <button onClick={selectWinner}>Select Winner</button>
      <button onClick={createAcc}>Create Account</button>
    </div>
  );
}

export default App;
