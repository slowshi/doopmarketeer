import {
  Card,
  CardBody,
  Box,
  Stack,
  Text,
  Link,
  Spinner,
  Center,
  Heading,
  Button,
  Container,
  useBreakpointValue
} from "@chakra-ui/react"
import { useState, useEffect } from 'react'
import {useSelector, useDispatch, shallowEqual} from "react-redux"
import {cacheFetch} from '../../utils/cacheFetch'
import Nav from '../../components/Nav/Nav'
import DoodleCard from "../../components/DoodleCard/DoodleCard"
import { API_URL, marketTabs, palette } from '../../utils/constants'
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop"
import DoodleSpinner from "../../components/DoodleSpinner/DoodleSpinner"
function DoopFeed({item}) {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const activeMarketTab = useSelector((state)=>state.app.activeMarketTab)

  const feed = useSelector((state)=>state.app.feed, shallowEqual)
  const latestBlockNumber = useSelector((state)=>{
    let blockNumber = 0;
    if(state.app.feed.length > 0) {
      blockNumber =  state.app.feed[0].blockNumber
    }
    return blockNumber
  })

  const [page, setPage] = useState(1)

  const fetchHistory = async ()=> {
    setLoading(true)
    await setPage(1)
    const data = await cacheFetch.fetch(
      `${API_URL}/history?page=1&offset=5`,
      {mode:'cors'}
    )
    dispatch({
      type: 'setFeed',
      payload: data
    })
    setLoading(false)
  }

  const checkFeed = async () => {
    if(latestBlockNumber === 0) return;
    const data = await cacheFetch.fetch(
      `${API_URL}/feed?startBlock=${latestBlockNumber}`,
      {mode:'cors'}
    )
    dispatch({
      type: 'prependFeed',
      payload: data
    })
  }

  const loadMore =  async() => {
    setLoadingMore(true)
    const data = await cacheFetch.fetch(
      `${API_URL}/history?page=${page + 1}&offset=5`,
      {mode:'cors'}
    )
    dispatch({
      type: 'appendFeed',
      payload: data
    })
    setPage(page+1)
    setLoadingMore(false)
  }

  useEffect(() => {
    dispatch({
      type: 'setActiveMarketTab',
      payload: marketTabs.FEED
    })
    fetchHistory()
  },[])
  useEffect(() => {
    const feedInterval = setInterval(checkFeed, 20000);
    return () => clearInterval(feedInterval);
  },[latestBlockNumber])
  return (
    <>
      <ScrollToTop/>
      <Box zIndex='10000' w='100' position='sticky' bg={palette.SKIN_500} top='0'>
        <Nav/>
        <Container maxW='container.lg' mb='2'>
          <Heading  color='white' fontFamily='Chalkboard SE,sans-serif' as='h4' size='md'>
            Feed
          </Heading>
        </Container>
      </Box>
      <Container maxW='container.lg'>
        <Stack w='full' paddingBottom='8'>
          {loading === true ?
            <DoodleSpinner/>
            :
            <Stack w='full' spacing='4'>
              {feed.map((doop, index)=>
                <DoodleCard key={doop.tokenId} doop={doop}></DoodleCard>
              )}
              <Center>
                <Button isLoading={loadingMore} colorScheme='whiteAlpha' onClick={loadMore}>Load More</Button>
              </Center>
            </Stack>
          }
        </Stack>
        <Text w='full' bg={palette.SKIN_500} textAlign='right' position='fixed' bottom='0' right='0' color='white' fontSize='xs'>* Not affiliated with Doodles.</Text>
      </Container>
    </>
  )
}

export default DoopFeed
