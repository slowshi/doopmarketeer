import { Box, Stack, Text, Center, Heading, Container, Button, HStack } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { cacheFetch } from '../../utils/cacheFetch'
import DoodleCard from '../../components/DoodleCard/DoodleCard'
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop'
import { API_URL, marketTabs, palette } from '../../utils/constants'
import Nav from '../../components/Nav/Nav'
import DoodleSpinner from '../../components/DoodleSpinner/DoodleSpinner'
function Unused() {
  const offset = 20
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [page, setPage] = useState(1)
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

  const fetchUndooped = async () => {
    setLoading(true)
    await setPage(1)
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
    setLoadingMore(false)
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

            <Text fontWeight="bold" color="white">
              Total Listing Searched: {page * offset}
            </Text>
          </HStack>
        </Container>
      </Box>
      <Container maxW="container.lg">
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
                  Load More
                </Button>
              </Center>
            </Stack>
          </>
        )}
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
