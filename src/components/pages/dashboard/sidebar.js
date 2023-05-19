import { Box, Flex, Link, Stack, Text } from '@chakra-ui/react'
import { DiAptana } from 'react-icons/di'
import { FaCube, FaHome, FaTag } from 'react-icons/fa'
import { VscLock } from 'react-icons/vsc'
import { useAccount } from 'wagmi'
import { useIsMounted } from '~/hooks/useIsMounted'

export default function Sidebar() {
  const isMounted = useIsMounted()
  const { address, isConnected } = useAccount()
  const adminAddress = process.env.NEXT_PUBLIC_ADMIN_WALLET_ADDRESS

  const navItem = [
    {
      icon: <FaHome />,
      label: 'Home',
      route: '/',
    },
    {
      icon: <FaCube />,
      label: 'My NFT',
      route: '/dashboard',
    },
    {
      icon: <FaTag />,
      label: 'Buy NFT',
      route: '/minting',
    },
  ]
  const navAdmin = [
    {
      icon: <FaHome />,
      label: 'Home',
      route: '/',
    },
    {
      icon: <FaCube />,
      label: 'My NFT',
      route: '/dashboard',
    },
    {
      icon: <FaTag />,
      label: 'Buy NFT',
      route: '/minting',
    },
    {
      icon: <VscLock />,
      label: 'All Units',
      route: '/admin',
    },
    {
      icon: <DiAptana />,
      label: 'Controller',
      route: '/admin/controller',
    },
  ]

  return (
    <Box
      p={4}
      shadow="xl"
      bg="white"
      width="full"
      minHeight="full"
      maxHeight="full"
    >
      <Stack p={4} spacing={8}>
        {isMounted && isConnected && address === adminAddress
          ? navAdmin.map(({ icon, label, route }) => (
              <Link href={route} key={icon}>
                <Flex
                  direction="row"
                  align="center"
                  gap={4}
                  key={label}
                  color="#171717"
                >
                  {icon}
                  <Text fontSize="md" fontWeight="semibold" color="#171717">
                    {label}
                  </Text>
                </Flex>
              </Link>
            ))
          : navItem.map(({ icon, label, route }) => (
              <Link href={route} key={icon}>
                <Flex
                  direction="row"
                  align="center"
                  gap={4}
                  key={label}
                  color="#171717"
                >
                  {icon}
                  <Text fontSize="md" fontWeight="semibold" color="#171717">
                    {label}
                  </Text>
                </Flex>
              </Link>
            ))}
      </Stack>
    </Box>
  )
}
