import { Flex, Grid, GridItem } from '@chakra-ui/react'
import { DashboardFooter } from '../footer'
import { DashboardHeader } from '../header'
import { Sidebar } from '../pages/dashboard'

export default function DashboardLayout({ children }) {
  return (
    <div>
      <DashboardHeader />
      <Flex direction="column" flex="1">
        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            md: 'repeat(5, 1fr)',
          }}
          height={'full'}
        >
          <GridItem colSpan={{ base: 4, md: 1 }}>
            <Sidebar />
          </GridItem>
          <GridItem colSpan={{ base: 4, md: 4 }}>{children}</GridItem>
        </Grid>
      </Flex>
      <DashboardFooter />
    </div>
  )
}
