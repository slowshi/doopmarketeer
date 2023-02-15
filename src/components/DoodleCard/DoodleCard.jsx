import {
  Stack,
  Card,
  CardBody,
  Image,
  Text,
  Heading,
  Button,
  CardFooter,
  Flex,
  Box,
  Spacer,
  Wrap,
  WrapItem,
  Center
} from "@chakra-ui/react"
import { useState, useEffect } from 'react'
import './DoodleCard.css'

function DoodleCard({doop}) {
  const [wearables, setWearables] = useState([]);
  const [image, setImage] = useState('');
  const testAssets = {
    "wearables": [
      {
        "wearable_id": "123",
        "ipfs_hash": "QmNgBvf4mSK1EbtAZfT1bc3w96HGgV7rz6LVHCEtUHvmo2",
        "name": "bandana",
        "trim": "stars",
        "set": "OG Wearables: Core",
        "hidden": false,
        "position": "head",
        "plurality": false,
        "ipfs_hash_svg": "QmccGUcziZc4NaV8YVFU6fFPvvXbztsZXRh21zMhVsQs9P",
        "image_uri": "https://d1zu9f2anwwksd.cloudfront.net/QmccGUcziZc4NaV8YVFU6fFPvvXbztsZXRh21zMhVsQs9P.svg"
      },
      {
        "wearable_id": "138",
        "ipfs_hash": "QmUriyDR6XYWwWwzgKyB3eAatcaea3Nsp8hgK2yDhp4Z4o",
        "name": "headband",
        "trim": "white",
        "set": "OG Wearables: Core",
        "hidden": false,
        "position": "head",
        "plurality": false,
        "ipfs_hash_svg": "QmbNHmtm8PxrU5YA33Z9teFdF9sPFCeLoiR6JcaoN64avG",
        "image_uri": "https://d1zu9f2anwwksd.cloudfront.net/QmbNHmtm8PxrU5YA33Z9teFdF9sPFCeLoiR6JcaoN64avG.svg"
      },
      {
        "wearable_id": "150",
        "ipfs_hash": "QmedtXUwqAS7obffCSsUiA5Wvif6Bm8X8gb7LVfEEzxhb7",
        "name": "sweater",
        "trim": "purple",
        "set": "OG Wearables: Core",
        "hidden": true,
        "position": "torso",
        "plurality": false,
        "ipfs_hash_svg": "QmaknaftP86RwTHSmMx35pyfVdVxA7GKnY4TKHpu8GYzEP",
        "image_uri": "https://d1zu9f2anwwksd.cloudfront.net/QmaknaftP86RwTHSmMx35pyfVdVxA7GKnY4TKHpu8GYzEP.svg"
      },
      {
        "wearable_id": "151",
        "ipfs_hash": "Qmd4u8g96SuvbqmnacnhAwtNoj46EtHAU1cSZY4zJPTF39",
        "name": "satchel",
        "trim": "beige",
        "set": "OG Wearables: Core",
        "hidden": true,
        "position": "torso",
        "plurality": false,
        "ipfs_hash_svg": "QmdAHcNXJLJnv8e4J7iiwNtgHkjGpf8qp94MKWNtWrjkvD",
        "image_uri": "https://d1zu9f2anwwksd.cloudfront.net/QmdAHcNXJLJnv8e4J7iiwNtgHkjGpf8qp94MKWNtWrjkvD.svg"
      },
      {
        "wearable_id": "193",
        "ipfs_hash": "QmdQ51QAmAnPfavyWCa9GoMKtVC83Dj6JZR2o8GaWEYt4R",
        "name": "blockchain pants",
        "trim": "",
        "set": "OG Wearables: Core",
        "hidden": true,
        "position": "legs",
        "plurality": true,
        "ipfs_hash_svg": "QmTmFcwMsukieUfBDgRhLrUkTPtaH44RYFoyAHGbSkMi2j",
        "image_uri": "https://d1zu9f2anwwksd.cloudfront.net/QmTmFcwMsukieUfBDgRhLrUkTPtaH44RYFoyAHGbSkMi2j.svg"
      },
      {
        "wearable_id": "196",
        "ipfs_hash": "Qmb6bXxcgAEuKT3ckwRBxnoq8cbqvbzzLhhxmBwKm1AZVE",
        "name": "crew socks",
        "trim": "sky blue",
        "set": "OG Wearables: Core",
        "hidden": true,
        "position": "feet",
        "plurality": true,
        "ipfs_hash_svg": "Qmdek95JZjVKrJvQsjtksLKc257zjM4BKNLvk4iVYznKYc",
        "image_uri": "https://d1zu9f2anwwksd.cloudfront.net/Qmdek95JZjVKrJvQsjtksLKc257zjM4BKNLvk4iVYznKYc.svg"
      },
      {
        "wearable_id": "236",
        "ipfs_hash": "QmP1eKqNvULZfLBTuUQREwyHuk9TzbwjW2AUiiaDa2y7tv",
        "name": "chunky boots",
        "trim": "yellow",
        "set": "OG Wearables: Core",
        "hidden": true,
        "position": "feet",
        "plurality": true,
        "ipfs_hash_svg": "QmSRCiyiatwWTEbFQA688o1pcSN7TA83JqWyNw67AR16fb",
        "image_uri": "https://d1zu9f2anwwksd.cloudfront.net/QmSRCiyiatwWTEbFQA688o1pcSN7TA83JqWyNw67AR16fb.svg"
      },
      {
        "wearable_id": "244",
        "ipfs_hash": "QmbXfWGoc1nm4S2ARR1eUhvushS974td5vra6BkHCfN6L9",
        "name": "beta pass",
        "trim": "",
        "set": "Doodlebot: Utility",
        "hidden": false,
        "position": "none",
        "plurality": false,
        "ipfs_hash_svg": "Qmdsq27zMFJiZiertMg5nAJp9mbS9sRKhDYo1kPgfFwhdM",
        "image_uri": "https://d1zu9f2anwwksd.cloudfront.net/Qmdsq27zMFJiZiertMg5nAJp9mbS9sRKhDYo1kPgfFwhdM.svg"
      }
    ]
  };
  const isError = false;

  useEffect(() => {
    async function fetchAssets() {
      const response = await fetch(`https://witty-clothes-bee.cyclic.app/assets/${doop.tokenId}`,  {mode:'cors'});
      const data = await response.json();
      setWearables(data.wearables);

      const params = {
        url: `https://alchemy.mypinata.cloud/ipfs/${data.image.substring(7)}`,
        w: 256,
        q: 75
      }
      setImage(`https://doopmarket.doodles.app/_next/image?${new URLSearchParams(params)}`);
    }
    fetchAssets();
  }, []);

  return (
  <Card>
    <CardBody>
      <Flex flexWrap='wrap' flexFlow='column'>
        <Flex>
          <Box>
            <Image mt='4' marginEnd='4' rounded='full' w='90px' src={image}></Image>
          </Box>
          <Box>
            <Stack>
              <Text>{doop.tokenId}</Text>
              <Text>{doop.value > 0 ? `${doop.value / 10e17} ETH` : 'none'}</Text>
              <Text>{doop.functionName === 'dooplicateItem'? 'DoopMarket':'Dooplicator'}</Text>
              <Text>{new Date(doop.timeStamp * 1000).toLocaleString()}</Text>
            </Stack>
          </Box>
        </Flex>
        <Flex mt='4' ms='2'>
          <Wrap spacing='20px'>
            {wearables.map((item, index)=>
            <WrapItem key={index}>
              <Image backgroundColor='#f2e7ea' w='90px' rounded='xl' src={item.image_uri}></Image>
            </WrapItem>
            )}
          </Wrap>
        </Flex>
      </Flex>
    </CardBody>
  </Card>
  )
}

export default DoodleCard
