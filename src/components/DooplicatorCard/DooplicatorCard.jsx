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
  Stat,
  StatLabel,
  StatNumber,
  SkeletonCircle,
} from "@chakra-ui/react"
import { useState, useEffect } from 'react'
import WearbleImage from "../WearableImage/WearableImage"
import {cacheFetch} from '../../utils/cacheFetch'
import {useSelector, useDispatch, shallowEqual} from "react-redux"
import { DOOPLICATOR_URL, IPFS_GATEWAY } from '../../utils/constants'

function DooplicatorCard({tokenId}) {
  const dispatch = useDispatch()
  const loading = useSelector((state)=>state.app.searchLoading)
  const [avatarLoaded, setAvatarLoaded] = useState(false)
  const image = useSelector((state)=>{
    const data = state.app.dooplicatorAssets[tokenId]
    if(typeof data === 'undefined') return ''
    return `${IPFS_GATEWAY}/${data.image.substring(7)}`
  }, shallowEqual)

  const attributes = useSelector((state)=> {
    const data = state.app.dooplicatorAssets[tokenId]
    if(typeof data === 'undefined') return []
    return data.attributes.reduce((acc, item)=>{
      return {
        ...acc,
        [item.trait_type]: item.value
      }
    },{});
  })
  const isError = false

  function imageLoaded() {
    setAvatarLoaded(true)
  }

  async function fetchAssets() {
    setAvatarLoaded(false);
    const data = await cacheFetch.fetch(
      `${DOOPLICATOR_URL}/${tokenId}`,
      {mode:'cors'}
    )
    dispatch({
      type: 'addDooplicatorAssets',
      payload: {
        tokenId,
        data
      }
    })
    dispatch({
      type: 'setSearchLoading',
      payload: false
    })
  }

  useEffect(() => {
    fetchAssets()
  }, [tokenId, loading])

  return (
  <Card>
    <CardBody>
      <Flex flexWrap='wrap' flexFlow='column'>
        <Flex>
          <Box me='6'>
            <SkeletonCircle w='90px' h='90px' isLoaded={avatarLoaded}>
              <Image rounded='full' w='90px' src={image} onLoad={imageLoaded}></Image>
            </SkeletonCircle>
            <Skeleton height='22px' w='full' isLoaded={avatarLoaded}>
              <Center>
                <Text>#{tokenId}</Text>
              </Center>
            </Skeleton>
          </Box>
          <Box>
            <Skeleton isLoaded={avatarLoaded}>
              <Text m='2'>{attributes['Rarity']}</Text>
            </Skeleton>
            <Box display='flex' flexDirection='row' flexWrap='wrap'>
              <Skeleton isLoaded={avatarLoaded}>
                <Stat m='2'>
                  <StatLabel>OG Wearables charge</StatLabel>
                  <StatNumber>{attributes['OG Wearables charge']}</StatNumber>
                </Stat>
              </Skeleton>
              <Skeleton isLoaded={avatarLoaded}>
                <Stat m='2'>
                  <StatLabel>Space Doodles charge</StatLabel>
                  <StatNumber>{attributes['Space Doodles charge']}</StatNumber>
                </Stat>
              </Skeleton>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </CardBody>
  </Card>
  )
}

export default DooplicatorCard