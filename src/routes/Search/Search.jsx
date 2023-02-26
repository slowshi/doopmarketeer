import {
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
  FormErrorMessage,
  FormHelperText,
  Text,
  Center,
  Spinner,
  ButtonGroup,
  Button,
  Container,
  Stack,
  useBoolean,
  Box,
} from "@chakra-ui/react"
import {FaSearch} from 'react-icons/fa'
import { useState, useEffect } from 'react'
import {useSelector, useDispatch, shallowEqual} from "react-redux"
import { Router, Link as ReachLink, navigate } from '@reach/router'
import { marketTabs } from "../../utils/constants"
import Dooplications from "../../components/Dooplications/Dooplications"
import StatsCard from "../../components/StatsCard/StatsCard"
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop"
import Nav from '../../components/Nav/Nav'

function Search() {
  const dispatch = useDispatch()
  const [input, setInput] = useState('')
  const [searchParamsAddress, setSearchParamsAddress] = useState('')
  const [stats, setStats] = useBoolean()
  const loading = useSelector((state)=>state.app.searchLoading)
  const submittedAddress = useSelector((state)=>state.app.address)

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
    dispatch({
      type: 'setSearchLoading',
      payload: true
    })
    const searchParams = new URLSearchParams({
      address: input
    })
    const url = `/search?${searchParams}`
    navigate(url, {replace: searchParamsAddress === input})
  }
  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  const isError = false;

  useEffect(() => {
    dispatch({
      type: 'setActiveMarketTab',
      payload: marketTabs.SEARCH
    })
    if(submittedAddress !== '') {
      dispatch({
        type: 'setSearchLoading',
        payload: true
      })
      dispatch({
        type: 'setDooplications',
        payload: []
      })
      const searchParams = new URLSearchParams({
        address: submittedAddress
      })
      const url = `/search?${searchParams}`
      navigate(url, {replace: searchParamsAddress === input})
    }
    loadAddress()
    function loadAddress() {
      const searchParams = (new URL(document.location)).searchParams
      if(searchParams.has('address')) {
        const address = searchParams.get('address')
        dispatch({
          type: 'setSearchLoading',
          payload: true
        })
        dispatch({
          type: 'setAddress',
          payload: address
        })
        setInput(address)
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
  }, [submittedAddress])

  return (
    <>
      <ScrollToTop/>
      <Box zIndex='10000' w='100' position='sticky' bg='#ad9999' top='0'>
        <Nav/>
        <Container maxW='container.lg' pb='2'>
          <form className="w-100" onSubmit={handleSearchAddress}>
            <FormControl isInvalid={isError} mb="2">
              <InputGroup>
                <Input backgroundColor="white" type="text" value={input} name="address" onChange={handleInputChange} placeholder='Ethereum Address'/>
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
            </FormControl>
          </form>
          <Center>
            {submittedAddress !== '' ?
              <ButtonGroup gap='2' mb='2'>
                <Button colorScheme={stats ? 'whiteAlpha' : 'blackAlpha'} onClick={setStats.off}>History</Button>
                <Button colorScheme={!stats ? 'whiteAlpha' : 'blackAlpha'} onClick={setStats.on}>Stats</Button>
              </ButtonGroup> : ''
            }
          </Center>
        </Container>
      </Box>
      <Container maxW='container.lg'>
        <Stack w='full' paddingBottom='8'>
          {
            loading === true ?
            <Center mt='4'>
              <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.300'
                color='white'
                size='xl'
              />
            </Center>
            : ''
          }
          {
            !stats ?
            <Dooplications/>
            :
            <StatsCard/>
          }
        </Stack>
        <Text w='full' bg='#ad9999' textAlign='right' position='fixed' bottom='0' right='0' color='white' fontSize='xs'>* Not affiliated with Doodles.</Text>
      </Container>
    </>
  )
}

export default Search
