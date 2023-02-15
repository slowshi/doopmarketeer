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
  Text
} from "@chakra-ui/react"
import { useState, useEffect } from 'react'
import DoodleCard from './components/DoodleCard/DoodleCard'
import './App.css'

function App() {
  const [address, setInput] = useState('')
  const [dooplications, setDooplications] = useState([])
  useEffect(() => {
    const searchParams = (new URL(document.location)).searchParams;
    if(searchParams.has('address')) {
      const address = searchParams.get('address');
      setInput(address)
      fetchDoops(address)
    }
  }, []);

  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  const handleSearchAddress = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDooplications([])
    const searchParams = new URLSearchParams({
      address
    });
    const url = `?${searchParams}`;
    window.history.replaceState(null, null, url);
    fetchDoops(address)
  }

  const fetchDoops = async (address) => {
    const  res = await fetch(`https://witty-clothes-bee.cyclic.app/doops?address=${address}`, {mode:'cors'})
    const resJSON = await res.json()
    setDooplications(resJSON)
  }

  const isError = false
  return (
    <Container height='full' maxW='container.lg' centerContent>
      <Heading color='white' fontFamily='Chalkboard SE,sans-serif'>Doopmarketeer</Heading>
      <Text color='white' mb='4'>A tool to view Dooplicator and DoopMarket history. This is not affiliated with Doodles. Enter an ethereum address to view history.</Text>
      <form className="w-100" onSubmit={handleSearchAddress}>
        <FormControl isInvalid={isError} mb="2">
          <FormLabel color="white">Address</FormLabel>
          <Input id="addressInput" type="text" value={address} name="address" onChange={handleInputChange} />
          {isError ? (
            <FormErrorMessage>Ethereum Address required.</FormErrorMessage>
          ) : ('')}
        </FormControl>
      </form>
      <Stack spacing='4' mb='4' w='full' className="content">
        {dooplications.map((doop, index)=>
          <DoodleCard key={index} doop={doop}></DoodleCard>
        )}
      </Stack>
    </Container>
  )
}

export default App
