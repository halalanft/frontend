import {
  CheckoutSection,
  ConnectSection,
  ReviewSection,
} from '@/components/pages/minting'
import { MintingLayout } from '@/components/layout'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Flex } from '@chakra-ui/react'

export default function MintingPage() {
  const tabMenu = [
    {
      number: '1',
      title: 'CONNECT',
      description: 'wallet and check network',
    },
    {
      number: '2',
      title: 'CHECKOUT',
      description: 'quantity and mint',
    },
    {
      number: '3',
      title: 'REVIEW',
      description: 'reciept',
    },
  ]
  return (
    <>
      <div className="bg h-full px-4 md:px-8">
        <div className="my-6 flex justify-center">
          <h1 className="font-impact text-[3rem] text-[#171717] opacity-[0.68]">
            Mint
          </h1>
        </div>
        <Tabs defaultIndex={1}>
          <div className="mx-auto rounded-lg bg-white shadow-lg">
            <TabList justifyContent="space-around">
              <Flex align="center">
                {tabMenu.map(({ number, title, description }) => (
                  <Tab>
                    <div>
                      <div
                        key={number}
                        className="flex justify-items-center space-x-4 border-gray-100 px-8 py-8 max-sm:border-b-2 lg:px-14"
                      >
                        <div className="shrink-0">
                          <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[#374C8C] p-2 shadow-lg">
                            <button
                              className="items-center self-center text-white"
                              type="button"
                              role="tab"
                            >
                              {number}
                            </button>
                          </div>
                        </div>
                        <div className="text-left">
                          <h1 className="text-xl font-semibold text-[#171717] opacity-[0.68]">
                            {title}
                          </h1>
                          <p className="text-slate-500">{description}</p>
                        </div>
                      </div>
                    </div>
                  </Tab>
                ))}
              </Flex>
            </TabList>

            <div className="hidden h-[0.5px] bg-[#171717] opacity-10 md:block"></div>
            <TabPanels>
              <TabPanel px={0}>
                <ConnectSection />
              </TabPanel>
              <TabPanel px={0}>
                <CheckoutSection />
              </TabPanel>
              <TabPanel px={0}>
                <ReviewSection />
              </TabPanel>
            </TabPanels>
          </div>
        </Tabs>
      </div>
    </>
  )
}

MintingPage.getLayout = function getLayout(page) {
  return <MintingLayout>{page}</MintingLayout>
}
