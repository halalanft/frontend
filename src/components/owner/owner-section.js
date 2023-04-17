// import {
//   Box,
//   Button,
//   FormControl,
//   FormErrorMessage,
//   FormLabel,
//   HStack,
//   Input,
//   Stack,
//   Text,
//   useNumberInput,
//   VStack,
// } from '@chakra-ui/react'
// import { BigNumber } from 'ethers'
// import { getAddress } from 'ethers/lib/utils.js'
// import { Field, Form, Formik } from 'formik'
// import { useEffect, useState } from 'react'
// import {
//   useContractRead,
//   useContractWrite,
//   usePrepareContractWrite,
//   useSigner,
// } from 'wagmi'
// import ContractAddress from '@/contracts/address.json'
// import HalalanftABI from '@/contracts/Halalanft.json'

// export default function Owner({ ...props }) {
//   const { data: signerData } = useSigner()

//   const { data: mintingEnabled, isLoading: isLoadingMintingEnabled } =
//     useContractRead({
//       address: ContractAddress.Halalanft,
//       abi: HalalanftABI.abi,
//       functionName: 'mintingEnabled',
//     })

//   const { config: configEnableMinting } = usePrepareContractWrite({
//     address: ContractAddress.Halalanft,
//     abi: HalalanftABI.abi,
//     functionName: 'enableMinting',
//     enabled: props.isOwner,
//     onError(error) {
//       console.log('Error Enable Minting', error)
//     },
//   })

//   const { write: writeEnableMinting } = useContractWrite(configEnableMinting)

//   const { config: configDisableMinting } = usePrepareContractWrite({
//     address: ContractAddress.Halalanft,
//     abi: HalalanftABI.abi,
//     functionName: 'disableMinting',
//     enabled: props.isOwner,
//     onError(error) {
//       console.log('Error Disable Minting', error)
//     },
//   })

//   const { write: writeDisableMinting } = useContractWrite(configDisableMinting)

//   const { data: autoDistribute, isLoading: isLoadingAutoDistribute } =
//     useContractRead({
//       address: ContractAddress.Halalanft,
//       abi: HalalanftABI.abi,
//       functionName: 'autoDistribute',
//     })

//   const [isAutoDistribute, updateAutoDistribute] = useState(false)

//   const { config: configAutoDistribute } = usePrepareContractWrite({
//     address: ContractAddress.Halalanft,
//     abi: HalalanftABI.abi,
//     functionName: 'setAutoDistribute',
//     args: [isAutoDistribute],
//     enabled: props.isOwner,
//     onError(error) {
//       console.log('Error AutoDistribute', error)
//     },
//   })

//   const { write: writeAutoDistribute } = useContractWrite(configAutoDistribute)

//   const [teamWalletW2Addr, setTeamWalletW2] = useState('')

//   const { data: teamWalletW2, isloading: isLoadingTeamWalletW2 } =
//     useContractRead({
//       address: ContractAddress.Halalanft,
//       abi: HalalanftABI.abi,
//       functionName: 'teamWalletW2',
//       enabled: props.isOwner,
//       onSuccess(data) {
//         setTeamWalletW2(data)
//       },
//     })

//   const { config: configTeamWalletW2 } = usePrepareContractWrite({
//     address: ContractAddress.Halalanft,
//     abi: HalalanftABI.abi,
//     functionName: 'setTeamWalletW2',
//     args: [teamWalletW2Addr],
//     enabled: props.isOwner && Boolean(teamWalletW2Addr),
//     onError(error) {
//       console.log('Error TeamWalletW2', error)
//     },
//   })

//   const {
//     data: dataTeamWalletW2,
//     error: errorTeamWalletW2,
//     isError: isTeamWalletW2Error,
//     write: writeTeamWalletW2,
//   } = useContractWrite({ ...configTeamWalletW2, signerOrProvider: signerData })

//   const [teamWalletW3Addr, setTeamWalletW3] = useState('')

//   const {
//     data: teamWalletW3,
//     isLoading: isLoadingTeamWalletW3,
//     isSuccess: isSuccessTeamWalletW3,
//   } = useContractRead({
//     address: ContractAddress.Halalanft,
//     abi: HalalanftABI.abi,
//     functionName: 'teamWalletW3',
//     enabled: props.isOwner,
//     onSuccess(data) {
//       setTeamWalletW3(data)
//     },
//     onError(error) {
//       console.log('Error TeamWalletW3', error)
//     },
//   })

