import { useEffect, useMemo } from 'react'
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react'
import { clusterApiUrl } from '@solana/web3.js'
import { useNetworkStore } from './store/networkStore'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'

import { Layout } from '@/components/Layout'
import { MainPage } from '@/pages/main-page'

import { Connection, PublicKey } from '@solana/web3.js'

import '@/styles/global.css'

export const App = () => {
  const network = useNetworkStore((state) => state.network)

  const endpoint = useMemo(() => clusterApiUrl(network), [network])
  const wallets = useMemo(() => [new PhantomWalletAdapter()], [])

  // TODO: Analyze the account
  const handleGetBalance = async () => {
    const solana = new Connection('https://api.devnet.solana.com')
    const accountPublicKey = new PublicKey(
      '14XaUVhoLCcHL2dZj62yvwnvhJRi1ir6x9orSGPPpaen'
    )
    const mintAccount = new PublicKey(
      'ssSjvvxJQddW9EgBE7CbEW64iQkUPDxU7AMqicvDqfQ'
    )
    const account = await solana.getTokenAccountsByOwner(accountPublicKey, {
      mint: mintAccount,
    })

    console.log(account)
  }

  useEffect(() => {
    handleGetBalance()
  }, [])

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
