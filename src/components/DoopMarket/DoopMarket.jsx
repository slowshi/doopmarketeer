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
  useBreakpointValue
} from "@chakra-ui/react"
import { useState, useEffect } from 'react'
import {useSelector, useDispatch, shallowEqual} from "react-redux"
import {cacheFetch} from '../../utils/cacheFetch'
import DoodleCard from "../DoodleCard/DoodleCard"
import { API_URL, marketTabs } from '../../utils/constants'

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
    // const data = await cacheFetch.fetch(
    //   `${API_URL}/history?page=${page + 1}&offset=5`,
    //   {mode:'cors'}
    // )
    // dispatch({
    //   type: 'appendFeed',
    //   payload: data
    // })
    setPage(page+1)
    setLoadingMore(false)
  }

  useEffect(() => {
    if(activeMarketTab === marketTabs.DOOPMARKET) {
      fetchDoopmarket()
    }
  },[activeMarketTab])

  // useEffect(() => {
  //   const feedInterval = setInterval(checkFeed, 20000);
  //   return () => clearInterval(feedInterval);
  // },[latestBlockNumber])
  return (
    <Stack w='full'>
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
  )
}

export default DoopMarket
