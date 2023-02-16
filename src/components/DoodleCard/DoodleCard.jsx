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
  SkeletonCircle,
} from "@chakra-ui/react"
import { useState, useEffect } from 'react'
import './DoodleCard.css'
import WearbleImage from "../WearableImage/WearableImage"
import { useInView } from "react-intersection-observer"
import {cacheFetch} from '../../utils/cacheFetch'
import {useSelector, useDispatch, shallowEqual} from "react-redux"

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

  const wearables = useSelector((state)=>{
    const data = state.app.assets[doop.tokenId]
    if(typeof data === 'undefined') return []
    return data.wearables
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
      `https://doopmarketeer-api.vercel.app/assets/${doop.tokenId}`,
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
          <Box>
            <SkeletonCircle w='90px' h='90px' mt='4' marginEnd='4' isLoaded={avatarLoaded}>
              <Image rounded='full' w='90px' src={image} onLoad={imageLoaded}></Image>
            </SkeletonCircle>
          </Box>
          <Box>
            <Stack>
                <Skeleton height='22px' w='full' isLoaded={avatarLoaded}>
                  <Text>#{doop.tokenId}</Text>
                </Skeleton>
                <Skeleton height='22px' isLoaded={avatarLoaded}>
                  <Text>{doop.value > 0 ? `${doop.value / 10e17} ETH` : 'none'}</Text>
                </Skeleton>
                <Skeleton height='22px' isLoaded={avatarLoaded}>
                  <Text>{doop.functionName === 'dooplicateItem'? 'DoopMarket':'Dooplicator'}</Text>
                </Skeleton>
                <Skeleton height='22px' isLoaded={avatarLoaded}>
                  <Text>{new Date(doop.timeStamp * 1000).toLocaleString()}</Text>
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
