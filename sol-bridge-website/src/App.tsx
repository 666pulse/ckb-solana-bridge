import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react'

import { MainPage } from '@/pages/main-page'
import { Layout } from '@/components/Layout'

import '@/styles/global.css'
import { useMemo, useState } from 'react'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets'
import { clusterApiUrl } from '@solana/web3.js'

import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'

export const App = () => {
  const [network] = useState(WalletAdapterNetwork.Testnet)
  const endpoint = useMemo(() => clusterApiUrl(network), [network])

  const wallets = useMemo(
    () => [new PhantomWalletAdapter()],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network]
  )

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Layout>
            <MainPage />
          </Layout>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}
