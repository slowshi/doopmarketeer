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
import { API_URL } from '../../utils/constants'

function DoopFeed({item}) {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const address = useSelector((state)=>state.app.address)
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
    if(address === '') {
      fetchHistory()
    }
  },[address])
  useEffect(() => {
    const feedInterval = setInterval(checkFeed, 20000);
    return () => clearInterval(feedInterval);
  },[latestBlockNumber])
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
          {feed.map((doop, index)=>
            <DoodleCard key={doop.tokenId} doop={doop}></DoodleCard>
          )}
          <Center>
            <Button isLoading={loadingMore} colorScheme='whiteAlpha' onClick={loadMore}>Load More</Button>
          </Center>
        </Stack>
      }

    </Stack>
  )
}

export default DoopFeed
