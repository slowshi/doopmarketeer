import './App.css'
import {
  Container,
  Heading,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Stack,
  Text,
  Spinner,
  Center,
  Grid,
  GridItem,
  IconButton,
  Link,
  InputRightElement,
  InputGroup,
  Button,
  ButtonGroup,
  Box,
  useBoolean,
} from "@chakra-ui/react"
import { useState, useEffect } from 'react'
import {useSelector, useDispatch, shallowEqual} from "react-redux"
import {FaGithub, FaTwitter, FaSearch} from 'react-icons/fa'
import {cacheFetch} from './utils/cacheFetch'
import DoodleCard from './components/DoodleCard/DoodleCard'
import StatsCard from './components/StatsCard/StatsCard'
import DoopFeed from './components/DoopFeed/DoopFeed'
import LeaderboardCard from './components/LeaderboardCard/LeaderboardCard'
import { API_URL } from './utils/constants'
import Dooplications from './components/Dooplications/Dooplications'
import { cacheEthers } from './utils/cacheEthers'
function App() {
  const dispatch = useDispatch()

  const [input, setInput] = useState('')
  const [searchParamsAddress, setSearchParamsAddress] = useState('')
  const [loading, setLoading] = useBoolean()
  const [stats, setStats] = useBoolean()
  const [leaderboard, setLeaderboard] = useBoolean()
  const dooplications = useSelector((state)=>state.app.dooplications, shallowEqual)
  const submittedAddress = useSelector((state)=>state.app.address)

  useEffect(() => {
    loadAddress()
    loadCurrencies()

    function loadAddress() {
      const searchParams = (new URL(document.location)).searchParams
      if(searchParams.has('address')) {
        const address = searchParams.get('address')
        setLoading.on()
        setInput(address)
        dispatch({
          type: 'setAddress',
          payload: address
        })
        setSearchParamsAddress(address)
      }
    }

    function handlePopstate() {
      loadAddress()
    }

    window.addEventListener("popstate", handlePopstate)

    return () => {
      window.removeEventListener("popstate", handlePopstate)
    }
  }, [])

  const loadCurrencies = async () => {
    const eth = await cacheEthers.getCurrencyConversion('eth')
    const flow = await cacheEthers.getCurrencyConversion('flow')
    dispatch({
      type: 'setEthPrice',
      payload: eth
    })
    dispatch({
      type: 'setFlowPrice',
      payload: flow
    })
  }

  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  const handleSearchAddress = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    if(input === '') return

    dispatch({
      type: 'setAddress',
      payload: input
    })

    dispatch({
      type: 'setDooplications',
      payload: []
    })

    setLoading.on()
    const searchParams = new URLSearchParams({
      address: input
    })
    const url = `?${searchParams}`
    if(searchParamsAddress === input) {
      window.history.replaceState(null, null, url)
    } else {
      window.history.pushState(null, null, url)
    }
  }
  //this doesn't work
  const isError = false
  return (
    <Container height='full' maxW='container.lg' centerContent>
      <Grid mt='2' templateColumns="repeat(3, 1fr)" gap={2} alignItems="center"  w='full'>
        <GridItem colSpan={1}>
          <Link href='https://twitter.com/slowshi' isExternal>
            <IconButton
              colorScheme='white'
              aria-label="Twitter"
              icon={<FaTwitter/>}
              size="md"
            />
          </Link>
        </GridItem>
        <GridItem colSpan={1} justifySelf="center">
          <Link href='/' color='white' _hover={{textDecoration: 'none'}}>
            <Heading color='white' fontFamily='Chalkboard SE,sans-serif'>Doopmarketeer</Heading>
          </Link>
        </GridItem>
        <GridItem colSpan={1} justifySelf="end">
          <Link href='https://github.com/slowshi/doopmarketeer' isExternal>
            <IconButton
              colorScheme='white'
              aria-label="Github"
              icon={<FaGithub/>}
              size="md"
            />
          </Link>
        </GridItem>
      </Grid>
      <form className="w-100" onSubmit={handleSearchAddress}>
        <FormControl isInvalid={isError} mb="2">
          <FormLabel color="white">Ethereum Address</FormLabel>
          <InputGroup>
            <Input backgroundColor="white" type="text" value={input} name="address" onChange={handleInputChange} />
            <InputRightElement>
              <IconButton
                color='white'
                backgroundColor='#f2e7ea'
                aria-label="Twitter"
                icon={<FaSearch/>}
                size="md"
                onClick={handleSearchAddress}
              />
            </InputRightElement>
          </InputGroup>
          {isError ? (
            <FormErrorMessage>Ethereum Address required.</FormErrorMessage>
          ) : ('')}
          <FormHelperText color='white' fontSize='xs'>* Not affiliated with Doodles.</FormHelperText>
        </FormControl>
      </form>
      {submittedAddress !== '' ?
        <ButtonGroup gap='4' mb='2'>
          <Button colorScheme={stats ? 'whiteAlpha' : 'blackAlpha'} onClick={setStats.off}>History</Button>
          <Button colorScheme={!stats ? 'whiteAlpha' : 'blackAlpha'} onClick={setStats.on}>Stats</Button>
        </ButtonGroup> :
        <ButtonGroup gap='4' mb='2'>
          <Button colorScheme={leaderboard ? 'whiteAlpha' : 'blackAlpha'} onClick={setLeaderboard.off}>Feed</Button>
          <Button colorScheme={!leaderboard ? 'whiteAlpha' : 'blackAlpha'} onClick={setLeaderboard.on}>Leaderboard</Button>
        </ButtonGroup>
      }
      {submittedAddress === '' ?
        <Box w='full' overflowY='scroll' mb='4'>
          {!leaderboard ?
          <DoopFeed/>
          :
          <LeaderboardCard/>
          }
        </Box>
        :
        <Box w='full' overflowY='scroll' mb='4'>
          {
            !stats ?
            <Dooplications/>
            :
            <StatsCard/>
          }
        </Box>
      }
    </Container>
  )
}

export default App