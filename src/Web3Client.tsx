import { useEffect, useState } from "react";
import Web3 from "web3";

export function useMetamaskWeb3() {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string>();

  const connectToMetamask = async () => {
    if ((window as any).ethereum) {
      try {
        const web3Instance = new Web3(
          (window as any).ethereum || "http://127.0.0.1:7545"
        );
        setWeb3(web3Instance);

        // Request Metamask to connect
        await (window as any).ethereum.send("eth_requestAccounts");

        // Get the connected account
        const accounts = await web3Instance.eth.getAccounts();

        if (accounts.length > 0) {
          setAccount(accounts[0]);
        }
      } catch (error) {
        console.error(error);
      }
      (window as any).ethereum.on("accountsChanged", function (accounts: any) {
        setAccount(accounts[0]);
      });
    }
  };

  useEffect(() => {
    connectToMetamask();
  }, []);

  return {
    web3,
    account,
    connect: connectToMetamask,
  };
}
