import React, { useState, ReactNode } from 'react'

import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { NetworkContext } from '@/context/networkContext'

interface NetworkProviderProps {
  children: ReactNode
}

export const NetworkProvider: React.FC<NetworkProviderProps> = ({
  children,
}) => {
  const [network, setNetwork] = useState(WalletAdapterNetwork.Testnet)

  return (
    <NetworkContext.Provider value={{ network, setNetwork }}>
      {children}
    </NetworkContext.Provider>
  )
}
