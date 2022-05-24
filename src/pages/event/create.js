import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import CreateEventForm from "../../components/CreateEvent";
import {
  checkIfWalletIsConnected,
  updateProviderAndContract,
  EventMinterNft,
} from "../../utils/common";

import { NFTStorage } from "nft.storage";

import abiJson from "../../abis/EventMinter_abi.json";
import addressJson from "../../abis/EventMinter_address.json";

const initalState = {
  currency: "USD",
};

// const private = "cddc12dce2eb30ed22baaf403dba9c045bb9ab885e75f9d9bf85274608157bde"

const API_KEY = process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY;
const client = new NFTStorage({ token: API_KEY });

export default function CreateEvent() {
  const [formState, setFormState] = useState(initalState);
  const [loading, setLoading] = useState(false);
  const [minted, setMinted] = useState(false);
  const [contractRes, setContractRes] = useState(null);
  console.log(formState);
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [currentAccount, setCurrentAccount] = useState("");
  const address = addressJson.address;
  const contractABI = abiJson.abi;

  useEffect(() => {
    checkIfWalletIsConnected(setCurrentAccount);
    updateProviderAndContract(address, contractABI, setProvider, setContract);
  }, []);

  const handleSubmitandMint = async (e) => {
    e.preventDefault();
    console.log("submitting formState", formState);
    setLoading(true);

    const metadata = await client.store({
      name: formState.title,
      description: formState.description,
      image: formState.nftFile,
      properties: { type: "eventNFT" },
    });

    const url = metadata.url.split("//");
    const URI = `https://ipfs.io/ipfs/${url[1]}`;
    console.log("URI", URI);
    EventMinterNft({
      contract,
      quantity: formState.max_attendees,
      URI,
      resetState: () => setFormState(initialState),
      setLoading: setLoading,
    }).then((res) => {
      console.log(res);
      setContractRes(res);
      setMinted(true);
    });
  };

  if (minted) {
    return (
      <div>
        <Navbar />
        <h1>Your event has been created!</h1>
        <h2>
          You can find it on{" "}
          <a href={`https://rinkeby.etherscan.io/address/${address}`}>
            Etherscan
          </a>
        </h2>
      </div>
    );
  }
  return (
    <>
      <Navbar />
      {!loading ? (
        <CreateEventForm
          handleSubmitandMint={handleSubmitandMint}
          formState={formState}
          setFormState={setFormState}
        />
      ) : (
        <p>Loading....</p>
      )}
    </>
  );
}
