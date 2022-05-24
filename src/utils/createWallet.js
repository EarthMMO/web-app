// import * as SecureStore from "expo-secure-store";
import { Buffer } from "buffer";
import { apiRequest } from "utils";
import { ethers } from "ethers";

const path = `m/44'/60'/0'/0/1`;

export const createOrImportWallet = async (importedMnemonics = "") => {
  try {
    let wallet;
    if (importedMnemonics === "") {
      wallet = ethers.Wallet.createRandom({ path });
    } else {
      wallet = ethers.Wallet.fromMnemonic(importedMnemonics, path);
    }

    const mnemonics = wallet.mnemonic.phrase;
    const privateKey = wallet.privateKey;
    const ethereumAddress = wallet.address;

    console.log("WALLET", {
      mnemonic: wallet.mnemonic.phrase,
      privateKey: wallet.privateKey,
      ethereumAddress: wallet.address,
    });

    const signature = await wallet.signMessage(Buffer.from("hello"));

    const response = await apiRequest("v0/user", "POST", {
      ethereumAddress,
      signature,
    });

    console.log("RESPONSE", response);

    await SecureStore.setItemAsync(
      "wallet",
      JSON.stringify({
        ethereumAddress,
        mnemonics,
        privateKey,
        userId: response.userId,
      })
    );

    return { ethereumAddress, userId: response.userId };
  } catch (error) {
    console.log(error);
  }
};
