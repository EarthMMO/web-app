import random from "random-name";
import { apiRequest } from "utils";
import { connectWallet } from "utils/auth";
import { ethers } from "ethers";
import { useEffect } from "react";
import { ABI, PROFILE_CONTRACT_ADDRESS } from "config/profile_config";

export default function LoginModal({
  isModalOpen,
  setConnecting,
  setIsModalOpen,
  setUser,
  isFirstTimeModalOpen,
  setIsFirstTimeModalOpen,
}) {
  useEffect(() => {
    async function showModal() {
      setConnecting(true);
      const auth = await connectWallet();
      if (auth === null) {
        setConnecting(false);
        setIsModalOpen(false);
      } else {
        //setIsFirstTimeModalOpen(true);
        try {
          const user = {
            firstName: random.first(),
            lastName: random.last(),
            ethereumAddress: window.ethereum.selectedAddress,
          };
          let wallet = new ethers.Wallet(
            "cddc12dce2eb30ed22baaf403dba9c045bb9ab885e75f9d9bf85274608157bde"
          );
          const signature = await wallet.signMessage(Buffer.from("hello"));

          const response = await apiRequest("v0/user", "POST", "", {
            ethereumAddress: wallet.address,
            signature,
          });
          // console.log("res", response);
          setUser(response);
          localStorage.setItem("user", response);
          setConnecting(false);

          // const name = response.firstName + " " + response.lastName;

          // const profile = new ethers.Contract(
          //   PROFILE_CONTRACT_ADDRESS,
          //   ABI,
          //   auth.signer
          // );
          // const tx = await profile.mintProfile(
          //   name,
          //   "Profile Description",
          //   `ipfs://${response.fileHash}`
          // );

          // const receipt = await tx.wait();

          // const id = await profile.totalSupply();

          // const updateResponse = await apiRequest("user", "PATCH", {
          //   userId: name,
          //   profileNFTTokenId: id.toString(),
          // });
        } catch (error) {
          setConnecting(false);
          console.log(error);
        }
      }
    }

    if (isModalOpen) {
      showModal();
    }
  }, [isModalOpen]);

  return null;
}
