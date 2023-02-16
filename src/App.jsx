import {
  Container,
  Box,
  Heading,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Stack,
  SimpleGrid,
  Text,
  Spinner,
  Center,
  Grid,
  GridItem,
  IconButton,
  Link,
  InputRightElement,
  InputGroup,
  Button,
  ButtonGroup,
  useBoolean,
  Card,
  CardBody,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Wrap,
  WrapItem
} from "@chakra-ui/react"
import { useState, useEffect } from 'react'
import {FaGithub, FaTwitter, FaSearch} from 'react-icons/fa'
import DoodleCard from './components/DoodleCard/DoodleCard'
import './App.css'
import {useSelector, useDispatch} from "react-redux";
import {cacheFetch} from './utils/cacheFetch';

function App() {
  const dispatch = useDispatch();

  const [address, setInput] = useState('')
  const [searchParamsAddress, setSearchParamsAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [flag, setFlag] = useBoolean()

  const dooplications = useSelector((state)=>state.app.dooplications)

  const stats = useSelector((state)=>{
    //probably fix this later
    const stats = [
      {
        label: 'Total Doops',
        text: 0
      },
      {
        label: 'Total Wearables',
        text: 0
      },
      {
        label: 'Total Cost',
        text: `0 ETH`,
        helpText: `0 ETH PER`
      },
    ];
    const data = state.app.dooplications;

    const totalCost = data.reduce((acc, item)=>{
      acc += Number(item.value);
      return acc
    }, 0)


    const allAssets = data.map((doop)=>{
      if(typeof state.app.assets[doop.tokenId] === 'undefined') return {}
      return state.app.assets[doop.tokenId];
    })

    const totalWearables = allAssets.reduce((acc, item)=>{
      if(typeof item.wearables !== 'undefined') {
        acc += item.wearables.length
      }
      return acc
    }, 0)
    const totalCostInETH = totalCost / 10e17;
    const costPerInETH = Math.round(((totalCost/totalWearables) / 10e17) * 10000) / 10000;

    return [
      {
        label: 'Total Doops',
        text: data.length
      },
      {
        label: 'Total Wearables',
        text: totalWearables
      },
      {
        label: 'Total Cost',
        text: `${totalCostInETH} ETH`,
        helpText: `${costPerInETH} ETH PER`
      },
    ]
  })


  useEffect(() => {
    loadAddress()
    function loadAddress() {
      const searchParams = (new URL(document.location)).searchParams
      if(searchParams.has('address')) {
        const address = searchParams.get('address')
        setLoading(true)
        setInput(address)
        setSearchParamsAddress(address)
        fetchDoops(address)
      }
    }

    function handlePopstate() {
      loadAddress()
    }

    window.addEventListener("popstate", handlePopstate);

    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };


  }, [])

  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  const handleSearchAddress = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    if(address === '') return
    dispatch({
      type: 'setDooplications',
      payload: []
    });
    setLoading(true)
    const searchParams = new URLSearchParams({
      address
    })
    const url = `?${searchParams}`
    if(searchParamsAddress === address) {
      window.history.replaceState(null, null, url)
    } else {
      window.history.pushState(null, null, url)
    }
    fetchDoops(address)
  }

  const fetchDoops = async (address) => {
    const data = await cacheFetch.fetch(
      `https://doopmarketeer-api.vercel.app/doops?address=${address}`,
      {mode:'cors'}
    )
    dispatch({
      type: 'setDooplications',
      payload: data
    });
    const totalCost = data.reduce((acc, item)=>{
      const value = typeof acc === 'undefined' ? 0 : Number(acc)
      acc = value + Number(item.value)
      return acc
    }, 0)
    setLoading(false)
  }
  const navGithub = () => {

  }
  const isError = false
  return (
    <Container height='full' maxW='container.lg' centerContent>
      <Grid mt='2' templateColumns="repeat(3, 1fr)" gap={2} alignItems="center"  w='full'>
        <GridItem colSpan={1}>
          <Link href='https://twitter.com/slowshi' isExternal>
            <IconButton
              colorScheme='white'
              aria-label="Twitter"
              icon={<FaTwitter/>}
              size="md"
            />
          </Link>
        </GridItem>
        <GridItem colSpan={1} justifySelf="center">
          <Link href='/' color='white' _hover={{textDecoration: 'none'}}>
            <Heading color='white' fontFamily='Chalkboard SE,sans-serif'>Doopmarketeer</Heading>
          </Link>
        </GridItem>
        <GridItem colSpan={1} justifySelf="end">
          <Link href='https://github.com/slowshi/doopmarketeer' isExternal>
            <IconButton
              colorScheme='white'
              aria-label="Github"
              icon={<FaGithub/>}
              size="md"
            />
          </Link>
        </GridItem>
      </Grid>
      <form className="w-100" onSubmit={handleSearchAddress}>
        <FormControl isInvalid={isError} mb="2">
          <FormLabel color="white">Address</FormLabel>
          <InputGroup>
            <Input backgroundColor="white" type="text" value={address} name="address" onChange={handleInputChange} />
            <InputRightElement>
              <IconButton
                color='white'
                backgroundColor='#f2e7ea'
                aria-label="Twitter"
                icon={<FaSearch/>}
                size="md"
                onClick={handleSearchAddress}
              />
            </InputRightElement>
          </InputGroup>
          {isError ? (
            <FormErrorMessage>Ethereum Address required.</FormErrorMessage>
          ) : ('')}
        </FormControl>
      </form>
      {dooplications.length > 0 && loading === false ?
        <ButtonGroup gap='4' mb='2'>
          <Button colorScheme={flag ? 'whiteAlpha' : 'blackAlpha'} onClick={setFlag.off}>History</Button>
          <Button colorScheme={!flag ? 'whiteAlpha' : 'blackAlpha'} onClick={setFlag.on}>Stats</Button>
        </ButtonGroup> : ''}
        {
          loading === true ?
            <Center mt='4'>
              <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.300'
                color='white'
                size='xl'
              />
            </Center>
          : dooplications.length === 0 ?
            <Text color='white' mb='4' fontSize='smaller'>A tool to view Dooplicator and DoopMarket history. This is not affiliated with Doodles. Enter an ethereum address to view history.</Text>
            :
            !flag ?
            <Stack w='full' spacing='4' overflowY="auto" mb='4'>
              {dooplications.map((doop, index)=>
                <DoodleCard key={doop.tokenId} doop={doop}></DoodleCard>
              )}
            </Stack>
            :
            <Card w='full' mb='4'>
              <CardBody>
                <SimpleGrid columns={[2, null, 3]} spacing='2'>
                  {stats.map((stat, index)=>
                  <Box key={index}>
                    <Stat>
                      <StatLabel>{stat.label}</StatLabel>
                      <StatNumber>{stat.text}</StatNumber>
                      {stat.helpText ?
                      <StatHelpText>{stat.helpText}</StatHelpText>
                      : ''}
                    </Stat>
                  </Box>)}
                </SimpleGrid>
              </CardBody>
            </Card>
        }
    </Container>
  )
}

export default App