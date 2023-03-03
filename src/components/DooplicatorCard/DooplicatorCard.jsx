import {
  Card,
  CardBody,
  Image,
  Text,
  Flex,
  Box,
  Skeleton,
  Center,
  Stat,
  StatLabel,
  StatNumber,
  SkeletonCircle,
  Link,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { cacheFetch } from '../../utils/cacheFetch'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { currencyMap, DOOPLICATOR_URL, IPFS_GATEWAY, palette } from '../../utils/constants'

function DooplicatorCard({ tokenId, price, url }) {
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.app.searchLoading)
  const [avatarLoaded, setAvatarLoaded] = useState(false)
  const image = useSelector((state) => {
    const data = state.app.dooplicatorAssets[tokenId]
    if (typeof data === 'undefined') return ''
    return `${IPFS_GATEWAY}/${data.image.substring(7)}`
  }, shallowEqual)

  const attributes = useSelector((state) => {
    const data = state.app.dooplicatorAssets[tokenId]
    if (typeof data === 'undefined') return []
    return data.attributes.reduce((acc, item) => {
      return {
        ...acc,
        [item.trait_type]: item.value,
      }
    }, {})
  })

  function imageLoaded() {
    setAvatarLoaded(true)
  }

  async function fetchAssets() {
    setAvatarLoaded(false)
    const data = await cacheFetch.fetch(`${DOOPLICATOR_URL}/${tokenId}`, { mode: 'cors' }, true)
    dispatch({
      type: 'addDooplicatorAssets',
      payload: {
        tokenId,
        data,
      },
    })
    dispatch({
      type: 'setSearchLoading',
      payload: false,
    })
  }

  useEffect(() => {
    fetchAssets()
  }, [tokenId, loading])

  return (
    <Card>
      <CardBody>
        <Flex flexWrap="wrap" flexFlow="column">
          <Flex>
            <Box me="6">
              <SkeletonCircle w="90px" h="90px" isLoaded={avatarLoaded}>
                <Image rounded="full" w="90px" src={image} onLoad={imageLoaded}></Image>
              </SkeletonCircle>
              <Skeleton height="22px" w="full" isLoaded={avatarLoaded}>
                <Center>
                  <Text>#{tokenId}</Text>
                </Center>
              </Skeleton>
            </Box>
            <Box>
              <Skeleton isLoaded={avatarLoaded}>
                <Text m="2">{attributes['Rarity']}</Text>
              </Skeleton>
              {typeof price !== 'undefined' ? (
                <Skeleton isLoaded={avatarLoaded}>
                  <Text m="2">
                    Cost {Number(price / 10e17).toLocaleString(undefined, currencyMap.eth.toLocaleString)} Ξ
                  </Text>
                </Skeleton>
              ) : (
                ''
              )}
              {typeof url !== 'undefined' ? (
                <Skeleton isLoaded={avatarLoaded}>
                  <Link m="2" fontWeight="bold" color={palette.ORANGE_100} href={url} isExternal>
                    Link
                  </Link>
                </Skeleton>
              ) : (
                ''
              )}
              <Box display="flex" flexDirection="row" flexWrap="wrap">
                <Skeleton isLoaded={avatarLoaded}>
                  <Stat m="2">
                    <StatLabel>OG Wearables charge</StatLabel>
                    <StatNumber>{attributes['OG Wearables charge']}</StatNumber>
                  </Stat>
                </Skeleton>
                <Skeleton isLoaded={avatarLoaded}>
                  <Stat m="2">
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
DooplicatorCard.defaultProps = {
  tokenId: '',
  url: '',
}
export default DooplicatorCard
