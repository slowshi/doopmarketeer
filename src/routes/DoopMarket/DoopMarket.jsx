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
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useBoolean,
  useBreakpointValue
} from "@chakra-ui/react"
import { useState, useEffect } from 'react'
import {useSelector, useDispatch} from "react-redux"
import {cacheFetch} from '../../utils/cacheFetch'
import {FaSortAmountDownAlt, FaSortAmountUp} from 'react-icons/fa'
import DoodleCard from "../../components/DoodleCard/DoodleCard"
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop"
import { API_URL, marketTabs, palette } from '../../utils/constants'
import { useLocation } from "@reach/router"
import Nav from '../../components/Nav/Nav'
import DoodleSpinner from "../../components/DoodleSpinner/DoodleSpinner"
function DoopMarket({item}) {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const address = useSelector((state)=>state.app.address)
  const activeMarketTab = useSelector((state)=>state.app.activeMarketTab)
  const [page, setPage] = useState(1)
  const [sortKey, setSortKey] = useState('value')
  const [sortDesc, setSortDesc] = useBoolean()
  const doopMarket = useSelector((state)=>state.app.doopMarket.sort((a,b)=>{
    if(sortDesc) {
      if (a[sortKey] > b[sortKey]) {
        return -1;
      }
      if (a[sortKey] < b[sortKey]) {
        return 1;
      }
    } else {
      if (a[sortKey] < b[sortKey]) {
        return -1;
      }
      if (a[sortKey] > b[sortKey]) {
        return 1;
      }
    }
    return 0;
  }).slice(0, page * 5))
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
      <Box zIndex='10000' w='100' position='sticky' bg={palette.SKIN_500} top='0'>
        <Nav/>
        <Container maxW='container.lg' mb='2'>
          <HStack justifyContent='space-between'>
            <Heading  color='white' fontFamily='Chalkboard SE,sans-serif' as='h4' size='md'>
              DoopMarket
            </Heading>
            <IconButton
              colorScheme='whiteAlpha'
              aria-label="Sort"
              icon={sortDesc ? <FaSortAmountUp/> : <FaSortAmountDownAlt/>}
              size="sm"
              onClick={()=>setSortDesc.toggle()}
            />
          </HStack>
        </Container>
      </Box>
      <Container maxW='container.lg'>
        <Stack w='full' paddingBottom='8'>
          {loading === true ?
            <DoodleSpinner/>
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
        <Text w='full' bg={palette.SKIN_500} textAlign='right' position='fixed' bottom='0' right='0' color='white' fontSize='xs'>* Not affiliated with Doodles.</Text>
      </Container>
    </>
  )
}

export default DoopMarket
