import { Signer } from '@ethersproject/abstract-signer'
import { PopulatedTransaction } from '@ethersproject/contracts'
import { ToastInfo, toast } from '@lidofinance/lido-ui'
import { ResultTx } from '../types'
import { checkConnectedToSafe } from './checkConnectedToSafe'
import { getWalletNameFromProvider } from './getWalletNameFromProvider'

// This workaround exists because gnosis safe return making regular `sendTransaction` endlessly waiting
// https://github.com/ethers-io/ethers.js/blob/7274cd06cf3f6f31c6df3fd6636706d8536b7ee2/packages/providers/src.ts/json-rpc-provider.ts#L226-L246

export async function sendTransactionGnosisWorkaround(
  signer: Signer,
  transaction: PopulatedTransaction,
): Promise<ResultTx> {
  const provider = (signer.provider as any)?.provider
  const walletName = getWalletNameFromProvider(provider)
  const isGnosisSafe = checkConnectedToSafe(provider)

  const pendingToastId = ToastInfo(`Confirm transaction with ${walletName}`)

  if (isGnosisSafe) {
    const hash: string = await (signer as any).sendUncheckedTransaction(
      transaction,
    )
    return {
      type: 'safe',
      tx: { safeTxHash: hash },
    }
  }

  const tx = await signer.sendTransaction(transaction)

  toast.dismiss(pendingToastId)

  return {
    type: 'regular',
    tx,
  }
}
