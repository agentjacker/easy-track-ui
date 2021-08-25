import type { AccessListish } from 'ethers/lib/utils'
import { get } from 'lodash'
import { Chains } from 'modules/blockChain/chains'
import { EvmAddressesByChain } from './evmAddresses'

const ACCESS_LISTS_MAP = {
  [EvmAddressesByChain[Chains.Mainnet].LEGOTopUp]: {
    enact: {
      '0x3e40D73EB977Dc6a537aF587D48316feE66E9C8c': [
        '0xebb05b386a8d34882b8711d156f463690983dc47815980fb82aeeff1aa43579e',
        '0x665fd576fbbe6f247aff98f5c94a561e3f71ec2d3c988d56f12d342396c50cea',
        '0xdee64df20d65e53d7f51cb6ab6d921a0a6a638a91e942e1d8d02df28e31c038e',
      ],
    },
  } as const,
  [EvmAddressesByChain[Chains.Goerli].LEGOTopUp]: {
    enact: {
      '0x4333218072d5d7008546737786663c38b4d561a4': [
        '0xebb05b386a8d34882b8711d156f463690983dc47815980fb82aeeff1aa43579e',
        '0x665fd576fbbe6f247aff98f5c94a561e3f71ec2d3c988d56f12d342396c50cea',
        '0xdee64df20d65e53d7f51cb6ab6d921a0a6a638a91e942e1d8d02df28e31c038e',
      ],
    },
  } as const,
} as const

export function getAccessList(
  contract: string,
  method: string,
): AccessListish | undefined {
  return get(ACCESS_LISTS_MAP, [contract, method], undefined)
}
