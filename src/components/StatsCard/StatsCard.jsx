import { Card, CardBody, SimpleGrid, Box, Stat, StatLabel, StatNumber } from '@chakra-ui/react'
import { useSelector, shallowEqual } from 'react-redux'
import { currencyMap } from '../../utils/constants'
import DoodleSpinner from '../DoodleSpinner/DoodleSpinner'

function StatsCard({ loading }) {
  const allAssetsSelector = (state) => {
    const data = state.app.dooplications
    const assets = state.app.assets
    const allAssets = data.map((doop) => {
      if (typeof assets[doop.tokenId] === 'undefined') return {}
      return assets[doop.tokenId]
    })
    return allAssets
  }

  const totalWearablesSelector = (state) => {
    const allAssets = allAssetsSelector(state)
    const totalWearables = allAssets.reduce((acc, item) => {
      if (typeof item.wearables !== 'undefined') {
        acc += item.wearables.length
      }
      return acc
    }, 0)
    return totalWearables
  }
  const totalWearablesValueSelector = (state) => {
    const allAssets = allAssetsSelector(state)
    const ethPrice = state.app.ethPrice
    const totalValue = allAssets.reduce((acc, item) => {
      if (typeof item.wearables !== 'undefined') {
        const assetValue = item.costs.reduce((acc, cost) => {
          if (cost === null) return acc
          return acc + cost.activeListing.price
        }, 0)
        acc += assetValue
      }
      return acc
    }, 0)
    return totalValue / ethPrice
  }
  const totalDoops = useSelector((state) => state.app.dooplications.length, shallowEqual)
  const totalCost = useSelector(
    (state) => state.app.dooplications.reduce((acc, item) => acc + Number(item.value), 0),
    shallowEqual,
  )
  const totalWearables = useSelector(totalWearablesSelector, shallowEqual)
  const totalWearableValue = useSelector(totalWearablesValueSelector, shallowEqual)
  return (
    <Card w="full">
      <CardBody>
        {loading ? (
          <DoodleSpinner />
        ) : (
          <SimpleGrid columns={[2, null, 3]} spacing="2">
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
                <StatNumber>{`${Math.round((totalCost / totalWearables / 10e17) * 10000) / 10000} Ξ`}</StatNumber>
              </Stat>
            </Box>
            <Box>
              <Stat>
                <StatLabel>Wearables Value</StatLabel>
                <StatNumber>
                  {Number(totalWearableValue).toLocaleString(undefined, currencyMap.eth.toLocaleString)} Ξ
                </StatNumber>
              </Stat>
            </Box>
          </SimpleGrid>
        )}
      </CardBody>
    </Card>
  )
}
StatsCard.defaultProps = {
  loading: true,
}
export default StatsCard
