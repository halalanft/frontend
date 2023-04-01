import { MintingLayout } from '@/components/layout'
import { Owner } from '@/components/owner'
import { Stack } from '@chakra-ui/react'

export default function Dashboard() {
  return (
    <Stack
      direction="row"
      backgroundColor="#FFFFFF"
      borderColor="#FAD02C"
      borderWidth="3px"
      borderRadius="2xl"
      spacing={3}
      shadow="lg"
      p="16px"
      m="32px"
    >
      <Stack direction="column" align="center">
        <Owner />
      </Stack>
    </Stack>
  )
}

Dashboard.getLayout = function getLayout(page) {
  return <MintingLayout>{page}</MintingLayout>
}
