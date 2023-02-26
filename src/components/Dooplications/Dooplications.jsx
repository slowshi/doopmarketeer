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

function Dooplications() {
  const dispatch = useDispatch()
  const [loadingMore, setLoadingMore] = useState(false)
  const [page, setPage] = useState(1)
  const loading = useSelector((state)=>state.app.searchLoading)
  const dooplications = useSelector((state)=>{
    return state.app.dooplications.slice(0, page * 5)
  }, shallowEqual)
  const address = useSelector((state)=>state.app.address)
  const fetchDoops = async () => {
    const data = await cacheFetch.fetch(
      `${API_URL}/doops?address=${address}`,
      {mode:'cors'}
    )
    dispatch({
      type: 'setDooplications',
      payload: data
    })
    dispatch({
      type: 'setSearchLoading',
      payload: false
    })
  }

  const loadMore =  async() => {
    setPage(page+1)
  }

  useEffect(() => {
    if(loading) {
      fetchDoops()
    }
  },[loading])

  return (
    <Stack w='full' spacing='4'>
      {dooplications.map((doop, index)=>
        <DoodleCard key={doop.tokenId} doop={doop}></DoodleCard>
      )}
      {
        dooplications.length > 0 ?
        <Center>
          <Button colorScheme='whiteAlpha' onClick={loadMore}>Load More</Button>
        </Center>
        : ''
      }
    </Stack>
  )
}

export default Dooplications
