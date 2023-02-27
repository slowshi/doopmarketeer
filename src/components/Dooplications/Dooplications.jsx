import { Stack, Text, Center, Button, useBoolean } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { cacheFetch } from '../../utils/cacheFetch'
import DoodleCard from '../DoodleCard/DoodleCard'
import { API_URL } from '../../utils/constants'
import StatsCard from '../StatsCard/StatsCard'

function Dooplications({ address }) {
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const loading = useSelector((state) => state.app.searchLoading)
  const [loadingStats, setLoadingStats] = useBoolean()

  const dooplications = useSelector((state) => {
    return state.app.dooplications.slice(0, page * 5)
  }, shallowEqual)

  const loadMore = async () => {
    setPage(page + 1)
  }

  const fetchDoops = async () => {
    setLoadingStats.on()
    dispatch({
      type: 'setDooplications',
      payload: [],
    })
    const data = await cacheFetch.fetch(`${API_URL}/doops?address=${address}`, { mode: 'cors' })
    dispatch({
      type: 'setDooplications',
      payload: data,
    })
    dispatch({
      type: 'setSearchLoading',
      payload: false,
    })
    batchPromise([...data.slice(5)], 5, fetchAssets)
  }

  async function batchPromise(items, batchSize, asyncFunc) {
    const results = []
    for (let i = 0; i < items.length; i += batchSize) {
      const batch = items.slice(i, i + batchSize)
      const batchResults = await Promise.all(batch.map(asyncFunc))
      results.push(...batchResults)
    }
    setLoadingStats.off()
  }

  async function fetchAssets(doop) {
    const data = await cacheFetch.fetch(`${API_URL}/assets/${doop.tokenId}`, { mode: 'cors' })
    dispatch({
      type: 'addAssets',
      payload: {
        tokenId: doop.tokenId,
        data: data,
      },
    })
    return data
  }

  useEffect(() => {
    if (address !== '' && loading) {
      fetchDoops()
    }
  }, [address, loading])

  return dooplications.length > 0 ? (
    <>
      <Text color="white" fontWeight="bold">
        Stats
      </Text>
      <StatsCard loading={loadingStats} />
      <Text color="white" fontWeight="bold">
        History
      </Text>
      <Stack w="full" spacing="4">
        {dooplications.map((doop) => (
          <DoodleCard key={doop.tokenId} doop={doop}></DoodleCard>
        ))}
        <Center>
          <Button colorScheme="whiteAlpha" onClick={loadMore}>
            Load More
          </Button>
        </Center>
      </Stack>
    </>
  ) : (
    ''
  )
}

export default Dooplications
