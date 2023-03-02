import {
  Box,
  Stack,
  Text,
  Center,
  Heading,
  Container,
  Button,
  HStack,
  Tabs,
  TabPanels,
  TabPanel,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { cacheFetch } from '../../utils/cacheFetch'
import DoodleCard from '../../components/DoodleCard/DoodleCard'
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop'
import { API_URL, marketTabs, palette } from '../../utils/constants'
import Nav from '../../components/Nav/Nav'
import DoodleSpinner from '../../components/DoodleSpinner/DoodleSpinner'
import DooplicatorCard from '../../components/DooplicatorCard/DooplicatorCard'
function Unused() {
  const offset = 20
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [page, setPage] = useState(1)
  const [menuTitle, setMenuTitle] = useState('Doodles')
  const [tabIndex, setTabIndex] = useState(0)
  const undoopedDoodles = useSelector((state) =>
    state.app.undoopedDoodles.map((item) => {
      return {
        ...item,
        functionName: '',
        timeStamp: 0,
        from: '',
      }
    }),
  )
  const undoopedDooplicators = useSelector((state) =>
    state.app.undoopedDooplicators.map((item) => {
      return {
        tokenId: item.id,
        price: Number(item.priceInfo.price),
        url: item.marketUrl,
      }
    }),
  )

  const fetchUndooped = async () => {
    setPage(1)
    setLoading(true)
    dispatch({
      type: 'setUndoopedDoodles',
      payload: [],
    })
    const data = await cacheFetch.fetch(`${API_URL}/doodle-floor?page=1&offset=${offset}`, { mode: 'cors' })
    dispatch({
      type: 'setUndoopedDoodles',
      payload: data,
    })
    setLoading(false)
  }

  const loadMore = async () => {
    setLoadingMore(true)
    const data = await cacheFetch.fetch(`${API_URL}/doodle-floor?page=${page + 1}&offset=${offset}`, { mode: 'cors' })
    dispatch({
      type: 'appendUndoopedDoodles',
      payload: data,
    })
    setPage(page + 1)
    if (data.length === 0) {
      await loadMore()
    }
    setLoadingMore(false)
  }

  const fetchUndoopedDooplicators = async (index) => {
    setLoadingMore(true)
    dispatch({
      type: 'setUndoopedDooplicators',
      payload: [],
    })
    const data = await cacheFetch.fetch(`${API_URL}/doop-floor?rarity=${index}`, { mode: 'cors' })

    dispatch({
      type: 'setUndoopedDooplicators',
      payload: data,
    })
    setLoadingMore(false)
  }

  const handleSliderChange = (index) => {
    const titles = {
      0: 'Doodles',
      1: 'Very Common',
      2: 'Common',
      3: 'Rare',
    }
    setMenuTitle(titles[index])
    if (index !== 0) {
      fetchUndoopedDooplicators(index - 1)
      setTabIndex(1)
    } else {
      setPage(1)
      fetchUndooped()
      setTabIndex(0)
    }
  }

  const handleTabsChange = (index) => {
    setTabIndex(index)
  }

  useEffect(() => {
    document.title = 'Doopmarketeer | Undooped'
    dispatch({
      type: 'setActiveMarketTab',
      payload: marketTabs.UNDOOPED,
    })
    fetchUndooped()
  }, [])
  return (
    <>
      <ScrollToTop />
      <Box zIndex="10000" w="100" position="sticky" bg={palette.SKIN_500} top="0">
        <Nav />
        <Container maxW="container.lg" mb="2">
          <HStack justifyContent="space-between">
            <Heading color="white" fontFamily="Chalkboard SE,sans-serif" as="h4" size="md">
              Undooped
            </Heading>
            <Box display="flex" alignItems="center">
              <Menu>
                {({ isOpen }) => (
                  <>
                    <MenuButton colorScheme={isOpen ? 'blackAlpha' : 'whiteAlpha'} as={Button} aria-label="Options">
                      {menuTitle}
                    </MenuButton>
                    <MenuList>
                      <MenuItem onClick={() => handleSliderChange(0)}>Doodles</MenuItem>
                      <MenuItem onClick={() => handleSliderChange(1)}>Very Common</MenuItem>
                      <MenuItem onClick={() => handleSliderChange(2)}>Common</MenuItem>
                      <MenuItem onClick={() => handleSliderChange(3)}>Rare</MenuItem>
                    </MenuList>
                  </>
                )}
              </Menu>
            </Box>
          </HStack>
        </Container>
      </Box>
      <Container maxW="container.lg">
        <Tabs index={tabIndex} onChange={handleTabsChange} isLazy>
          <TabPanels>
            <TabPanel p="0">
              {loading === true ? (
                <DoodleSpinner />
              ) : (
                <>
                  {undoopedDoodles.length === 0 ? (
                    <Center>
                      <Text color="white">No undooped listings found, keep trying.</Text>
                    </Center>
                  ) : (
                    ''
                  )}
                  <Stack w="full" spacing="4" paddingBottom="8">
                    {undoopedDoodles.map((doop) => (
                      <DoodleCard key={doop.tokenId} doop={doop}></DoodleCard>
                    ))}
                    <Center>
                      <Button isLoading={loadingMore} colorScheme="whiteAlpha" onClick={loadMore}>
                        Load More ({page * offset})
                      </Button>
                    </Center>
                  </Stack>
                </>
              )}
            </TabPanel>
            <TabPanel p="0">
              {loading === true ? (
                <DoodleSpinner />
              ) : (
                <Stack w="full" spacing="4" paddingBottom="8">
                  {undoopedDooplicators.map((doop) => (
                    <DooplicatorCard
                      key={doop.tokenId}
                      tokenId={doop.tokenId}
                      url={doop.url}
                      price={doop.price}
                    ></DooplicatorCard>
                  ))}
                </Stack>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Text
          w="full"
          bg={palette.SKIN_500}
          textAlign="right"
          position="fixed"
          bottom="0"
          right="0"
          color="white"
          fontSize="xs"
        >
          * Not affiliated with Doodles.
        </Text>
      </Container>
    </>
  )
}

export default Unused
