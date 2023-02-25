import {
  Stack,
  Card,
  CardBody,
  Image,
  Text,
  Flex,
  Box,
  Wrap,
  WrapItem,
  Skeleton,
  Center,
  Link,
  SkeletonCircle,
} from "@chakra-ui/react"
import { useState, useEffect } from 'react'
import './DoodleCard.css'
import WearbleImage from "../WearableImage/WearableImage"
import { useInView } from "react-intersection-observer"
import {cacheFetch} from '../../utils/cacheFetch'
import {useSelector, useDispatch, shallowEqual} from "react-redux"
import { API_URL, currencyMap } from '../../utils/constants'

function DoodleCard({doop}) {
  const dispatch = useDispatch()

  const [avatarLoaded, setAvatarLoaded] = useState(false)

  const image = useSelector((state)=>{
    const data = state.app.assets[doop.tokenId]
    if(typeof data === 'undefined') return ''

    const params = {
      url: `https://alchemy.mypinata.cloud/ipfs/${data.image.substring(7)}`,
      w: 256,
      q: 75
    }

    return `https://doopmarket.doodles.app/_next/image?${new URLSearchParams(params)}`
  }, shallowEqual)
  const totalCost = useSelector((state)=>{
    const data = state.app.assets[doop.tokenId]
    if(typeof data === 'undefined') return 0
    return data.costs.reduce((acc, cost)=>{
      return acc + cost.activeListing.price;
    },0)
  }, shallowEqual);

  const totalCostETH = useSelector((state)=>{
    const data = state.app.assets[doop.tokenId]
    if(typeof data === 'undefined') return 0;
    const total = data.costs.reduce((acc, cost)=>{
      return acc + cost.activeListing.price;
    },0);

    return total / state.app.ethPrice;
  }, shallowEqual);

  const wearables = useSelector((state)=>{
    const data = state.app.assets[doop.tokenId]
    const flowPrice = state.app.flowPrice;
    if(typeof data === 'undefined') return []
    const costMap = data.costs.reduce((acc, cost)=>{
      let price = cost.activeListing.price;
      if(cost.activeListing?.vaultType !== 'A.ead892083b3e2c6c.DapperUtilityCoin.Vault') {
        price = price / flowPrice;
      }
      acc = {
        ...acc,
        [cost.editionID]: price.toLocaleString(undefined, currencyMap.usd.toLocaleString)
      }
      return acc;
    },{});
    return data.wearables.map((wearable)=>{
      return {
        ...wearable,
        cost: costMap[wearable.wearable_id]
      };
    })
  }, shallowEqual)

  const { ref, inView } = useInView({
    triggerOnce: true,
    fallbackInView: true,
  })

  const isError = false
  function imageLoaded() {
    setAvatarLoaded(true)
  }

  async function fetchAssets() {
    const data = await cacheFetch.fetch(
      `${API_URL}/assets/${doop.tokenId}`,
      {mode:'cors'}
    )
    dispatch({
      type: 'addAssets',
      payload: {
        tokenId: doop.tokenId,
        data: data
      }
    })
  }

  useEffect(() => {
    fetchAssets()
  }, [])

  return (
  <Card ref={ref}>
    <CardBody>
      <Flex flexWrap='wrap' flexFlow='column'>
        <Flex>
          <Box me='6'>
            <SkeletonCircle w='90px' h='90px' isLoaded={avatarLoaded}>
              <Image rounded='full' w='90px' src={image} onLoad={imageLoaded}></Image>
            </SkeletonCircle>
            <Skeleton height='22px' w='full' isLoaded={avatarLoaded}>
              <Center>
                <Text>#{doop.tokenId}</Text>
              </Center>
            </Skeleton>
          </Box>
          <Box>
            <Stack h='100' justifyContent='space-evenly'>
                <Skeleton height='22px' isLoaded={avatarLoaded}>
                  <Text>
                    {doop.functionName === 'dooplicateItem'? `DoopMarket - ${Number(doop.value / 10e17).toLocaleString(undefined, currencyMap.eth.toLocaleString)} Ξ`:'Dooplicator'}
                  </Text>
                </Skeleton>
                <Skeleton height='22px' isLoaded={avatarLoaded}>
                  <Text>{new Date(doop.timeStamp * 1000).toLocaleString()}</Text>
                </Skeleton>
                <Skeleton height='22px' isLoaded={avatarLoaded}>
                  <Link fontWeight='bold' color='#746566' href={`/?address=${doop.from}`}>
                    {doop.from.substring(0, 4) + "..." + doop.from.substring(doop.from.length - 4)}
                  </Link>
                </Skeleton>
                <Skeleton height='22px' isLoaded={avatarLoaded}>
                  <Text>Total {totalCost.toLocaleString(undefined, currencyMap.usd.toLocaleString)} | {`${totalCostETH.toLocaleString(undefined, currencyMap.eth.toLocaleString)} Ξ`}</Text>
                </Skeleton>
            </Stack>
          </Box>
        </Flex>
        <Flex mt='4' ms='2'>
          <Wrap spacing='20px'>
            {wearables.map((item, index)=>
            <WrapItem key={index}>
              <WearbleImage item={item}></WearbleImage>
            </WrapItem>
            )}
          </Wrap>
        </Flex>
      </Flex>
    </CardBody>
  </Card>
  )
}

export default DoodleCard
