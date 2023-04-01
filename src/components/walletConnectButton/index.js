import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  Button,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import {
  useAccount,
  useConnect,
  useDisconnect,
  useNetwork,
  useProvider,
} from 'wagmi'

export default function WalletConnectButton() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { address, isConnected, connector } = useAccount()
  const provider = useProvider()
  const { disconnect } = useDisconnect()
  const {
    connect,
    connectors,
    data: connectData,
    error,
    isLoading,
    pendingConnector,
  } = useConnect()

  const { chain: networkChain, networkError = error, loading } = useNetwork()
  return (
    <>
      {!isConnected ? (
        <Menu>
          <MenuButton
            as={Button}
            colorScheme="green"
            rightIcon={<ChevronDownIcon />}
          >
            Connect
          </MenuButton>
          <MenuList>
            {connectors.map((connector) => (
              <MenuItem
                variant="outline"
                key={connector.id}
                disabled={!connector.ready}
                onClick={() => {
                  connect({ connector })
                }}
                w="100%"
              >
                <HStack w="100%" justifyContent="center">
                  <Image
                    width={26}
                    height={26}
                    borderRadius="3px"
                    src={walletIcons(connector.name)}
                    alt={'Wallet'}
                  ></Image>
                  <Text>
                    {connector.name}{' '}
                    {isLoading &&
                      pendingConnector?.id === connector.id &&
                      ' (connecting)'}
                  </Text>
                </HStack>
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      ) : networkChain.id != connector.chains[0].id ? (
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Change Network {connector.chains[0].id} != {networkChain.id}
          </MenuButton>
          <MenuList>
            <MenuItem
              onClick={() =>
                connector.connect({ chainId: connector.chains[0].id })
              }
            >
              {provider.network.name}
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            {truncate(address)}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => disconnect()}>Disconnect</MenuItem>
          </MenuList>
        </Menu>
      )}
    </>
  )
}

const walletIcons = (walletName) =>
  walletName === 'MetaMask' ? 'mm.png' : '/cbw.png'

const truncate = (address) => {
  const match = address.match(/^(0x[a-zA-Z0-9])[a-zA-Z0-9]+([a-zA-Z0-9])$/)
  return match
    ? `0x${address.slice(2, 6)}…${address.slice(address.length - 4)}`
    : address
}
