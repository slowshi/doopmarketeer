import {
  Center,
  Spinner,
} from "@chakra-ui/react"
import { useState, useEffect } from 'react'
import { palette } from "../../utils/constants"

function DoodleSpinner() {
  const [color, setColor] = useState(palette.BLUE_100)
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const colors = Object.values(palette).slice(0,12).sort(()=>{
      return Math.random() - 0.5;
    })
    let index = 0;
    const interval = setInterval(() => {
        setColor(colors[index]);
        index += 1
      if(index === colors.length) {
        index = 0
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [])
  return (
    <Center>
      <Spinner
        thickness='4px'
        speed='0.5s'
        emptyColor='white'
        color={color}
        size='xl'
      />
    </Center>
  )
}

export default DoodleSpinner;