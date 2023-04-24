import { CheckIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Hide,
  Link,
  Show,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Text,
} from '@chakra-ui/react'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import {
  useAccount,
  useContractEvent,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { ErrorPopup } from '~/components/modal'
import HalalanftABI from '~/contracts/Halalanft.json'
import ERC20ABI from '~/contracts/erc20ABI.json'
import { useIsMounted } from '~/hooks/useIsMounted'
import { Halalanft, USDC } from '~/utils/contract-address'
import { useDebounce } from '~/utils/debounce'

export default function PurchaseSection() {
  const [isErrorOpened, setIsErrorOpened] = useState(true)
  const [sliderValue, setSliderValue] = useState(0)
  const [sliderFinalValue, setSliderFinalValue] = useState(0)
  const [checkedItems, setCheckedItems] = useState(false)
  const isMounted = useIsMounted()
  const { address, isConnected } = useAccount()

  const { data: currentPrice } = useContractRead({
    address: Halalanft,
    abi: HalalanftABI.abi,
    enabled: !!isConnected,
    watch: true,
    functionName: 'getCurrentPrice',
  })

  const [itemPrice, setItemPrice] = useState(0)
  useEffect(() => {
    const getItemPrice = async () => {
      const pc = await currentPrice
      isConnected && pc && setItemPrice(Number(currentPrice))
    }
    getItemPrice()
  }, [isConnected, currentPrice])

  const { data: publicMinting } = useContractRead({
    address: Halalanft,
    abi: HalalanftABI.abi,
    enabled: !!isConnected,
    functionName: 'publicMintingEnabled',
    watch: true,
  })
  const debouncedMinting = useDebounce(publicMinting, 500)

  const { data: presaleAmount } = useContractRead({
    address: Halalanft,
    abi: HalalanftABI.abi,
    enabled: !!isConnected,
    functionName: 'getAux',
    args: [address],
    watch: true,
  })
  const debouncedPresaleAmount = useDebounce(presaleAmount?.toNumber(), 500)

  const [approved, setApproved] = useState(false)

  useContractEvent({
    address: USDC,
    abi: ERC20ABI,
    enabled: !!isConnected,
    eventName: 'Approval',
    watch: true,
    listener: (owner, spender, value) => {
      parseInt(value) >= parseInt(itemPrice)
        ? setApproved(true)
        : setApproved(false)
    },
  })

  const { data: usdcAllowance, refetch: refetchUsdcAllowance } =
    useContractRead({
      address: USDC,
      abi: ERC20ABI,
      enabled: !!isConnected,
      functionName: 'allowance',
      args: [address, Halalanft],
      onError(error) {
        setIsErrorOpened(true)
      },
      onSuccess(data) {
        parseInt(data) >= parseInt(itemPrice)
          ? setApproved(true)
          : setApproved(false)
      },
      onSettled(data, error) {
        parseInt(data) >= parseInt(itemPrice)
          ? setApproved(true)
          : setApproved(false)
      },
    })
  const debouncedAllowance = useDebounce(usdcAllowance, 500)

  return (
    <Box
      bg="white"
      borderRadius="md"
      shadow="xl"
      py={8}
      borderTopRadius={{ md: '3xl' }}
    >
      <Flex
        direction={{ base: 'column', md: 'column' }}
        justify="center"
        gap={{ base: '0', md: '8', lg: '16' }}
        px={{ base: '0', md: '8', lg: '16' }}
      >
        <Box flex="1">
          {debouncedPresaleAmount > 0 ? (
            <PresaleHeader
              isConnected
              isChecked={Boolean(checkedItems)}
              presaleAmount={debouncedPresaleAmount}
              setSliderValue={setSliderValue}
              setSliderFinalValue={setSliderFinalValue}
            />
          ) : (
            <PublicHeader
              isConnected
              debouncedMinting={debouncedMinting}
              isChecked={Boolean(checkedItems)}
              sliderValue={sliderValue}
              setSliderValue={setSliderValue}
              setSliderFinalValue={setSliderFinalValue}
            />
          )}
          {/* Description */}
          <Box display="grid" gap={3}>
            <Divider />
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              gap={4}
            >
              <Text>Cost per NFT (USDC)</Text>
              <Flex align="center" gap={8}>
                <Text>:</Text>
                <Text>{itemPrice}</Text>
              </Flex>
            </Box>
            <Divider />
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              gap={4}
            >
              <Text>Total Price </Text>
              <Flex align="center" gap={8}>
                <Text>:</Text>
                <Text>{sliderValue * itemPrice}</Text>
              </Flex>
            </Box>
            <Flex align="center" gap={8} my={4}>
              <Checkbox
                colorScheme="facebook"
                onChange={(e) => setCheckedItems(e.target.checked)}
              >
                <Link href="https://halalanft-ecosystem.gitbook.io/halalanft-whitepaper-bahasa/">
                  Agree to terms and conditions.
                </Link>
              </Checkbox>
            </Flex>
            <Flex align="center" direction={{ base: 'column' }}>
              {!approved || debouncedAllowance < 0 ? (
                <ApproveButton
                  isConnected={isConnected}
                  value={itemPrice}
                  isChecked={Boolean(checkedItems)}
                  isOpen={isErrorOpened}
                  onErrorOpen={setIsErrorOpened}
                  onErrorClose={() => setIsErrorOpened(false)}
                  refetchUsdcAllowance={refetchUsdcAllowance}
                />
              ) : debouncedPresaleAmount > 0 ? (
                <PresaleButton
                  finalAmount={sliderFinalValue}
                  ether={ethers.utils.parseEther(
                    (sliderFinalValue * itemPrice).toString()
                  )}
                  isConnected
                  isChecked={Boolean(checkedItems)}
                  isMounted={isMounted}
                />
              ) : (
                <PublicMintButton
                  isConnected
                  debouncedMinting={debouncedMinting}
                  isChecked={Boolean(checkedItems)}
                  finalAmount={sliderFinalValue}
                  ether={ethers.utils.parseEther(
                    (sliderFinalValue * itemPrice).toString()
                  )}
                  isMounted={isMounted}
                />
              )}
              {checkedItems ? null : (
                <Box>
                  <Text color="red">
                    Please agree to the terms and conditions by checking the
                    box.
                  </Text>
                </Box>
              )}
              {/* Benefit */}
              <Box
                borderRadius="md"
                p={{ md: '6' }}
                bgColor={{ md: '#FAD02C' }}
                display="grid"
                justifyContent="center"
                gap={4}
                my={{ base: '4', md: '0' }}
              >
                <Box display="flex" alignItems="center" gap={4}>
                  <CheckIcon />
                  <Text>3,000 Halalanft</Text>
                </Box>
                <Box display="flex" alignItems="center" gap={4}>
                  <CheckIcon />
                  <Text>Specialized content in Discord server</Text>
                </Box>
                <Box display="flex" alignItems="center" gap={4}>
                  <CheckIcon />
                  <Text>Access to future airdrops</Text>
                </Box>
              </Box>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}

const PresaleButton = ({ isMounted, isChecked, isConnected, finalAmount }) => {
  const { address } = useAccount()

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: Halalanft,
    abi: HalalanftABI.abi,
    functionName: 'presale',
    enabled: isMounted && !!isConnected && isChecked && finalAmount > 0,
    args: [finalAmount],
  })
  const {
    data: writeData,
    error: writeError,
    isError: isWriteError,
    isLoading: isWriteLoading,
    write: mintNFT,
  } = useContractWrite(config)
  const { error, isLoading, isError } = useWaitForTransaction({
    hash: writeData?.hash,
  })
  return (
    <>
      <Hide above="sm">
        <Box my={4}>
          <Button
            bg="#374C8C"
            textColor="white"
            w="100%"
            px={4}
            py={2}
            borderRadius="lg"
            my={4}
            isDisabled={!(isChecked && isConnected)}
            onClick={async () => mintNFT()}
            _hover={{
              background: 'white',
              color: 'teal.500',
              textColor: 'teal.500',
              border: '1px',
              borderColor: '#374C8C',
            }}
          >
            Presale
          </Button>
        </Box>
      </Hide>

      <Show above="sm">
        <Box my={8} display="flex" justifyContent="center" gap={6}>
          <Button
            bg="#374C8C"
            textColor="white"
            w="full"
            px={4}
            py={2}
            isDisabled={!(isChecked && isConnected)}
            onClick={async () => mintNFT()}
            borderRadius="lg"
            _hover={{
              background: 'white',
              color: '#FAD02C',
              border: '1px',
              borderColor: '#374C8C',
            }}
          >
            Presale
          </Button>
        </Box>
      </Show>
    </>
  )
}

