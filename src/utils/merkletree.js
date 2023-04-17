import { ethers } from 'ethers'
import MerkleTree from 'merkletreejs'

const SHA256 = require('crypto-js/sha256')

const whitelistedAddr = [
  '0x5c0fb9D7c009Df03F463704E9BFd40314326C424',
  '0x754772e7C31910EbeD8b085B64B6f03A605b1deD',
]

export function getProof(address) {
  const hashAddress = whitelistedAddr.map((address) =>
    ethers.utils.solidityKeccak256(['bytes20'], [address])
  )
  const leaf = ethers.utils.solidityKeccak256(['bytes20'], [address])

  const tree = new MerkleTree(hashAddress)
  return tree.getHexProof(leaf)
}
