import { ethers } from "ethers";
// import { toast } from "react-toastify";
import addressJson from "../abis/EventMinter_address.json";

export async function requestAccount() {
  await window.ethereum.request({ method: "eth_requestAccounts" });
}

export function getContract(contractAddr, artifact) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddr, artifact.abi, signer);

  return contract;
}

export const getSignedContract = (address, contractABI) => {
  const { ethereum } = window;

  if (ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(address, contractABI, signer);
  }

  return null;
};

export const updateProviderAndContract = (
  address,
  contractABI,
  setProvider,
  setContract
) => {
  const { ethereum } = window;

  if (!ethereum) return;

  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(address, contractABI, signer);

  setProvider(provider);
  setContract(contract);
};

export const checkIfWalletIsConnected = async (setCurrentAccount) => {
  try {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      // console.log("We have the ethereum object", ethereum);
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];
      setCurrentAccount(account.toLowerCase());
    }
  } catch (error) {
    console.log(error);
  }
};

export const connectWallet = async (setCurrentAccount) => {
  try {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Get MetaMask!");
      return;
    }

    const accounts = await ethereum.request({ method: "eth_requestAccounts" });

    setCurrentAccount(accounts[0].toLowerCase());
  } catch (error) {
    console.log(error);
  }
};

export const getTokenCount = async (contract) => {
  try {
    if (!contract) {
      return;
    }

    const result = await contract._tokenIds();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const EventMinterNft = async ({
  contract,
  quantity,
  URI,
  resetState,
  setLoading,
}) => {
  try {
    if (!contract) {
      return;
    }
    const txn = await contract.EventMinter(quantity, URI);
    await txn.wait();
    resetState();
    setLoading(false);
  } catch (error) {
    console.log(error);
  }
};
