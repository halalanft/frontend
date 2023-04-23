import ContractAddress from '~/contracts/address.json'

export const Halalanft =
  process.env.NEXT_PUBLIC_CHAIN === 'fuji'
    ? ContractAddress.fuji.Halalanft
    : ContractAddress.avax.Halalanft

export const USDC =
  process.env.NEXT_PUBLIC_CHAIN === 'fuji'
    ? ContractAddress.fuji.USDC
    : ContractAddress.avax.USDC

export const truncate = (address) => {
  const match = address.match(/^(0x[a-zA-Z0-9])[a-zA-Z0-9]+([a-zA-Z0-9])$/)
  return match
    ? `0x${address.slice(2, 6)}…${address.slice(address.length - 4)}`
    : address
}
