import {
  Card,
  CardBody,
  Box,
  Stack,
  Text,
  Link,
  Spinner,
  Center,
  Container,
  Heading,
  Stat,
  SimpleGrid,
  StatLabel,
  StatNumber,
  useBreakpointValue
} from "@chakra-ui/react"
import { useState, useEffect } from 'react'
import {useSelector, useDispatch, shallowEqual} from "react-redux"
import {cacheFetch} from '../../utils/cacheFetch'
import { API_URL, marketTabs,palette} from '../../utils/constants'
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop"
import Nav from '../../components/Nav/Nav'
import DoodleSpinner from "../../components/DoodleSpinner/DoodleSpinner"
import { Link as ReachLink } from '@reach/router'

function LeaderboardCard({item}) {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const totalDoopers = useSelector((state)=>state.app.leaderboard.length);
  const activeMarketTab = useSelector((state)=>state.app.activeMarketTab)
  const totalDoops = useSelector((state)=>state.app.leaderboard.reduce((acc, user)=>{
    return acc + user.dooplicate + user.dooplicateItem
  },0));
  const totalDoopMarket = useSelector((state)=>state.app.leaderboard.reduce((acc, user)=>{
    return acc + user.dooplicateItem
  },0));
  const totalDooplicators = useSelector((state)=>state.app.leaderboard.reduce((acc, user)=>{
    return acc + user.dooplicate
  },0));
  const totalVolume = useSelector((state)=>state.app.leaderboard.reduce((acc, user)=>{
    return acc + user.value
  },0));
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
      `${API_URL}/leaderboard`,
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
    document.title = 'Doopmarketeer | Leaderboard'
    dispatch({
      type: 'setActiveMarketTab',
      payload: marketTabs.LEADERBOARD
    })
    fetchAssets()
  }, [])
  const fontSize = useBreakpointValue({ base: "sm", sm: "md" });

  return (
    <>
      <ScrollToTop/>
      <Box zIndex='10000' w='100' position='sticky' bg={palette.SKIN_500} top='0'>
        <Nav/>
        <Container maxW='container.lg' mb='2'>
          <Heading  color='white' fontFamily='Chalkboard SE,sans-serif' as='h4' size='md'>
            Leaderboard
          </Heading>
        </Container>
      </Box>
      <Container maxW='container.lg'>
        <Stack w='full' paddingBottom='8'>
          {loading === true ?
            <DoodleSpinner/>
            :
            <Stack w='full'>
              <Card w='full'>
                <CardBody>
                  <SimpleGrid columns={[2, null, 5]} spacing='2'>
                    <Stat>
                      <StatLabel>Total Doopers</StatLabel>
                      <StatNumber>{totalDoopers}</StatNumber>
                    </Stat>
                    <Stat>
                      <StatLabel>Total Doops</StatLabel>
                      <StatNumber>{totalDoops}</StatNumber>
                    </Stat>
                    <Stat>
                      <StatLabel>Dooplicator</StatLabel>
                      <StatNumber>{totalDooplicators}</StatNumber>
                    </Stat>
                    <Stat>
                      <StatLabel>DoopMarket</StatLabel>
                      <StatNumber>{totalDoopMarket}</StatNumber>
                    </Stat>
                    <Stat>
                      <StatLabel>Volume</StatLabel>
                      <StatNumber>{`${Math.round(totalVolume / 10e17 * 100) / 100} Ξ`}</StatNumber>
                    </Stat>
                  </SimpleGrid>
                </CardBody>
              </Card>
              <Card w='full'>
                <CardBody>
                  <Stack w='full'>
                  <Box w='full' display='flex' justifyContent='space-between'>
                    <Text fontSize={fontSize} flex='2'>Address</Text>
                    <Link fontWeight='bold' color={palette.ORANGE_100} fontSize={fontSize} flex='1' onClick={()=>sortLeaderboard('dooplicate')}>Doop</Link>
                    <Link fontWeight='bold' color={palette.ORANGE_100} fontSize={fontSize} flex='1' onClick={()=>sortLeaderboard('dooplicateItem')}>Market</Link>
                    <Link fontWeight='bold' color={palette.ORANGE_100} fontSize={fontSize} flex='1' onClick={()=>sortLeaderboard('totalDoops')}>Total</Link>
                    <Link fontWeight='bold' color={palette.ORANGE_100} fontSize={fontSize} flex='1' onClick={()=>sortLeaderboard('value')}>Volume</Link>
                  </Box>
                  {leaderboard.map((user)=>
                    <Box key={user.address} w='full' display='flex' justifyContent='space-between'>
                      <Link fontWeight='bold' color={palette.ORANGE_100} fontSize={fontSize} flex='2' as={ReachLink} to={`/search?address=${user.address}`}>{user.shortAddress}</Link>
                      <Text fontSize={fontSize} flex='1'>{user.dooplicate}</Text>
                      <Text fontSize={fontSize} flex='1'>{user.dooplicateItem}</Text>
                      <Text fontSize={fontSize} flex='1'>{user.totalDoops}</Text>
                      <Text fontSize={fontSize} flex='1'>{`${Math.round(user.value / 10e17 * 100) / 100} Ξ`}</Text>
                    </Box>
                  )}
                  </Stack>
                </CardBody>
              </Card>
            </Stack>
          }
        </Stack>
        <Text w='full' bg={palette.SKIN_500} textAlign='right' position='fixed' bottom='0' right='0' color='white' fontSize='xs'>* Not affiliated with Doodles.</Text>
      </Container>
    </>
  )
}

export default LeaderboardCard
