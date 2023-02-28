import {
  Grid,
  Link,
  IconButton,
  GridItem,
  Heading,
  ButtonGroup,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Stack,
  Container,
  useBreakpointValue,
} from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { marketTabs } from '../../utils/constants'
import { Link as ReachLink } from '@reach/router'
import { FaGithub, FaTwitter, FaBars } from 'react-icons/fa'

function WearbleImage() {
  const activeMarketTab = useSelector((state) => state.app.activeMarketTab)
  const isMDScreen = useBreakpointValue({ base: false, md: true }, { fallback: 'md' })

  return (
    <Container maxW="container.lg" display="flex" flexDirection="column">
      <Grid mt="2" templateColumns="repeat(3, 1fr)" gap={2} alignItems="center" w="full" mb="2">
        <GridItem colSpan={1}>
          {isMDScreen ? (
            <Link href="https://twitter.com/slowshi" isExternal>
              <IconButton colorScheme="white" aria-label="Twitter" icon={<FaTwitter />} size="md" />
            </Link>
          ) : (
            <Menu>
              {({ isOpen }) => (
                <>
                  <MenuButton
                    colorScheme={isOpen ? 'blackAlpha' : 'whiteAlpha'}
                    as={IconButton}
                    aria-label="Options"
                    icon={<FaBars />}
                  />
                  <MenuList>
                    <MenuItem as={ReachLink} to="/">
                      Feed
                    </MenuItem>
                    <MenuItem as={ReachLink} to="/doopmarket">
                      DoopMarket
                    </MenuItem>
                    <MenuItem as={ReachLink} to="/search">
                      Search
                    </MenuItem>
                    <MenuItem as={ReachLink} to="/undooped">
                      Undooped
                    </MenuItem>
                    <MenuItem as={ReachLink} to="/leaderboard">
                      Leaderboard
                    </MenuItem>
                    <MenuDivider />
                    <Stack direction="row" px="12px">
                      <Link href="https://twitter.com/slowshi" isExternal>
                        <IconButton
                          colorScheme="white"
                          color="black"
                          aria-label="Twitter"
                          icon={<FaTwitter />}
                          size="md"
                        />
                      </Link>
                      <Link href="https://github.com/slowshi/doopmarketeer" isExternal>
                        <IconButton
                          colorScheme="white"
                          color="black"
                          aria-label="Github"
                          icon={<FaGithub />}
                          size="md"
                        />
                      </Link>
                    </Stack>
                  </MenuList>
                </>
              )}
            </Menu>
          )}
        </GridItem>
        <GridItem colSpan={1} justifySelf="center">
          <Link href="/" color="white" _hover={{ textDecoration: 'none' }}>
            <Heading color="white" fontFamily="Chalkboard SE,sans-serif">
              Doopmarketeer
            </Heading>
          </Link>
        </GridItem>
        <GridItem colSpan={1} justifySelf="end">
          {isMDScreen ? (
            <Link href="https://github.com/slowshi/doopmarketeer" isExternal>
              <IconButton colorScheme="white" aria-label="Github" icon={<FaGithub />} size="md" />
            </Link>
          ) : (
            ''
          )}
        </GridItem>
      </Grid>
      {isMDScreen ? (
        <ButtonGroup gap="2" mb="2" justifyContent="center">
          <Button colorScheme={activeMarketTab === marketTabs.FEED ? 'blackAlpha' : 'whiteAlpha'} as={ReachLink} to="/">
            Feed
          </Button>
          <Button
            colorScheme={activeMarketTab === marketTabs.DOOPMARKET ? 'blackAlpha' : 'whiteAlpha'}
            as={ReachLink}
            to="/doopmarket"
          >
            DoopMarket
          </Button>
          <Button
            colorScheme={activeMarketTab === marketTabs.SEARCH ? 'blackAlpha' : 'whiteAlpha'}
            as={ReachLink}
            to="/search"
          >
            Search
          </Button>
          <Button
            colorScheme={activeMarketTab === marketTabs.UNDOOPED ? 'blackAlpha' : 'whiteAlpha'}
            as={ReachLink}
            to="/undooped"
          >
            Undooped
          </Button>
          <Button
            colorScheme={activeMarketTab === marketTabs.LEADERBOARD ? 'blackAlpha' : 'whiteAlpha'}
            as={ReachLink}
            to="/leaderboard"
          >
            Leaderboard
          </Button>
        </ButtonGroup>
      ) : (
        ''
      )}
    </Container>
  )
}

export default WearbleImage
