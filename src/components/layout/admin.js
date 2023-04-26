import { Box, Button, Flex, Grid, GridItem, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useAccount } from 'wagmi'
import { DashboardFooter } from '~/components/footer'
import { DashboardHeader } from '~/components/header'
import { Sidebar } from '~/components/pages/dashboard'
import { useIsMounted } from '~/hooks/useIsMounted'

export default function AdminLayout({ children }) {
  const adminAddress = process.env.NEXT_PUBLIC_ADMIN_WALLET_ADDRESS
  const { address } = useAccount()
  const isMounted = useIsMounted()
  const router = useRouter()
  const handleHomeRedirect = () => {
    router.push('/')
  }

  return isMounted ? (
    adminAddress === address ? (
      <div
        style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
      >
        <DashboardHeader />
        <Flex direction="column" flex="1">
          <Grid
            templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(5, 1fr)' }}
            gap={{ base: '4', lg: '8' }}
            height={'full'}
          >
            <GridItem colSpan={{ md: 1 }}>
              <Sidebar />
            </GridItem>
            <GridItem colSpan={{ md: 4 }}>{children}</GridItem>
          </Grid>
        </Flex>
        <DashboardFooter />
      </div>
    ) : (
      <Box textAlign="center" mt={8}>
        <Text fontSize="lg" fontWeight="bold" mb={4}>
          Page not found
        </Text>
        <Button colorScheme="blue" onClick={handleHomeRedirect}>
          Go Back
        </Button>
      </Box>
    )
  ) : null
}