//   const { config: configTeamWalletW3 } = usePrepareContractWrite({
//     address: ContractAddress.Halalnft,
//     abi: HalalanftABI.abi,
//     functionName: 'setTeamWalletW3',
//     args: [teamWalletW3Addr],
//     enabled: Boolean(teamWalletW3Addr),
//     onError(error) {
//       console.log('Error Minting Halalanft', error)
//     },
//   })

//   const {
//     data: dataTeamWalletW3,
//     error: errorTeamWalletW3,
//     isError: isTeamWalletW3Error,
//     write: writeTeamWalletW3,
//   } = useContractWrite(configTeamWalletW3)

//   const { getInputProps: getCostHalalanftInputProps } = useNumberInput({
//     step: 1,
//     defaultValue: 1,
//   })
//   const [costHalalanft, setCostHalalanft] = useState(BigNumber.from('0'))
//   const inputCostHalalanft = getCostHalalanftInputProps()
//   const debounceCostHalalanft = useDebounce(costHalalanft, 500)
//   const { data: dataCostHalalanft, isLoading: isLoadingCostHalalanft } =
//     useContractRead({
//       address: ContractAddress.Halalanft,
//       abi: HalalanftABI.abi,
//       functionName: 'cost',
//       enabled: props.isOwner,
//     })

//   const { config: configCost } = usePrepareContractWrite({
//     address: ContractAddress.Halalanft,
//     abi: HalalanftABI.abi,
//     functionName: 'setCost',
//     args: [parseInt(debounceCostHalalanft)],
//     enabled: props.isOwner,
//     onError(error) {
//       console.log('Error Cost', error)
//     },
//   })

//   const { write: writeCost } = useContractWrite(configCost)

//   const [baseURI, setBaseURI] = useState('')
//   const { config: configBaseURI } = usePrepareContractWrite({
//     address: ContractAddress.Halalanft,
//     abi: HalalanftABI.abi,
//     functionName: 'setBaseURI',
//     args: [baseURI],
//     enabled: props.isOwner && Boolean(baseURI),
//     onError(error) {
//       console.log('Error BaseURI', error)
//     },
//   })

//   const { write: writeBaseURI } = useContractWrite(configBaseURI)

//   const [tokenId, setTokenId] = useState('')
//   const debounceTokenId = useDebounce(tokenId, 500)
//   const { data: dataTokenURI, refetch: refetchTokenURI } = useContractRead({
//     address: ContractAddress.Halalanft,
//     abi: HalalanftABI.abi,
//     functionName: 'tokenURI',
//     args: [parseInt(debounceTokenId)],
//     enabled: props.isOwner && Boolean(debounceTokenId),
//     onError(error) {
//       console.log('Error TokenURI', error)
//     },
//   })

//   const [uriExtention, setURIExtention] = useState('')

//   const { config: configURIExtention } = usePrepareContractWrite({
//     address: ContractAddress.Halalanft,
//     abi: HalalanftABI.abi,
//     functionName: 'setURIExtention',
//     enabled: Boolean(uriExtention),
//     args: [uriExtention],
//     onError(error) {
//       console.log('Error UriExtention', error)
//     },
//   })

//   const {
//     data: dataURIExtention,
//     error: errorURIExtention,
//     isError: isURIExtentionError,
//     write: writeURIExtention,
//   } = useContractWrite(configURIExtention)

//   const [ownerMintAddressTo, setOwnerMintAddressTo] = useState('')
//   const [ownerMintQuantity, setOwnerMintQuantity] = useState('')
//   const debounceOwnerMintQuantity = useDebounce(ownerMintQuantity, 500)

//   const { config: configOwnerMint } = usePrepareContractWrite({
//     address: ContractAddress.Halalanft,
//     abi: HalalanftABI.abi,
//     functionName: 'ownerMint',
//     args: [ownerMintAddressTo, parseInt(debounceOwnerMintQuantity)],
//     enabled: props.isOwner && Boolean(debounceOwnerMintQuantity),
//     onError(error) {
//       console.log('Error Owner Mint', error)
//     },
//   })

//   const {
//     data: dataOwnerMint,
//     error: errorOwnerMint,
//     isError: isOwnerMintError,
//     write: writeOwnerMint,
//   } = useContractWrite(configOwnerMint)

//   const {
//     config: configWithdraw,
//     error: prepareWithdrawError,
//     isError: isPrepareWithdrawError,
//   } = usePrepareContractWrite({
//     address: ContractAddress.Halalanft,
//     abi: HalalanftABI.abi,
//     functionName: 'withdraw',
//     enabled: props.isOwner,
//     args: [],
//     onError(error) {
//       console.log('Error Withdraw', error)
//     },
//   })

//   const { write: writeWithdraw } = useContractWrite(configWithdraw)

