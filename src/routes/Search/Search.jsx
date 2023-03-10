import { Heading, Container, Stack, Box, Text } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { navigate } from '@reach/router'
import { marketTabs, palette, searchTypes } from '../../utils/constants'
import Dooplications from '../../components/Dooplications/Dooplications'
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop'
import Nav from '../../components/Nav/Nav'
import SearchBar from '../../components/SearchBar/SearchBar'
import DoodleSpinner from '../../components/DoodleSpinner/DoodleSpinner'
import SingleDoop from '../../components/SingleDoop/SingleDoop'
import DooplicatorCard from '../../components/DooplicatorCard/DooplicatorCard'
function Search() {
  const dispatch = useDispatch()
  const [searchParamsAddress, setSearchParamsAddress] = useState('')
  const loading = useSelector((state) => state.app.searchLoading)
  const searchValue = useSelector((state) => state.app.searchValue)
  const searchType = useSelector((state) => state.app.searchType)

  const handleSearchBar = async ({ value, type }) => {
    if (value === '') return
    if (type === searchTypes.DOODLE && isNaN(value)) return

    dispatch({
      type: 'setSearchLoading',
      payload: true,
    })
    dispatch({
      type: 'setSearchType',
      payload: type,
    })
    dispatch({
      type: 'setSearchValue',
      payload: value,
    })

    const searchParams = new URLSearchParams({
      [type]: value,
    })
    const url = `/search?${searchParams}`
    navigate(url, { replace: searchParamsAddress === value })
  }

  useEffect(() => {
    document.title = 'Doopmarketeer | Search'

    dispatch({
      type: 'setActiveMarketTab',
      payload: marketTabs.SEARCH,
    })
    loadAddress()
    function loadAddress() {
      const searchParams = new URL(document.location).searchParams
      let type = ''
      let value = ''
      if (searchParams.has(searchTypes.ADDRESS)) {
        type = searchTypes.ADDRESS
        value = searchParams.get(searchTypes.ADDRESS)
      } else if (searchParams.has(searchTypes.DOOPLICATOR)) {
        type = searchTypes.DOOPLICATOR
        value = searchParams.get(searchTypes.DOOPLICATOR)
      } else if (searchParams.has(searchTypes.DOODLE)) {
        type = searchTypes.DOODLE
        value = searchParams.get(searchTypes.DOODLE)
      } else if (searchParams.has(searchTypes.GENESIS_BOX)) {
        type = searchTypes.GENESIS_BOX
        value = searchParams.get(searchTypes.GENESIS_BOX)
      }
      if (type !== '') {
        dispatch({
          type: 'setSearchLoading',
          payload: true,
        })
        dispatch({
          type: 'setSearchType',
          payload: type,
        })
        dispatch({
          type: 'setSearchValue',
          payload: value,
        })
        setSearchParamsAddress(value)
      }
    }

    return () => {
      dispatch({
        type: 'setSearchType',
        payload: searchTypes.ADDRESS,
      })
      dispatch({
        type: 'setSearchValue',
        payload: '',
      })
      dispatch({
        type: 'setDooplications',
        payload: [],
      })
    }
  }, [])

  return (
    <>
      <ScrollToTop />
      <Box zIndex="10000" w="100" position="sticky" bg={palette.SKIN_500} top="0">
        <Nav />
        <Container maxW="container.lg" pb="2">
          <Heading color="white" fontFamily="Chalkboard SE,sans-serif" as="h4" size="md" mb="2">
            Search
          </Heading>
          <SearchBar onSubmit={handleSearchBar} value={searchValue} type={searchType} />
        </Container>
      </Box>
      <Container maxW="container.lg">
        <Stack w="full" paddingBottom="8">
          {loading === true ? <DoodleSpinner /> : ''}
          {
            {
              [searchTypes.ADDRESS]: <Dooplications address={searchValue} />,
              [searchTypes.DOODLE]: <SingleDoop tokenId={searchValue} />,
              [searchTypes.DOOPLICATOR]: <DooplicatorCard tokenId={searchValue} />,
            }[searchType]
          }
        </Stack>
        <Text
          w="full"
          bg={palette.SKIN_500}
          textAlign="right"
          position="fixed"
          bottom="0"
          right="0"
          color="white"
          fontSize="xs"
        >
          * Not affiliated with Doodles.
        </Text>
      </Container>
    </>
  )
}

export default Search
