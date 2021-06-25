import { BigNumber } from '@ethersproject/bignumber'
import { formatBalance } from './formatBalance'

export function formatToken(
  amount: BigNumber,
  symbol: string,
  approx: boolean = false,
) {
  const prefix = !approx || amount.isZero() ? '' : '≈ '
  return `${prefix}${formatBalance(amount)} ${symbol}`
}
