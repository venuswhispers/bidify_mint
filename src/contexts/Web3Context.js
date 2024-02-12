import React from "react";

import { providers } from 'ethers'
import { useAccount, useChainId, useWalletClient } from "wagmi";

function clientToSigner(client) {
  const { account, chain, transport } = client
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  }
  const provider = new providers.Web3Provider(transport, network)
  const signer = provider.getSigner(account.address)
  return signer
}

export const Web3Context = React.createContext({});


const Web3ContextProvider = ({ children }) => {

  const { address, isConnected, isConnecting, isReconnecting, connector } = useAccount()
  const chainId = useChainId();

  
  const { data: client } = useWalletClient({ chainId })
  const signer = React.useMemo(() => (client ? clientToSigner(client) : undefined), [client])

  return (
    <Web3Context.Provider value={{ address, isConnected, isConnecting, isReconnecting, connector, chainId, signer }}>
      {children}
    </Web3Context.Provider>
  );
};

export default Web3ContextProvider;
