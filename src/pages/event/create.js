import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import CreateEventForm from "../../components/CreateEvent";

import { apiRequest } from "utils";
import { NFTStorage } from "nft.storage";

import abiJson from "../../abis/EventMinter_abi.json";
import addressJson from "../../abis/EventMinter_address.json";

const initialState = {
  currency: "USD",
};

// const private = "cddc12dce2eb30ed22baaf403dba9c045bb9ab885e75f9d9bf85274608157bde"

const API_KEY = process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY;
const client = new NFTStorage({ token: API_KEY });

export default function CreateEvent() {
  const [formState, setFormState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [minted, setMinted] = useState(false);

  const [user, setUser] = useState(null);
  console.log("user", formState);

  const address = addressJson.address;
  const contractABI = abiJson.abi;

  const handleSubmitandMint = async (e) => {
    e.preventDefault();

    setLoading(true);
    let image = formState.nftFile;
    let jwt = user.jwt;
    console.log("img", image);
    const response = await apiRequest("v0/event", "POST", jwt, {
      name: formState.title,
      numberOfMember: formState.maxAttendees,
      eventImage: image,
    });
    console.log("res", response);
    setFormState(initialState);
    setLoading(false);
    setMinted(true);
  };

  if (minted) {
    return (
      <div>
        <Navbar user={user} setUser={setUser} />
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
      <Navbar user={user} setUser={setUser} />
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
