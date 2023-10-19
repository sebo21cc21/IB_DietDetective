import { Container, Heading, Text, Box, SimpleGrid } from '@chakra-ui/react'
import React from 'react'

export default function Dashboard() {

  const boxStyles ={
    p: "10px",
    bg: "purple.400",
    color: "black",
    m: "10px",
    textAlgin: "center",
    filter: 'blur(2px)',
    ':hover':{
        color: 'black',
        bg: 'blue.200'
    }
  }
  return (
    <Container as="section" maxWidth={"4x1"} py="10px">
          <Heading my="30px" p="10px">Chakra Ui Component</Heading>
          <Text marginLeft="30px"> lorem ipsum</Text>
          <Text ml='30px' color="blue.300" fontWeight="bold">Lorem ipsu</Text>

          <Box my="30px" p="20px" bg="orange">
              <Text color="black">This is a box</Text>
          </Box>
          <Box sx={boxStyles}>
              Hi there!

          </Box>
          <SimpleGrid spacing={10} minChildWidth="250px">
             <Box bg = "white" h="200px" border = "1px solid"></Box>
             <Box bg = "white" h="200px" border = "1px solid"></Box>
             <Box bg = "white" h="200px" border = "1px solid"></Box>
             <Box bg = "white" h="200px" border = "1px solid"></Box>

          </SimpleGrid>
    </Container>

    
    
  )
}