const PresaleHeader = ({
  sliderValue,
  presaleAmount,
  setSliderValue,
  setSliderFinalValue,
}) => {
  return (
    <>
      <Box>
        {/* Title */}
        <Text textColor="#FAD02C" align="center" mb={4} fontSize="xl">
          SELECT QUANTITY
        </Text>
        {/* Amount */}
        <Text
          textColor="#292929"
          fontWeight="bold"
          fontSize="3xl"
          align="center"
        >
          Your Presale Amount
        </Text>
        <Text
          my={2}
          textColor="#292929"
          fontWeight="bold"
          fontSize="6xl"
          align="center"
        >
          {presaleAmount}
        </Text>
      </Box>
      {/* Slider */}
      <Flex direction={{ base: 'column', md: 'column' }} align="center" gap={6}>
        <Slider
          flex={{ md: 'auto', lg: '1' }}
          aria-label="slider-purchase"
          defaultValue={0}
          step={1}
          min={0}
          max={presaleAmount}
          onChange={(value) => {
            setSliderValue(value)
          }}
          onChangeEnd={(value) => {
            setSliderFinalValue(value)
          }}
        >
          {[...Array(presaleAmount)].map((x, i) => (
            <SliderMark
              key={i + 1}
              value={i + 1}
              mt="1"
              ml="-2.5"
              fontSize="sm"
            >
              {i + 1}
            </SliderMark>
          ))}

          <SliderTrack bg="white" borderWidth={1} borderColor="#374C8C">
            <SliderFilledTrack bg="#374C8C" />
          </SliderTrack>
          <SliderThumb boxSize={4} bg="#374C8C" />
        </Slider>
        <Text color="#292929" my={4}>
          Quantity [max : {presaleAmount} per transaction]
        </Text>
      </Flex>
    </>
  )
}

