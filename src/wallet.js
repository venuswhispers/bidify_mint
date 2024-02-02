// Set of helper functions to facilitate wallet setup
import { ethers } from "ethers";
import { NETWORKS } from "./constants/config";

/**
 * Prompt the user to add BSC as a network on Metamask, or switch to BSC if the wallet is on a different network
 * @param _chainId
 */
export const switchNetwork = async (_chainId) => {
    // console.log("herer", _chainId)
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${_chainId.toString(16)}` }],
      });
      if (_chainId === 61) {
        window.location.reload();
      }
    } catch (error) {
      // This error code indicates that the chain has not been added to MetaMask.
      console.log("error", error)
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              { chainId: ethers.utils.hexlify(_chainId), rpcUrl: NETWORKS[_chainId].rpcUrls[0]},
            ],
          });
        } catch (addError) {
          // handle "add" error
        }
      }
      // handle other "switch" errors
    }
  };

/**
 * Prompt the user to add a custom token to metamask
 * @param tokenAddress
 * @param tokenSymbol
 * @param tokenDecimals
 * @returns {boolean} true if the token has been added, false otherwise
 */
// export const registerToken = async (tokenAddress, tokenSymbol, tokenDecimals) => {
//   const tokenAdded = await window.ethereum.request({
//     method: 'wallet_watchAsset',
//     params: {
//       type: 'ERC20',
//       options: {
//         address: tokenAddress,
//         symbol: tokenSymbol,
//         decimals: tokenDecimals,
//         image: `http://localhost:3000/bull.png`,
//       },
//     },
//   })

//   return tokenAdded
// }

export const getContract = (address, abi, signer) => {
    return new ethers.Contract(address, abi, signer)
}