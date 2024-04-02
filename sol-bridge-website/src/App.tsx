import { useContext, useMemo } from 'react'
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react'
import { MainPage } from '@/pages/main-page'
import { Layout } from '@/components/Layout'
import '@/styles/global.css'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets'
import { clusterApiUrl } from '@solana/web3.js'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { NetworkContext } from './context/networkContext'
import { NetworkProvider } from './provider/networkProvider'

export const App = () => {
  const { network } = useContext(NetworkContext)
  const endpoint = useMemo(() => clusterApiUrl(network), [network])
  const wallets = useMemo(() => [new PhantomWalletAdapter()], [])

  return (
    <ConnectionProvider endpoint={endpoint}>
      <NetworkProvider>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <Layout>
              <MainPage />
            </Layout>
          </WalletModalProvider>
        </WalletProvider>
      </NetworkProvider>
    </ConnectionProvider>
  )
}