const PublicMintButton = ({
  isChecked,
  debouncedMinting,
  isConnected,
  sliderValue,
  finalAmount,
  isMounted,
  ether,
}) => {
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: Halalanft,
    abi: HalalanftABI.abi,
    functionName: 'publicMint',
    enabled: ether > 0 && isMounted && !!isConnected && debouncedMinting,
    overrides: {
      value: ether,
    },
    args: [finalAmount],
  })
  const {
    data: writeData,
    error: writeError,
    isError: isWriteError,
    isLoading: isWriteLoading,
    write: mintNFT,
  } = useContractWrite(config)
  const { error, isLoading, isError } = useWaitForTransaction({
    hash: writeData?.hash,
  })

  return (
    <>
      <Hide above="sm">
        <Box my={4}>
          <Button
            bg="#374C8C"
            textColor="white"
            w="100%"
            px={4}
            py={2}
            borderRadius="lg"
            my={4}
            isDisabled={!(isChecked && isConnected && debouncedMinting)}
            onClick={async () => mintNFT()}
            _hover={{
              background: 'white',
              color: '#374C8C',
              border: '1px',
              borderColor: '#374C8C',
            }}
          >
            {debouncedMinting ? 'Purchase' : 'Minting Disabled'}
          </Button>
        </Box>
      </Hide>

      <Show above="sm">
        <Box my={8} display="flex" justifyContent="center" gap={6}>
          <Button
            bg="#374C8C"
            textColor="white"
            w="full"
            px={4}
            py={2}
            isDisabled={!(isChecked && isConnected && debouncedMinting)}
            onClick={async () => mintNFT()}
            borderRadius="lg"
            _hover={{
              background: 'white',
              color: '#374C8C',
              border: '1px',
              borderColor: '#374C8C',
            }}
          >
            {debouncedMinting ? 'Purchase' : 'Minting Disabled'}
          </Button>
        </Box>
      </Show>
    </>
  )
}

