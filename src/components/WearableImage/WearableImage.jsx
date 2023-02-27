import {
  Image,
  Skeleton,
  Text,
  Box
} from "@chakra-ui/react"
import { useState } from 'react'
import { palette } from "../../utils/constants"

function WearbleImage({item}) {
  const [loaded, setLoaded] = useState(false)

  function imageLoaded() {
    setLoaded(true)
  }

  return (
    <Box>
      <Skeleton rounded='xl' w='90px' h='90px' isLoaded={loaded}>
        <Image bg={palette.SKIN_700} w='90px' rounded='xl' src={item.image_uri} onLoad={setLoaded}></Image>
      </Skeleton>
      <Text textAlign="center">{item?.cost}</Text>
    </Box>
  )
}

export default WearbleImage
