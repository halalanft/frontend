import {
  CheckoutSection,
  ConnectSection,
  ReviewSection,
} from '@/components/pages/minting'
import { MintingLayout } from '@/components/layout'
import { useAccount } from 'wagmi'
import useIsMounted from '@/hooks/useIsMounted'

export default function MintingPage() {
  const { isConnected } = useAccount()
  const isMounted = useIsMounted
  return (
    <>
      {isMounted && isConnected ? <CheckoutSection /> : <ConnectSection />}
      {/* <ReviewSection /> */}
    </>
  )
}

MintingPage.getLayout = function getLayout(page) {
  return <MintingLayout>{page}</MintingLayout>
}

// import {
//   Box,
//   Button,
//   Heading,
//   HStack,
//   Image,
//   Menu,
//   MenuButton,
//   MenuItem,
//   MenuList,
//   Stack,
//   Text,
// } from '@chakra-ui/react'

// import Head from 'next/head'
// import {
//   useAccount,
//   useConnect,
//   useContractRead,
//   useProvider,
//   useSigner,
// } from 'wagmi'
// import { Test } from '@/components/pages/minting'
// import { Owner } from '@/components/owner'
// import ContractAddress from '@/contracts/address.json'
// import HalalanftABI from '@/contracts/Halalanft.json'
// import useIsMounted from '@/hooks/useIsMounted.js'
// import { MintingHeader } from '@/components/header'

// export default function Home() {
//   const mounted = useIsMounted()
//   const { address: accAddress, isConnected: isAccountConnected } = useAccount()
//   const provider = useProvider()
//   const { signer } = useSigner()
//   const {
//     connect,
//     connectors,
//     data: connectData,
//     error: errorConnect,
//     isLoading: isLoadingConnect,
//     pendingConnector,
//   } = useConnect()

//   const { data: totalSupply } = useContractRead({
//     address: ContractAddress.Halalanft,
//     abi: HalalanftABI.abi,
//     functionName: 'totalSupply',
//   })

//   const { data: owner } = useContractRead({
//     address: ContractAddress.Halalanft,
//     abi: HalalanftABI.abi,
//     functionName: 'owner',
//   })

//   return (
//     <>
//       <MintingHeader />
//       <Head>
//         <title>Halalanft - Minting Page</title>
//         <meta name="description" content="Halalanft minting page" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>
//       <Box
//         h="100%"
//         w="100%"
//         borderColor="red.300"
//         display="flex"
//         flexDirection="column"
//         alignItems="center"
//         justifyContent="center"
//       >
//         <Stack
//           direction={{ base: 'column', md: 'row' }}
//           backgroundColor="#FFFFFF"
//           borderColor="#FAD02C"
//           borderWidth="3px"
//           borderRadius="2xl"
//           spacing={3}
//           shadow="lg"
//           p="16px"
//           m="32px"
//         >
//           <Stack direction="column" align="center">
//             <Image
//               px="10px"
//               m="10px"
//               boxSize={{ base: '150px', md: '200px' }}
//               src="minting.jpg"
//               alt="Halalanft"
//             />
//             (
//             {mounted ? (
//               owner == accAddress || !isAccountConnected ? (
//                 <></>
//               ) : (
//                 <>
//                   <Box mt="8px" align="center">
//                     65 USDC
//                     <Box pl="8px" as="span" color="gray.600" fontSize="sm">
//                       per mint
//                     </Box>
//                   </Box>

//                   <Box align="center" mt="8px">
//                     {mounted ? totalSupply?.toNumber() : 0}/ 10,000 minted
//                   </Box>
//                 </>
//               )
//             ) : (
//               <></>
//             )}
//             )
//           </Stack>
//           <Stack direction="column" align="center">
//             {mounted ? (
//               !isAccountConnected ? (
//                 <>
//                   <Heading align="center" size="lg" m="8px" pt="8px">
//                     MINT Halalanft NFTs Now!
//                   </Heading>
//                   <Text align="center" size="lg" m="8px" pt="8px">
//                     You are not connected
//                   </Text>
//                   <Menu isLazy>
//                     <MenuButton as={Button} colorScheme="blue" w="fit-content">
//                       Connect
//                     </MenuButton>
//                     <MenuList>
//                       {connectors.map((connector) => (
//                         <MenuItem
//                           variant="outline"
//                           key={connector.id}
//                           disabled={!connector.ready}
//                           onClick={() => {
//                             connect({ connector })
//                           }}
//                           w="100%"
//                         >
//                           <HStack w="100%" justifyContent="center">
//                             <Image
//                               width={26}
//                               height={26}
//                               borderRadius="3px"
//                               src={walletIcons(connector.name)}
//                               alt={'Wallet'}
//                             ></Image>
//                             <Text>
//                               {connector.name}{' '}
//                               {isLoadingConnect &&
//                                 pendingConnector?.id === connector.id &&
//                                 ' (connecting)'}
//                             </Text>
//                           </HStack>
//                         </MenuItem>
//                       ))}
//                     </MenuList>
//                   </Menu>
//                   <Box mt="8px" align="center">
//                     65 USDC
//                     <Box pl="8px" as="span" color="gray.600" fontSize="sm">
//                       per mint
//                     </Box>
//                   </Box>

//                   <Box align="center" mt="8px">
//                     {mounted ? totalSupply?.toNumber() : 0}/ 10,000 minted
//                   </Box>
//                 </>
//               ) : mounted && owner == accAddress ? (
//                 <>
//                   <Heading align="center" size="lg" m="16px" pt="8px">
//                     Owner Dashboard
//                   </Heading>
//                   <Owner
//                     owner={owner}
//                     isOwner={mounted ? owner == accAddress : false}
//                     accAddress={mounted ? accAddress : null}
//                     isConnected={isAccountConnected}
//                     totalSupply={totalSupply?.toNumber()}
//                   />
//                 </>
//               ) : (
//                 <>
//                   <Heading align="center" size="lg" m="16px" pt="8px">
//                     MINT Halalanft NFTs Now!
//                   </Heading>
//                   <Test
//                     chainId={connectData?.chain.id}
//                     provider={provider}
//                     signer={signer}
//                   />
//                 </>
//               )
//             ) : (
//               <></>
//             )}
//           </Stack>
//         </Stack>
//       </Box>
//     </>
//   )
// }

// const walletIcons = (walletName) =>
//   walletName === 'MetaMask' ? 'mm.png' : '/cbw.png'
