import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import CreateEventForm from "../../components/CreateEvent";
import { updateProviderAndContract, EventMinterNft } from "../../utils/common";
import { apiRequestForm } from "utils";

import abiJson from "../../abis/EventMinter_abi.json";
import addressJson from "../../abis/EventMinter_address.json";

const initialState = {
  currency: "USD",
};

// const private = "cddc12dce2eb30ed22baaf403dba9c045bb9ab885e75f9d9bf85274608157bde"

export default function CreateEvent() {
  const [formState, setFormState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [minted, setMinted] = useState(false);
  const [contract, setContract] = useState(null);

  const [user, setUser] = useState(null);
  // console.log("contract", contract);

  const address = addressJson.address;
  const contractABI = abiJson.abi;
  //TODO: get user from local storage

  useEffect(() => {
    updateProviderAndContract(address, contractABI, setContract);
  }, []);

  const handleSubmitandMint = async (e) => {
    e.preventDefault();

    setLoading(true);
    let image = formState.nftFile;
    let jwt = user.jwt;

    let formdata = new FormData();
    formdata.append("name", formState.title);
    formdata.append("numberOfMember", formState.maxAttendees);
    formdata.append("eventImage", image);
    const response = await apiRequestForm("v0/event", "POST", jwt, formdata);

    const URI = `https://ipfs.io/ipfs/${response.ItemNFTImageHash}`;

    EventMinterNft({
      contract,
      quantity: formState.maxAttendees,
      URI,
      resetState: () => setFormState(initialState),
      setLoading: setLoading,
      setMinted: setMinted,
    }).then((res) => {
      console.log("res", res);
    });
    //TODO: call api to update event with eventId

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
