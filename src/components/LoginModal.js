import random from "random-name";
import { ABI, PROFILE_CONTRACT_ADDRESS } from "config/profile_config";
import { apiRequest } from "utils";
import { connectWallet } from "utils/auth";
import { ethers } from "ethers";
import { useEffect } from "react";

export default function LoginModal({ isModalOpen, setIsModalOpen }) {
  useEffect(() => {
    async function showModal() {
      const auth = await connectWallet();
      if (auth === null) {
        setIsModalOpen(false);
      } else {
        try {
          const response = await apiRequest("user", "POST", {
            firstName: random.first(),
            lastName: random.last(),
            ethereumAddress: window.ethereum.selectedAddress,
          });

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
