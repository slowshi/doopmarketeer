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
} from "@chakra-ui/react"
import { useState, useEffect } from 'react'
import {useSelector, useDispatch, shallowEqual} from "react-redux"
import {FaGithub, FaTwitter, FaSearch} from 'react-icons/fa'
import {cacheFetch} from './utils/cacheFetch'
import StatsCard from './components/StatsCard/StatsCard'
import DoopFeed from './routes/DoopFeed/DoopFeed'
import Search from './routes/Search/Search'
import LeaderboardCard from './routes/LeaderboardCard/LeaderboardCard'
import DoopMarket from './routes/DoopMarket/DoopMarket'
import Nav from './components/Nav/Nav'
import { API_URL, marketTabs } from './utils/constants'
import Dooplications from './components/Dooplications/Dooplications'
import { cacheEthers } from './utils/cacheEthers'
import { Router, Link as ReachLink, navigate } from '@reach/router'

function App() {
  const dispatch = useDispatch()

  const [input, setInput] = useState('')
  const [searchParamsAddress, setSearchParamsAddress] = useState('')
  const dooplications = useSelector((state)=>state.app.dooplications, shallowEqual)
  const activeMarketTab = useSelector((state)=>state.app.activeMarketTab)

  useEffect(() => {
    loadCurrencies()
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

  //this doesn't work
  const isError = false
  return (
    <Router>
      <DoopFeed path='/'/>
      <DoopMarket path='/doopmarket'/>
      <LeaderboardCard path='/leaderboard'/>
      <Search path='/search'/>
    </Router>
  )
}

export default App