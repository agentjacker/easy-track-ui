import { useWalletInfo } from 'modules/wallet/hooks/useWalletInfo'
import { useConnectWalletModal } from 'modules/wallet/ui/ConnectWalletModal'

import { Container, Button } from '@lidofinance/lido-ui'
import { Text } from 'modules/shared/ui/Common/Text'
import { Title } from 'modules/shared/ui/Common/Title'
import { MotionFormStartNew } from 'modules/motions/ui/MotionFormStartNew'

export default function StartMotionPage() {
  const { isWalletConnected } = useWalletInfo()
  const openConnectWalletModal = useConnectWalletModal()

  return (
    <Container as="main" size="tight">
      <Title>Start Motion</Title>
      {!isWalletConnected && (
        <div>
          <Text size={18} weight={400} children="Connect your wallet first" />
          <br />
          <Button
            type="submit"
            fullwidth
            children="Connect wallet"
            onClick={openConnectWalletModal}
          />
        </div>
      )}
      {isWalletConnected && <MotionFormStartNew />}
    </Container>
  )
}
