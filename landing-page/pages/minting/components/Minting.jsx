import { useState, useEffect } from "react";
import { Box, Button, FormControl, FormLabel, HStack, Input, Menu, MenuButton, MenuItem, MenuList, Stack, Text, useNumberInput, VStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faTwitter, faMedium } from "@fortawesome/free-brands-svg-icons";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useContractEvent, useContractRead, useContractWrite, useNetwork, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { useIsMounted } from "../hooks/useIsMounted";
import { BigNumber } from "ethers";
import { getAddress } from "ethers/lib/utils.js";
import { Field, Form, Formik } from "formik";
import contractAddress from "../../../contracts/address.json";
import erc20ABI from "../../../contracts/erc20ABI.json";
import halalanftABI from "../../../contracts/Halalanft.json";

export default function Minting() {
	const mounted = useIsMounted;

	const nftPrice = 1000000000;
	const { address: accAddress, connector, isConnected } = useAccount();
	// const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
	// 	step: 1,
	// 	defaultValue: 1,
	// 	max: 10,
	// });
	const { chain: networkChain } = useNetwork();

	// const inc = getIncrementButtonProps();
	// const dec = getDecrementButtonProps();
	// const input = getInputProps();

	const { data: mintingEnabled } = useContractRead({
		address: contractAddress.Halalanft,
		abi: halalanftABI.abi,
		enabled: !!isConnected,
		functionName: "mintingEnabled",
	});

	const { data: balanceOfUSDC } = useContractRead({
		address: "contractAddress.USDC",
		abi: erc20ABI,
		// functionName: balanceOfUSDC,
		enabled: !!isConnected,
		args: [accAddress],
		onError(error) {
			console.log("Error Balance USD", error);
		},
	});

	const { data: balanceOf } = useContractRead({
		address: contractAddress.Halalanft,
		abi: halalanftABI.abi,
		// functionName: balanceOf,
		enabled: !!isConnected,
		args: [accAddress],
		onError(error) {
			console.log("Error Balance Halalanft", error);
		},
	});

	const {
		config: configUSDC,
		error: prepareUSDCError,
		isError: isPrepareUSDCError,
	} = usePrepareContractWrite({
		address: contractAddress.USDC,
		abi: erc20ABI,
		functionName: "approve",
		// args: [getAddress(contractAddress.Halalanft), BigNumber.from(nftPrice)],
		enabled: !!isConnected,
		onError(error) {
			console.log("Error Prepare USDC", error);
		},
	});

	const { data: dataUSDC, error: errorUSDC, isError: isUSDCError, write: writeUSDC } = useContractWrite(configUSDC);

	const { isLoading: isLoadingTransactionUSDC, isSuccessTransactionUSDC } = useWaitForTransaction({
		hash: dataUSDC?.hash,
	});

	const [approval, setApproval] = useState("");

	useEffect(() => {
		if (window) {
			setApproval(sessionStorage.getItem(accAddress));
		}
	}, []);

	const event = useContractEvent({
		address: contractAddress.USDC,
		abi: erc20ABI,
		eventName: "Approval",
		listener: (owner, spender, value) => {
			setApproval(value);
			if (window) {
				window.sessionStorage.setItem(owner, value);
			}
		},
	});

	const [mintAmount, setMintAmount] = useState("");
	const debouncedMintAmount = useDebounce(mintAmount, 500);

	const {
		config: configHalalanft,
		error: prepareHalalanftError,
		isError: isPrepareHalalanftError,
	} = usePrepareContractWrite({
		address: contractAddress.Halalanft,
		functionName: "mint",
		abi: halalanftABI.abi,
		args: [parseInt(debouncedMintAmount)],
		enabled: mintingEnabled && Boolean(debouncedMintAmount),
		onError(error) {
			console.log("Error Minting Halalanft", error);
		},
	});
	const { data: dataHalalanft, error: errorHalalanft, isError: isHalalanftError, write: writeHalalanft } = useContractWrite(configHalalanft);
	const { isLoading: isLoadingTransactionHalalanft, isSuccessTransactionHalalanft } = useWaitForTransaction({
		hash: dataHalalanft?.hash,
	});
	return (
		<>
			<div className="px-8">
				<div className="flex justify-center my-6">
					<h1 className="font-impact text-[3rem] text-[#171717] opacity-[0.68]">Mint</h1>
				</div>

				<div className="h-[560px] bg-white rounded-lg shadow-lg mx-auto ">
					<section className="flex justify-between">
						<div className="py-8 px-14 flex justify-items-center  space-x-4">
							<div className="shrink-0">
								<div className="bg-[#374C8C] w-10 h-10 rounded-md shadow-lg inline-flex items-center justify-center p-2">
									<p className="self-center items-center text-white">1</p>
								</div>
							</div>
							<div>
								<h1 className="text-xl font-semibold text-[#171717] opacity-[0.68]">CONNECT</h1>
								<p className="text-slate-500">wallet and check network</p>
							</div>
						</div>
						<div className="py-8 px-14 flex justify-items-center space-x-4">
							<div className="shrink-0">
								<div className="bg-[#374C8C] w-10 h-10 rounded-md shadow-lg inline-flex items-center justify-center p-2">
									<p className="self-center items-center text-white ">2</p>
								</div>
							</div>
							<div>
								<h1 className="text-xl font-semibold text-[#171717] opacity-[0.68] ">CHECKOUT</h1>
								<p className="text-slate-500">quantity and mint</p>
							</div>
						</div>
						<div className="py-8 px-14 flex justify-items-center space-x-4">
							<div className="shrink-0">
								<div className="bg-[#374C8C] w-10 h-10 rounded-md shadow-lg inline-flex items-center justify-center p-2">
									<p className="self-center items-center text-white ">3</p>
								</div>
							</div>
							<div>
								<h1 className="text-xl font-semibold text-[#171717] opacity-[0.68] ">REVIEW</h1>
								<p className="text-slate-500">reciept</p>
							</div>
						</div>
					</section>
					<div className="h-[2px] bg-[#171717] opacity-30"></div>
					<section id="connect" className="py-10">
						<div className="text-center">
							<h3 className="text-[#FAD02C] text-xl">HALALANFT MINTING</h3>
							<h1 className="font-bold text-[2.5rem] text-[#171717] opacity-[0.68]">Are you ready?</h1>
							<p className="w-3/4 px-32 mx-auto py-6  text-[#171717] opacity-[0.68]">Connect your MetaMask wallet and add the Optimism Network to start.</p>
							<div className="flex justify-center mb-4">
								<ConnectButton />
							</div>
							{/* Test */}
							<>
								<Stack direction="row">
									<Box align="center">
										{mounted && networkChain.id != connector.chains[0].id ? (
											<Menu>
												<MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
													Wrong Network!
												</MenuButton>
												<MenuList>
													<MenuItem onClick={() => connector.connect({ chainId: connector.chains[0].id })}>{connector.chains[0].name}</MenuItem>
												</MenuList>
											</Menu>
										) : (
											<>
												<Box color="blackAlpha.700" fontWeight="semibold" letterSpacing="wide" fontSize="2xl" textTransform="uppercase">
													Phase 1
												</Box>
												<Box>
													{!isSuccessTransactionUSDC & (balanceOf < 1) ? (
														<Box color="blackAlpha.700" align="center" flexDirection="column" fontWeight="semibold" letterSpacing="wide" fontSize="lg" textTransform="uppercase" pb="5px">
															<Text>You need to approve USDC token first.</Text>

															<Button
																my="16px"
																variant="outline"
																outlineColor="#FFCC15"
																key={connector.id}
																disabled={!connector.ready}
																onClick={() => {
																	const result = writeUSDC?.();
																	setApproval(nftPrice);
																}}
																w="fit-content"
															>
																{isLoadingTransactionUSDC ? "Waiting for Approval" : "Approve USDC"}
															</Button>
														</Box>
													) : (
														<Formik
															initialValues={{ mintingNumber: 0 }}
															onSubmit={(values, { setSubmitting }) => {
																setMintAmount(Input.value);
																writePC?.();
																setSubmitting(false);
															}}
														>
															{() => (
																<Form>
																	<VStack>
																		<Field as="input" type="number" name="mintingNumber" onChange={Formik.onChange}>
																			{() => (
																				<FormControl>
																					<FormLabel>Select Amount</FormLabel>
																					<HStack maxW="150px">
																						<Button>-</Button>
																						<Input textAlign="right" type="number" placeholder="put amount to mint" />
																						<Button>+</Button>
																					</HStack>
																				</FormControl>
																			)}
																		</Field>

																		<Button mt={4} disabled={!mintingEnabled} colorScheme="teal" type="submit">
																			{mintingEnabled ? "Mint" : "Minting Disabled"}
																		</Button>
																	</VStack>
																</Form>
															)}
														</Formik>
													)}
												</Box>
											</>
										)}
										{isConnected ? (
											<Box align="center" mt="2px">
												<Text>{"You own: " + balanceOf?.toString()}</Text>
												<Text>{"Your USDC: " + balanceOfUSDC?.toString().substring(0, balanceOfUSDC.toString().length - 6)}</Text>
											</Box>
										) : (
											<></>
										)}
									</Box>
								</Stack>
							</>
							{/* akhir */}
							<p className="w-3/4 px-32 mx-auto py-6 leading-loose text-[#171717] opacity-[0.68]">
								You will need to have Ether on the Optimism network to mint the NFT. Please go to the official Optimism GatewayorHop exchange to move some Ether to the Optimism network before you begin.
							</p>
						</div>
					</section>
				</div>
			</div>
			<section id="footer" className="py-14">
				<div className="justify-center flex md:flex-row flex-col gap-5 text-center ">
					<a className="self-center" href="https://discord.com/invite/be5fnEqrZQ">
						<button className=" max-sm:w-40 px-4 py-2 gap-2 bg-[#374C8C] hover:bg-[#283765] text-white rounded-md flex items-center justify-center self-center mb-4">
							<FontAwesomeIcon icon={faDiscord} className="w-8" />
							<strong>DISCORD</strong>
						</button>
					</a>

					<a className="self-center" href="https://twitter.com/halalanft">
						<button className="max-sm:w-40 px-4 py-2 gap-2 bg-[#374C8C] hover:bg-[#283765] text-white rounded-md flex items-center justify-center self-center mb-4">
							<FontAwesomeIcon icon={faTwitter} className="w-[1.6rem]" />
							<strong>TWITTER</strong>
						</button>
					</a>
					<a className="self-center" href="#">
						<button className="max-sm:w-40 px-4 py-2 gap-2 bg-[#374C8C] hover:bg-[#283765] text-white rounded-md flex items-center justify-center self-center mb-4">
							<FontAwesomeIcon icon={faMedium} className="w-8" />
							<strong>MEDIUM</strong>
						</button>
					</a>
				</div>
				<div className="text-center pt-6">
					<p className="font-semibold text-[#171717] opacity-[0.68]">Copyright © 2022 - All right reserved</p>
				</div>
			</section>
		</>
	);
}

function useDebounce(value, delay) {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

		return () => {
			clearTimeout(timer);
		};
	}, [value, delay]);

	return debouncedValue;
}
