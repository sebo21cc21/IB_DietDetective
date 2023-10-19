import React from 'react'
import { Box, Container, SimpleGrid, Text, Heading, IconButton, Flex } from '@chakra-ui/react'
import { FaPizzaSlice, FaHamburger, FaIceCream, FaInfoCircle, FaHotdog, FaApple, FaCookie} from 'react-icons/fa'

export default function Recipes() {
  const FirstBox = {
    bgGradient: "linear(to-r, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6))",
    h: "200px",
    color: "white",
    borderRadius: "lg",
    p: "20px",
    textAlign: "center"
  }

  const handleDetailsClick = (name, calories) => {
    // Handle the click event to navigate to the recipe details page
    console.log("Clicked:", name, calories);
    // Add your navigation logic here
  }

  return (
    <div className="App">
      <Heading color={"white"}>Na co masz ochotę?</Heading>
      <Container as="section1" maxWidth={"3x1"} py="10px">
        <SimpleGrid spacing={10} minChildWidth="250px">
          <Box sx={FirstBox}>
            <Flex justifyContent="center">
              <FaApple size={70} color="white" />
            </Flex>
            <Text fontSize="xl" fontWeight="bold">Jabłko</Text>
            <Text>20 kcal</Text>
            <IconButton
              aria-label="Details"
              icon={<FaInfoCircle />}
              onClick={() => handleDetailsClick("Jabłko", 800)}
              size="sm"
              colorScheme="whiteAlpha"
            />
          </Box>
          <Box sx={FirstBox}>
            <Flex justifyContent="center">
              <FaHotdog size={70} color="white" />
            </Flex>
            <Text fontSize="xl" fontWeight="bold">HotDog</Text>
            <Text>600 kcal</Text>
            <IconButton
              aria-label="Details"
              icon={<FaInfoCircle />}
              onClick={() => handleDetailsClick("HotDog", 600)}
              size="sm"
              colorScheme="whiteAlpha"
            />
          </Box>
          <Box sx={FirstBox}>
            <Flex justifyContent="center">
              <FaCookie size={70} color="white" />
            </Flex>
            <Text fontSize="xl" fontWeight="bold">Ciasteczko</Text>
            <Text>400 kcal</Text>
            <IconButton
              aria-label="Details"
              icon={<FaInfoCircle />}
              onClick={() => handleDetailsClick("Ciasteczko", 400)}
              size="sm"
              colorScheme="whiteAlpha"
            />
          </Box>
        </SimpleGrid>
      </Container>

      <Container as="section2" maxWidth={"3x1"} py="10px">
        <SimpleGrid spacing={10} minChildWidth="250px">
          <Box sx={FirstBox}>
            <Flex justifyContent="center">
              <FaPizzaSlice size={70} color="white" />
            </Flex>
            <Text fontSize="xl" fontWeight="bold">Pizza</Text>
            <Text>800 kcal</Text>
            <IconButton
              aria-label="Details"
              icon={<FaInfoCircle />}
              onClick={() => handleDetailsClick("Pizza", 800)}
              size="sm"
              colorScheme="whiteAlpha"
            />
          </Box>
          <Box sx={FirstBox}>
            <Flex justifyContent="center">
              <FaHamburger size={70} color="white" />
            </Flex>
            <Text fontSize="xl" fontWeight="bold">Hamburger</Text>
            <Text>600 kcal</Text>
            <IconButton
              aria-label="Details"
              icon={<FaInfoCircle />}
              onClick={() => handleDetailsClick("Hamburger", 600)}
              size="sm"
              colorScheme="whiteAlpha"
            />
          </Box>
          <Box sx={FirstBox}>
            <Flex justifyContent="center">
              <FaIceCream size={70} color="white" />
            </Flex>
            <Text fontSize="xl" fontWeight="bold">Lody</Text>
            <Text>400 kcal</Text>
            <IconButton
              aria-label="Details"
              icon={<FaInfoCircle />}
              onClick={() => handleDetailsClick("Lody", 400)}
              size="sm"
              colorScheme="whiteAlpha"
            />
          </Box>
        </SimpleGrid>
      </Container>
    </div>
  )
}
