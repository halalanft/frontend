import hero from '~/assets/images/concept_art_2.jpg'

export const ipfsImageLoader = (src) => {
  let uri =
    process.env.NEXT_PUBLIC_CHAIN === 'fuji'
      ? hero.src
      : `https://bafybeibh75j55znjxogziaj6q4733shwmscjudhwtmrxnmn34vgxhwtdti.ipfs.nftstorage.link/${src}`
  return uri
}

export const ipfsDetailsLoader = (selected) => {
  return `https://bafybeiecprfgyddv2o4ro2fxgyrsd6iuizroratl3gi27etgmtr636ouay.ipfs.nftstorage.link/${selected}.json`
}
