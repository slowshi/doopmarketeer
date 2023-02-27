import {
  FormControl,
  InputGroup,
  Input,
  InputLeftElement,
  InputRightElement,
  IconButton,
  FormErrorMessage,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { FaSearch, FaChevronDown } from 'react-icons/fa'
import { searchTypes, searchColors } from '../../utils/constants'

function SearchBar({ value, type, onSubmit }) {
  const [input, setInput] = useState('')
  const [searchType, setSearchType] = useState(searchTypes.ADDRESS)
  useEffect(() => {
    setInput(value)
    setSearchType(type)
  }, [type, value])

  const handleSearchAddress = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (input === '') return
    onSubmit({ value: input, type: searchType })
  }
  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  const handleMenuSelect = (type) => {
    setSearchType(type)
  }

  const isError = false

  return (
    <form className="w-100" onSubmit={handleSearchAddress}>
      <FormControl isInvalid={isError} mb="2">
        <InputGroup>
          <InputLeftElement>
            <Menu>
              {({ isOpen }) => (
                <>
                  <MenuButton
                    as={IconButton}
                    borderEndRadius="0"
                    color="white"
                    backgroundColor={searchColors[searchType].dark}
                    _active={isOpen ? { bg: searchColors[searchType].light } : { bg: searchColors[searchType].dark }}
                    _hover={isOpen ? { bg: searchColors[searchType].dark } : { bg: searchColors[searchType].light }}
                    icon={<FaChevronDown />}
                  />
                  <MenuList>
                    <MenuItem onClick={() => handleMenuSelect(searchTypes.ADDRESS)}>Ethereum Address</MenuItem>
                    <MenuItem onClick={() => handleMenuSelect(searchTypes.DOODLE)}>Doodle ID</MenuItem>
                    <MenuItem onClick={() => handleMenuSelect(searchTypes.DOOPLICATOR)}>Dooplicator ID</MenuItem>
                    <MenuItem onClick={() => handleMenuSelect(searchTypes.GENESIS_BOX)} isDisabled>
                      Genesis Box ID
                    </MenuItem>
                  </MenuList>
                </>
              )}
            </Menu>
          </InputLeftElement>
          <Input
            borderColor={searchColors[searchType].dark}
            focusBorderColor={searchColors[searchType].dark}
            _hover={{ borderColor: searchColors[searchType].light }}
            borderWidth="3px"
            backgroundColor="white"
            type="text"
            value={input}
            name={searchType}
            onChange={handleInputChange}
            placeholder={
              {
                [searchTypes.ADDRESS]: 'Ethereum Address',
                [searchTypes.DOODLE]: 'Doodle ID',
                [searchTypes.DOOPLICATOR]: 'Dooplicator ID',
                [searchTypes.GENESIS_BOX]: 'Genesis Box',
              }[searchType]
            }
          />
          <InputRightElement>
            <IconButton
              color="white"
              borderStartRadius="0"
              _hover={{ bg: searchColors[searchType].light }}
              backgroundColor={searchColors[searchType].dark}
              aria-label="Search"
              icon={<FaSearch />}
              size="md"
              onClick={handleSearchAddress}
            />
          </InputRightElement>
        </InputGroup>
        {isError ? <FormErrorMessage>Ethereum Address required.</FormErrorMessage> : ''}
      </FormControl>
    </form>
  )
}
SearchBar.defaultProps = {
  value: '',
  type: searchTypes.ADDRESS,
  onSubmit: () => {},
}

export default SearchBar
