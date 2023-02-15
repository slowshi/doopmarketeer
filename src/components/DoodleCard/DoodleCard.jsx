import {
  Stack,
  Card,
  CardBody,
  Image,
  Text,
  Heading,
  Button,
  CardFooter,
  Flex,
  Box,
  Spacer,
  Wrap,
  WrapItem,
  Center,
  Skeleton,
  SkeletonCircle
} from "@chakra-ui/react"
import { useState, useEffect } from 'react'
import './DoodleCard.css'
import WearbleImage from "../WearableImage/WearableImage"
import { useInView } from "react-intersection-observer"

function DoodleCard({doop}) {
  const [wearables, setWearables] = useState([])
  const [image, setImage] = useState('')
  const [avatarLoaded, setAvatarLoaded] = useState(false)
  const { ref, inView } = useInView({
    triggerOnce: true,
    fallbackInView: true,
  })

  const isError = false
  function imageLoaded() {
    setAvatarLoaded(true)
  }

  async function fetchAssets() {
    const response = await fetch(`https://witty-clothes-bee.cyclic.app/assets/${doop.tokenId}`,  {mode:'cors'})
    const data = await response.json()
    setWearables(data.wearables)

    const params = {
      url: `https://alchemy.mypinata.cloud/ipfs/${data.image.substring(7)}`,
      w: 256,
      q: 75
    }
    setImage(`https://doopmarket.doodles.app/_next/image?${new URLSearchParams(params)}`)
  }

  useEffect(() => {
    if (inView) {
      fetchAssets()
    }
  }, [inView])

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
                  <Text>{doop.tokenId}</Text>
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
