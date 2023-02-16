import {
  Image,
  Skeleton,
  Card,
  CardBody,
  SimpleGrid,
  Box,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from "@chakra-ui/react"
import { useState } from 'react'
import {useSelector, shallowEqual} from "react-redux"

function StatsCard({item}) {
  const [loaded, setLoaded] = useState(false)

  const allAssetsSelector = (state)=> {
    const data = state.app.dooplications
    const assets = state.app.assets
    const allAssets = data.map((doop)=>{
      if(typeof assets[doop.tokenId] === 'undefined') return {}
      return assets[doop.tokenId]
    })
    return allAssets
  }

  const totalWearablesSelector = (state)=> {
    const allAssets = allAssetsSelector(state)
    const data = state.app.dooplications
    const assets = state.app.assets
    const totalWearables = allAssets.reduce((acc, item)=>{
      if(typeof item.wearables !== 'undefined') {
        acc += item.wearables.length
      }
      return acc
    }, 0)
    return totalWearables
  }

  const totalDoops = useSelector((state)=>state.app.dooplications.length, shallowEqual)
  const totalCost = useSelector((state)=>
  state.app.dooplications.reduce((acc, item)=>acc + Number(item.value), 0), shallowEqual)
  const allAssets = useSelector(allAssetsSelector, shallowEqual)
  const totalWearables = useSelector(totalWearablesSelector, shallowEqual)

  return (
    <Card w='full' mb='4'>
      <CardBody>
        <SimpleGrid columns={[2, null, 3]} spacing='2'>
          <Box>
            <Stat>
              <StatLabel>Total Doops</StatLabel>
              <StatNumber>{totalDoops}</StatNumber>
            </Stat>
          </Box>
          <Box>
            <Stat>
              <StatLabel>Total Wearables</StatLabel>
              <StatNumber>{totalWearables}</StatNumber>
            </Stat>
          </Box>
          <Box>
            <Stat>
              <StatLabel>Total Spent</StatLabel>
              <StatNumber>{`${totalCost / 10e17} Ξ`}</StatNumber>
            </Stat>
          </Box>
          <Box>
            <Stat>
              <StatLabel>Cost Per Wearable</StatLabel>
              <StatNumber>{
                `${Math.round(((totalCost/totalWearables) / 10e17) * 10000) / 10000} Ξ`
              }</StatNumber>
            </Stat>
          </Box>
        </SimpleGrid>
      </CardBody>
    </Card>
  )
}

export default StatsCard
