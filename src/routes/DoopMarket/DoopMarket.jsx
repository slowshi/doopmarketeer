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
  Container,
  Button,
  useBreakpointValue
} from "@chakra-ui/react"
import { useState, useEffect } from 'react'
import {useSelector, useDispatch, shallowEqual} from "react-redux"
import {cacheFetch} from '../../utils/cacheFetch'
import DoodleCard from "../../components/DoodleCard/DoodleCard"
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop"
import { API_URL, marketTabs } from '../../utils/constants'
import { useLocation } from "@reach/router"
import Nav from '../../components/Nav/Nav'
function DoopMarket({item}) {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const address = useSelector((state)=>state.app.address)
  const activeMarketTab = useSelector((state)=>state.app.activeMarketTab)
  const [page, setPage] = useState(1)
  const doopMarket = useSelector((state)=>state.app.doopMarket.slice(0, page * 5), shallowEqual)

  const fetchDoopmarket = async ()=> {
    setLoading(true)
    await setPage(1)
    const data = await cacheFetch.fetch(
      `${API_URL}/doopmarket`,
      {mode:'cors'}
    )
    dispatch({
      type: 'setDoopMarket',
      payload: data
    })
    setLoading(false)
  }

  const checkFeed = async () => {
    if(latestBlockNumber === 0) return;
    const data = await cacheFetch.fetch(
      `${API_URL}/feed?startBlock=${latestBlockNumber}`,
      {mode:'cors'},
      true
    )
    dispatch({
      type: 'prependFeed',
      payload: data
    })
  }

  const loadMore =  async() => {
    setLoadingMore(true)
    setPage(page+1)
    setLoadingMore(false)
  }

  useEffect(() => {
    dispatch({
      type: 'setActiveMarketTab',
      payload: marketTabs.DOOPMARKET
    })
    fetchDoopmarket()
  },[])

  return (
    <>
      <ScrollToTop/>
      <Box zIndex='10000' w='100' position='sticky' bg='#ad9999' top='0'>
        <Nav/>
      </Box>
      <Container maxW='container.lg'>
        <Stack w='full' paddingBottom='8'>
          {loading === true ?
            <Center mt='4'>
              <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.300'
                color='white'
                size='xl'
              />
            </Center>
            :
            <Stack w='full' spacing='4'>
              {doopMarket.map((doop, index)=>
                <DoodleCard key={doop.tokenId} doop={doop}></DoodleCard>
              )}
              <Center>
                <Button colorScheme='whiteAlpha' onClick={loadMore}>Load More</Button>
              </Center>
            </Stack>
          }
        </Stack>
        <Text w='full' bg='#ad9999' textAlign='right' position='fixed' bottom='0' right='0' color='white' fontSize='xs'>* Not affiliated with Doodles.</Text>
      </Container>
    </>
  )
}

export default DoopMarket
