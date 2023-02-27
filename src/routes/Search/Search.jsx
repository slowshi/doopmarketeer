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
  Box,
} from "@chakra-ui/react"
import {FaSearch} from 'react-icons/fa'
import { useState, useEffect } from 'react'
import {useSelector, useDispatch, shallowEqual} from "react-redux"
import { Router, Link as ReachLink, navigate } from '@reach/router'
import { marketTabs, palette, searchTypes } from "../../utils/constants"
import Dooplications from "../../components/Dooplications/Dooplications"
import StatsCard from "../../components/StatsCard/StatsCard"
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop"
import Nav from '../../components/Nav/Nav'
import SearchBar from "../../components/SearchBar/SearchBar"
import DoodleSpinner from "../../components/DoodleSpinner/DoodleSpinner"
import SingleDoop from "../../components/SingleDoop/SingleDoop"
function Search() {
  const dispatch = useDispatch()
  const [input, setInput] = useState('')
  const [searchParamsAddress, setSearchParamsAddress] = useState('')
  const loading = useSelector((state)=>state.app.searchLoading)
  const searchValue = useSelector((state)=>state.app.searchValue)
  const searchType = useSelector((state)=>state.app.searchType)

  const handleSearchBar = async ({value, type}) => {
    if(value === '') return
    if(type === searchTypes.DOODLE && isNaN(value)) return;

    dispatch({
      type: 'setSearchLoading',
      payload: true
    })
    dispatch({
      type: 'setSearchType',
      payload: type
    })
    dispatch({
      type: 'setSearchValue',
      payload: value
    })

    const searchParams = new URLSearchParams({
      [type]: value
    })
    const url = `/search?${searchParams}`
    navigate(url, {replace: searchParamsAddress === value})
  }

  const isError = false;

  useEffect(() => {
    dispatch({
      type: 'setActiveMarketTab',
      payload: marketTabs.SEARCH
    })
    loadAddress()
    function loadAddress() {
      const searchParams = (new URL(document.location)).searchParams
      let type = '';
      let value = '';
      if(searchParams.has(searchTypes.ADDRESS)) {
        type = searchTypes.ADDRESS;
        value = searchParams.get(searchTypes.ADDRESS)
      } else if(searchParams.has(searchTypes.DOOPLICATOR)) {
        type = searchTypes.DOOPLICATOR;
        value = searchParams.get(searchTypes.DOOPLICATOR)
      } else if(searchParams.has(searchTypes.DOODLE)) {
        type = searchTypes.DOODLE;
        value = searchParams.get(searchTypes.DOODLE)
      } else if(searchParams.has(searchTypes.GENESIS_BOX)) {
        type = searchTypes.GENESIS_BOX;
        value = searchParams.get(searchTypes.GENESIS_BOX)
      }
      if (type !== '') {
        dispatch({
          type: 'setSearchLoading',
          payload: true
        })
        dispatch({
          type: 'setSearchType',
          payload: type
        })
        dispatch({
          type: 'setSearchValue',
          payload: value
        })
        setSearchParamsAddress(value)
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

  return (
    <>
      <ScrollToTop/>
      <Box zIndex='10000' w='100' position='sticky' bg={palette.SKIN_500} top='0'>
        <Nav/>
        <Container maxW='container.lg' pb='2'>
          <SearchBar onSubmit={handleSearchBar} value={searchValue} type={searchType}/>
        </Container>
      </Box>
      <Container maxW='container.lg'>
        <Stack w='full' paddingBottom='8'>
          {
            loading === true ?
            <DoodleSpinner/>
            : ''
          }
          {
            {
              [searchTypes.ADDRESS]: <Dooplications address={searchValue}/>,
              [searchTypes.DOODLE]: <SingleDoop tokenId={searchValue}/>
            }[searchType]
          }
        </Stack>
        <Text w='full' bg={palette.SKIN_500} textAlign='right' position='fixed' bottom='0' right='0' color='white' fontSize='xs'>* Not affiliated with Doodles.</Text>
      </Container>
    </>
  )
}

export default Search
