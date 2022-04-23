import { connectWallet } from "utils/auth";
import { useEffect } from "react";

export default function LoginModal({ isModalOpen, setIsModalOpen }) {
  useEffect(() => {
    async function showModal() {
      const auth = await connectWallet();
      if (auth === null) {
        setIsModalOpen(false);
      }
    }

    if (isModalOpen) {
      showModal();
    }
  }, [isModalOpen]);

  return null;
}
