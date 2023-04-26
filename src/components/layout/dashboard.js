import { Flex, Grid, GridItem } from '@chakra-ui/react'
import { DashboardFooter } from '../footer'
import { DashboardHeader } from '../header'
import { Sidebar } from '../pages/dashboard'

export default function DashboardLayout({ children }) {
  return (
    <div
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <DashboardHeader />
      <Flex direction="column" flex="1">
        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            md: 'repeat(5, 1fr)',
          }}
          gap={{ base: '2', lg: '8' }}
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
  )
}
