import random from "random-name";
import { apiRequest } from "utils";
import { connectWallet } from "utils/auth";
import { ethers } from "ethers";
import { useEffect } from "react";

export default function LoginModal({
  isModalOpen,
  setConnecting,
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
