import {
  Image,
  Skeleton,
  Text,
  Box
} from "@chakra-ui/react"
import { useState } from 'react'

function WearbleImage({item}) {
  const [loaded, setLoaded] = useState(false)

  function imageLoaded() {
    setLoaded(true)
  }

  return (
    <Box>
      <Skeleton rounded='xl' w='90px' h='90px' isLoaded={loaded}>
        <Image backgroundColor='#f2e7ea' w='90px' opacity={item.hidden ? '45%' : '100%'} rounded='xl' src={item.image_uri} onLoad={setLoaded}></Image>
      </Skeleton>
      <Text textAlign="center">{item?.cost}</Text>
    </Box>
  )
}

export default WearbleImage