//   const { config: configDistribute } = usePrepareContractWrite({
//     address: ContractAddress.Halalanft,
//     abi: HalalanftABI.abi,
//     functionName: 'distribute',
//     enabled: props.isOwner,
//     args: [],
//     onError(error) {
//       console.log('Error Distribute', error)
//     },
//   })

//   const {
//     data: dataDistribute,
//     error: errorDistribute,
//     isError: isDistributeError,
//     write: writeDistribute,
//   } = useContractWrite(configDistribute)

//   const { config: configWithdrawToken } = usePrepareContractWrite({
//     address: ContractAddress.Halalanft,
//     abi: HalalanftABI.abi,
//     functionName: 'withdrawToken',
//     args: [getAddress(ContractAddress.USDC)],
//     enabled: props.isOwner,
//     onError(error) {
//       console.log('Error Withdraw Token', error)
//     },
//   })

//   const { write: writeWithdrawToken } = useContractWrite(configWithdrawToken)

//   return (
//     <Stack direction="row">
//       <Box p="32px">
//         <Box
//           color="blackAlpha.700"
//           align="left"
//           display="flex"
//           flexWrap="wrap"
//           flexDirection="column"
//           fontWeight="semibold"
//           letterSpacing="wide"
//           fontSize="lg"
//           textTransform="uppercase"
//           pb="5px"
//         >
//           <Text>current supply: {props.totalSupply} / 10,000</Text>
//           <Text>
//             minting enabled:{' '}
//             {isLoadingMintingEnabled
//               ? 'checking...'
//               : mintingEnabled?.toString()}
//           </Text>
//           <Box display="flex" flexWrap="wrap" flexDirection="row">
//             <Button
//               m="16px"
//               colorScheme="teal"
//               disabled={!writeEnableMinting}
//               onClick={() => {
//                 writeEnableMinting?.()
//               }}
//               w="fit-content"
//             >
//               {'Enable Minting'}
//             </Button>
//             <Button
//               m="16px"
//               colorScheme="teal"
//               disabled={!writeDisableMinting}
//               onClick={() => {
//                 writeDisableMinting?.()
//               }}
//               w="fit-content"
//             >
//               {'Disable Minting'}
//             </Button>
//           </Box>

//           <Text>
//             auto distribute state:{' '}
//             {isLoadingAutoDistribute
//               ? 'checking...'
//               : autoDistribute?.toString()}
//           </Text>

//           <Button
//             m="16px"
//             variant="outline"
//             outlineColor="#FFCC15"
//             // key={connector.id}
//             disabled={!writeAutoDistribute}
//             onClick={() => {
//               updateAutoDistribute(!autoDistribute)
//               writeAutoDistribute?.()
//             }}
//             w="fit-content"
//           >
//             {'Change Autodistribute'}
//           </Button>

//           <Box display="flex" flexWrap="wrap" flexDirection="row" p="6px">
//             <Formik
//               initialValues={{ newTokenId: '' }}
//               onSubmit={async (values, { setSubmitting }) => {
//                 setTokenId(values.newTokenId)
//                 await refetchTokenURI()
//                 setSubmitting(false)
//               }}
//             >
//               <Form>
//                 <VStack>
//                   <Field name="newTokenId">
//                     {({ field, form }) => (
//                       <FormControl>
//                         <FormLabel>TokenID</FormLabel>
//                         <HStack maxW="150px">
//                           <Input
//                             textAlign="center"
//                             outlineColor="#FFCC15"
//                             type="text"
//                             placeholder="newTokenId"
//                             onChange={(val) =>
//                               form.setFieldValue(field.name, val)
//                             }
//                             {...field}
//                           />
//                         </HStack>
//                       </FormControl>
//                     )}
//                   </Field>

//                   <Button mt={4} colorScheme="teal" type="submit">
//                     Get TokenURI
//                   </Button>
//                 </VStack>
//               </Form>
//             </Formik>
//           </Box>

//           <Text>the token URI: {dataTokenURI?.toString()}</Text>

//           <Box display="flex" flexWrap="wrap" flexDirection="row" p="6px">
//             <Formik
//               initialValues={{ newBaseURI: '' }}
//               onSubmit={(values, { setSubmitting }) => {
//                 setBaseURI(values.newBaseURI)
//                 writeBaseURI?.()
//                 setSubmitting(false)
//               }}
//             >
//               <Form>
//                 <Field name="newBaseURI" onChange={Formik.onChange}>
//                   {({ field, form }) => (
//                     <FormControl>
//                       <FormLabel>New BaseURI</FormLabel>
//                       <Input
//                         textAlign="center"
//                         outlineColor="#FFCC15"
//                         type="text"
//                         placeholder="new baseURI"
//                         {...field}
//                       />
//                       <FormErrorMessage>{form.errors.address}</FormErrorMessage>
//                     </FormControl>
//                   )}
//                 </Field>

