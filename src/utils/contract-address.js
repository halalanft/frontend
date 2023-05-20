import ContractAddress from '~/contracts/address.json'

export const Halalanft =
  process.env.NEXT_PUBLIC_CHAIN === 'fuji'
    ? ContractAddress.fuji.Halalanft
    : ContractAddress.avax.Halalanft

export const USDC =
  process.env.NEXT_PUBLIC_CHAIN === 'fuji'
    ? ContractAddress.fuji.USDC
    : ContractAddress.avax.USDC

export const TREASURY = '0xB85885977D5daf4D6768AFC670C14a5FC209b8E9'
export const FILANTROFI = '0x6A07F68a60eB5890947A5af40F3eA928447d5527'
export const MARKOPS = '0x42EF5475Eb5951B92cE28dccECB720654623fCb2'
export const TEAMS = '0x742a1b678a34F9E79Ff4468968FFed99676ad3dc'

export const truncate = (address) => {
  const match = address.match(/^(0x[a-zA-Z0-9])[a-zA-Z0-9]+([a-zA-Z0-9])$/)
  return match
    ? `0x${address.slice(2, 6)}…${address.slice(address.length - 4)}`
    : address
}
