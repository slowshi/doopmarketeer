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
function DoopFeed({item}) {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const feed = useSelector((state)=>state.app.feed, shallowEqual)
  const [page, setPage] = useState(1)
  async function fetchAssets() {
    setLoading(true)
    const data = await cacheFetch.fetch(
      `https://doopmarketeer-api.vercel.app/history?page=${page}&offset=5`,
      {mode:'cors'}
    )
    dispatch({
      type: 'setFeed',
      payload: data
    })
    setPage(page+1);
    setLoading(false)
  }
  const loadMore =  async() => {
    setLoadingMore(true)
    const data = await cacheFetch.fetch(
      `https://doopmarketeer-api.vercel.app/history?page=${page}&offset=5`,
      {mode:'cors'}
    )
    dispatch({
      type: 'appendFeed',
      payload: data
    })
    setPage(page+1);
    setLoadingMore(false)
  }
  useEffect(() => {
    fetchAssets()
  }, [])
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
