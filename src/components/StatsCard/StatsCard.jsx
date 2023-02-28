import { Card, CardBody, SimpleGrid, Box, Stat, StatLabel, StatNumber } from '@chakra-ui/react'
import { useSelector, shallowEqual } from 'react-redux'
import { currencyMap } from '../../utils/constants'
import DoodleSpinner from '../DoodleSpinner/DoodleSpinner'

function StatsCard({ loading }) {
  const getRarity = (state, dooplicatorId) => {
    let multiple = null
    if (dooplicatorId !== '') {
      const doopData = state.app.dooplicatorAssets[dooplicatorId]
      if (typeof doopData !== 'undefined') {
        const trait = doopData.attributes.find((item) => item.trait_type === 'Rarity')
        if (trait.value === 'Rare') {
          multiple = 3
        } else if (trait.value === 'Common') {
          multiple = 2
        } else if (trait.value === 'Very Common') {
          multiple = 1
        }
      }
    }
    return multiple
  }

  const allAssetsSelector = (state) => {
    const data = state.app.dooplications
    const assets = state.app.assets
    const allAssets = data.map((doop) => {
      if (typeof assets[doop.tokenId] === 'undefined') return { doop: {}, asset: {} }
      return {
        doop,
        asset: assets[doop.tokenId],
      }
    })
    return allAssets
  }

  const totalWearablesSelector = (state) => {
    const allAssets = allAssetsSelector(state)
    const totalWearables = allAssets.reduce((acc, item) => {
      let multiple = 1
      if (typeof item.doop.dooplicatorId !== 'undefined') {
        multiple = getRarity(state, item.doop.dooplicatorId)
      }
      if (typeof item.asset.wearables !== 'undefined') {
        acc += item.asset.wearables.length * multiple
      }
      return acc
    }, 0)
    return totalWearables
  }
  const totalWearablesValueSelector = (state) => {
    const allAssets = allAssetsSelector(state)
    const ethPrice = state.app.ethPrice

    const totalValue = allAssets.reduce((acc, item) => {
      let multiple = 1
      if (typeof item.doop.dooplicatorId !== 'undefined') {
        multiple = getRarity(state, item.doop.dooplicatorId)
      }
      if (typeof item.asset.wearables !== 'undefined') {
        const assetValue = item.asset.costs.reduce((acc, cost) => {
          if (cost === null) return acc
          return acc + cost.activeListing.price
        }, 0)
        acc += assetValue * multiple
      }
      return acc
    }, 0)
    return totalValue / ethPrice
  }
  const totalCostSelector = (state) => {
    return state.app.dooplications.reduce((acc, item) => acc + Number(item.value), 0)
  }
  const totalDoops = useSelector((state) => state.app.dooplications.length, shallowEqual)
  const totalCost = useSelector(totalCostSelector, shallowEqual)
  const costPerWearables = useSelector((state) => {
    const doopMarketWearables = allAssetsSelector(state)
      .filter((item) => item.doop.functionName === 'dooplicateItem')
      .reduce((acc, item) => {
        let multiple = 1
        if (typeof item.doop.dooplicatorId !== 'undefined') {
          multiple = getRarity(state, item.doop.dooplicatorId)
        }
        if (typeof item.asset.wearables !== 'undefined') {
          acc += item.asset.wearables.length * multiple
        }
        return acc
      }, 0)
    const totalCost = totalCostSelector(state)
    return totalCost / doopMarketWearables
  })
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
                <StatNumber>{`${Math.round((costPerWearables / 10e17) * 10000) / 10000} Ξ`}</StatNumber>
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
