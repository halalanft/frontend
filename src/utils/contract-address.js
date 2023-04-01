import ContractAddress from '@/contracts/address.json'

export const Halalanft =
  process.env.NEXT_PUBLIC_CHAIN === 'fuji'
    ? ContractAddress.fuji.Halalanft
    : ContractAddress.avax.Halalanft

export const USDC =
  process.env.NEXT_PUBLIC_CHAIN === 'fuji'
    ? ContractAddress.fuji.USDC
    : ContractAddress.avax.USDC
