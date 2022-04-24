import random from "random-name";
import { ABI, PROFILE_CONTRACT_ADDRESS } from "config/profile_config";
import { apiRequest } from "utils";
import { connectWallet } from "utils/auth";
import { ethers } from "ethers";
import { useEffect } from "react";

export default function LoginModal({
  isFirstTimeModalOpen,
  isModalOpen,
  setConnecting,
  setIsFirstTimeModalOpen,
  setIsModalOpen,
  setUser,
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
          const response = await apiRequest("user", "POST", user);
          setUser(user);
          setConnecting(false);

          const name = response.firstName + " " + response.lastName;

          const profile = new ethers.Contract(
            PROFILE_CONTRACT_ADDRESS,
            ABI,
            auth.signer
          );

          const tx = await profile.mintProfile(
            name,
            "Profile Description",
            `ipfs://${response.fileHash}`
          );

          const receipt = await tx.wait();

          const id = await profile.totalSupply();

          const updateResponse = await apiRequest("user", "PATCH", {
            userId: name,
            profileNFTTokenId: id.toString(),
          });
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
