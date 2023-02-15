import {
  Image,
  Skeleton,
} from "@chakra-ui/react"
import { useState } from 'react'

function WearbleImage({item}) {
  const [loaded, setLoaded] = useState(false)

  function imageLoaded() {
    setLoaded(true)
  }

  return (
    <Skeleton rounded='xl' w='90px' h='90px' isLoaded={loaded}>
      <Image backgroundColor='#f2e7ea' w='90px' rounded='xl' src={item.image_uri} onLoad={setLoaded}></Image>
    </Skeleton>
  )
}

export default WearbleImage