const PublicHeader = ({
  presaleAmount,
  sliderValue,
  setSliderValue,
  setSliderFinalValue,
}) => {
  return (
    <>
      <Box>
        {/* Title */}
        <Text textColor="#FAD02C" align="center" mb={4} fontSize="xl">
          SELECT QUANTITY
        </Text>
        {/* Amount */}
        <Text
          textColor="#292929"
          fontWeight="bold"
          fontSize="3xl"
          align="center"
        >
          How Many?
        </Text>
        <Text
          my={2}
          textColor="#292929"
          fontWeight="bold"
          fontSize="6xl"
          align="center"
        >
          {sliderValue}
        </Text>
      </Box>
      {/* Slider */}
      <Flex direction={{ base: 'column', md: 'column' }} align="center" gap={6}>
        <Slider
          flex={{ md: 'auto', lg: '1' }}
          aria-label="slider-purchase"
          defaultValue={0}
          step={1}
          min={0}
          max={10}
          onChange={(value) => {
            setSliderValue(value)
          }}
          onChangeEnd={(value) => {
            setSliderFinalValue(value)
          }}
        >
          <SliderMark value={0} mt="1" ml="-2.5" fontSize="sm">
            0
          </SliderMark>
          <SliderMark value={2} mt="1" ml="-2.5" fontSize="sm">
            2
          </SliderMark>
          <SliderMark value={4} mt="1" ml="-2.5" fontSize="sm">
            4
          </SliderMark>
          <SliderMark value={6} mt="1" ml="-2.5" fontSize="sm">
            6
          </SliderMark>
          <SliderMark value={8} mt="1" ml="-2.5" fontSize="sm">
            8
          </SliderMark>
          <SliderMark value={10} mt="1" ml="-2.5" fontSize="sm">
            10
          </SliderMark>
          <SliderTrack bg="white" borderWidth={1} borderColor="#374C8C">
            <SliderFilledTrack bg="#374C8C" />
          </SliderTrack>
          <SliderThumb boxSize={4} bg="#374C8C" />
        </Slider>
        <Text color="#292929" my={4}>
          Quantity [max : 10 per transaction]
        </Text>
      </Flex>
    </>
  )
}

const ApproveButton = ({
  isConnected,
  value,
  onApproved,
  isOpen,
  isChecked,
  onErrorOpen,
  onErrorClose,
  refetchUsdcAllowance,
}) => {
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: USDC,
    abi: ERC20ABI,
    functionName: 'approve',
    enabled: !!isConnected && Boolean(value),
    args: [Halalanft, parseInt(value) * 12 * 10 ** 6],
    onError(error) {
      onErrorOpen(true)
    },
  })
  const {
    data: writeData,
    error: writeError,
    isError: isWriteError,
    isSuccess: isWriteSuccess,
    isLoading: isWriteLoading,
    writeAsync,
  } = useContractWrite(config)
  const { error, isLoading, isError, status } = useWaitForTransaction({
    hash: writeData?.hash,
  })

  return (
    <Flex direction={{ base: 'column', md: 'column' }} align="center" gap={4}>
      <Button
        bg="#374C8C"
        textColor="white"
        w="full"
        px={4}
        py={2}
        isDisabled={!(!!writeAsync && isChecked && isConnected)}
        onClick={async () => {
          await writeAsync().then(async () => {
            await refetchUsdcAllowance()
          })
        }}
        borderRadius="lg"
        _hover={{
          background: 'white',
          color: '#374C8C',
          border: '1px',
          borderColor: '#374C8C',
        }}
      >
        {isLoading || isWriteLoading || status === 'loading'
          ? 'Loading...'
          : 'Approve'}
      </Button>
      {isChecked ? (
        <Text color="red">Please approve the USDC to proceed further.</Text>
      ) : (
        <></>
      )}
      {(isPrepareError || isWriteError || isError) && (
        <ErrorPopup
          isOpen={isOpen}
          onClose={onErrorClose}
          title={'Halalanft Approval Error'}
        >
          There is an error while approving this. Please try again later.
        </ErrorPopup>
      )}
    </Flex>
  )
}
