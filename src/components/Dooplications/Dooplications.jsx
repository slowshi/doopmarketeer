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
  useBreakpointValue,
  useBoolean
} from "@chakra-ui/react"
import { useState, useEffect } from 'react'
import {useSelector, useDispatch, shallowEqual} from "react-redux"
import {cacheFetch} from '../../utils/cacheFetch'
import DoodleCard from "../DoodleCard/DoodleCard"
import { API_URL } from '../../utils/constants'

function Dooplications() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useBoolean()
  const [loadingMore, setLoadingMore] = useState(false)
  const [page, setPage] = useState(1)
  const dooplications = useSelector((state)=>{
    return state.app.dooplications.slice(0, page * 5)
  }, shallowEqual)
  const address = useSelector((state)=>state.app.address)
  const fetchDoops = async () => {
    setLoading.on()
    const data = await cacheFetch.fetch(
      `${API_URL}/doops?address=${address}`,
      {mode:'cors'}
    )
    dispatch({
      type: 'setDooplications',
      payload: data
    })
    setLoading.off()
  }

  const loadMore =  async() => {
    setPage(page+1)
  }

  useEffect(() => {
    if(address !== '') {
      fetchDoops()
    }
  },[address])

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
          {dooplications.map((doop, index)=>
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

export default Dooplications