//                 <Button
//                   mt={4}
//                   // disabled={!writeBaseURI}
//                   colorScheme="teal"
//                   type="submit"
//                 >
//                   Set BaseURI
//                 </Button>
//               </Form>
//             </Formik>
//           </Box>

//           <Text>
//             team wallet w2:{' '}
//             {isLoadingTeamWalletW2 ? 'checking...' : teamWalletW2}
//           </Text>

//           <Text>
//             team wallet w3:{' '}
//             {isLoadingTeamWalletW3 ? 'checking...' : teamWalletW3}
//           </Text>

//           <Button
//             m="16px"
//             colorScheme="cyan"
//             // key={connector.id}
//             disabled={!writeWithdraw}
//             onClick={() => {
//               writeWithdraw?.()
//             }}
//             w="fit-content"
//           >
//             {'Withdraw'}
//           </Button>

//           <Text>
//             NFT cost:{' '}
//             {isLoadingCostHalalanft
//               ? 'checking...'
//               : 'USDC ' + dataCostHalalanft}
//           </Text>
//           <Box display="flex" flexWrap="wrap" flexDirection="row" p="6px">
//             <Formik
//               initialValues={{ costHalalanft: 0 }}
//               onSubmit={(values) => {
//                 console.log(values.cost)
//                 setCostHalalanft(inputCostHalalanft)
//                 writeCost?.()
//               }}
//             >
//               {() => (
//                 <Form>
//                   <VStack>
//                     <Field
//                       as="input"
//                       type="number"
//                       name="costHalalanft"
//                       onChange={Formik.onChange}
//                     >
//                       {() => (
//                         <FormControl>
//                           <FormLabel>New Cost</FormLabel>
//                           <HStack maxW="150px">
//                             <Input
//                               textAlign="right"
//                               type="number"
//                               placeholder="new price"
//                               {...inputCostHalalanft}
//                             />
//                           </HStack>
//                         </FormControl>
//                       )}
//                     </Field>

//                     <Button
//                       mt={4}
//                       disabled={!writeCost}
//                       colorScheme="teal"
//                       type="submit"
//                     >
//                       Update Cost
//                     </Button>
//                   </VStack>
//                 </Form>
//               )}
//             </Formik>
//           </Box>

//           <Button
//             m="16px"
//             variant="outline"
//             outlineColor="#FFCC15"
//             // key={connector.id}
//             disabled={!writeWithdrawToken}
//             onClick={() => {
//               writeWithdrawToken?.()
//             }}
//             w="fit-content"
//           >
//             {'Withdraw Token'}
//           </Button>

//           <Box display="flex" flexWrap="wrap" flexDirection="row" p="6px">
//             <Formik
//               initialValues={{ address: '', quantity: 0 }}
//               onSubmit={(values, { setSubmitting }) => {
//                 setOwnerMintAddressTo(values.address)
//                 setOwnerMintQuantity(values.quantity)
//                 writeOwnerMint?.()
//                 setSubmitting(false)
//               }}
//             >
//               <Form>
//                 <Field name="address" onChange={Formik.onChange}>
//                   {({ field, form }) => (
//                     <FormControl>
//                       <FormLabel> Address </FormLabel>
//                       <Input {...field} placeholder="address to" />
//                       <FormErrorMessage>{form.errors.address}</FormErrorMessage>
//                     </FormControl>
//                   )}
//                 </Field>
//                 <Field name="quantity" onChange={Formik.onChange}>
//                   {({ field, form }) => (
//                     <FormControl>
//                       <FormLabel> Amount </FormLabel>
//                       <Input {...field} placeholder="token amount" />
//                       <FormErrorMessage>
//                         {form.errors.quantity}
//                       </FormErrorMessage>
//                     </FormControl>
//                   )}
//                 </Field>
//                 <Button mt={4} colorScheme="teal" type="submit">
//                   Owner Mint
//                 </Button>
//               </Form>
//             </Formik>
//           </Box>
//         </Box>
//       </Box>
//     </Stack>
//   )
// }

// const walletIcons = (walletName) =>
//   walletName === 'MetaMask' ? 'mm.png' : '/cbw.png'

// function useDebounce(value, delay) {
//   const [debouncedValue, setDebouncedValue] = useState(value)

//   useEffect(() => {
//     const timer = setTimeout(() => setDebouncedValue(value), delay || 500)

//     return () => {
//       clearTimeout(timer)
//     }
//   }, [value, delay])

//   return debouncedValue
// }
