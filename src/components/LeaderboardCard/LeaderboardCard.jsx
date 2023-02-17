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
  useBreakpointValue
} from "@chakra-ui/react"
import { useState, useEffect } from 'react'
import {useSelector, useDispatch, shallowEqual} from "react-redux"
import {cacheFetch} from '../../utils/cacheFetch'

function LeaderboardCard({item}) {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const leaderboardSelector = (state)=> {
    const leaderboardSort = state.app.leaderboardSort;
    const data = state.app.leaderboard.map((user)=>{
      const shortAddress = user.address.substring(0, 4) + "..." + user.address.substring(user.address.length - 4);

      return {
        ...user,
        totalDoops: user.dooplicate + user.dooplicateItem,
        shortAddress
      }
    }).sort((a,b)=>{
      if (a[leaderboardSort] > b[leaderboardSort]) {
        return -1;
      }
      if (a[leaderboardSort] < b[leaderboardSort]) {
        return 1;
      }
      return 0;
    })

    return data.slice(0,20)
  }
  const leaderboard = useSelector(leaderboardSelector, shallowEqual)

  async function fetchAssets() {
    setLoading(true)
    const data = await cacheFetch.fetch(
      `http://localhost:8000/leaderboard`,
      {mode:'cors'}
    )
    dispatch({
      type: 'setLeaderboard',
      payload: data
    })
    setLoading(false)
  }

  const sortLeaderboard = (data) => {
    dispatch({
      type: 'sortLeaderboard',
      payload: data
    })
  }

  useEffect(() => {
    fetchAssets()
  }, [])
  const fontSize = useBreakpointValue({ base: "sm", sm: "md" });

  return (
    <Stack w='full' mb='4'>
      <Heading size="lg" color='white' fontFamily='Chalkboard SE,sans-serif'>Leaderboard</Heading>
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
        <Card w='full'>
          <CardBody>
            <Stack w='full'>
            <Box w='full' display='flex' justifyContent='space-between'>
              <Text fontSize={fontSize} flex='2'>Address</Text>
              <Link fontSize={fontSize} flex='1' onClick={()=>sortLeaderboard('dooplicate')}>Doop</Link>
              <Link fontSize={fontSize} flex='1' onClick={()=>sortLeaderboard('dooplicateItem')}>Market</Link>
              <Link fontSize={fontSize} flex='1' onClick={()=>sortLeaderboard('totalDoops')}>Total</Link>
              <Link fontSize={fontSize} flex='1' onClick={()=>sortLeaderboard('value')}>Spent</Link>
            </Box>
            {leaderboard.map((user)=>
              <Box key={user.address} w='full' display='flex' justifyContent='space-between'>
                <Link fontSize={fontSize} flex='2' href={`/?address=${user.address}`}>{user.shortAddress}</Link>
                <Text fontSize={fontSize} flex='1'>{user.dooplicate}</Text>
                <Text fontSize={fontSize} flex='1'>{user.dooplicateItem}</Text>
                <Text fontSize={fontSize} flex='1'>{user.totalDoops}</Text>
                <Text fontSize={fontSize} flex='1'>{`${Math.round(user.value / 10e17 * 100) / 100} Ξ`}</Text>
              </Box>
            )}
            </Stack>
          </CardBody>
        </Card>
      }
    </Stack>
  )
}

export default LeaderboardCard
