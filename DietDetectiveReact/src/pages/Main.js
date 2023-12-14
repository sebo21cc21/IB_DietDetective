import '../css/App.css';
import { Box, Heading, List, ListItem, Flex, Text, Image } from '@chakra-ui/react';
import React from 'react';

export default function Main() {
  return (
      <div className="App">
        <Box display="flex" justifyContent="center" align="center" height="80vh" ml ={{ base: '16', md: '0' }}>
          <Flex alignItems="center" width="40%" justifyContent="center">
            <List>
              <ListItem color={"green.400"}>
                <Heading as="h1" size="lg" >
                  Głodni?
                </Heading>
              </ListItem>
              <ListItem color={"white"}>
                <Heading as="h1" size="lg">
                  Z nami zjecie zdrowiej!
                </Heading>
              </ListItem>
              <ListItem color={"white"}>
                <Text display={{base: "none", md: "block"}}  fontSize={{ base: "1vh", md: "1.5vh", lg: "1.5vh", xl: "2vh" }} maxW={{ lg: "80%", xl: "80%" }}>
                  DietDetective to innowacyjna aplikacja dietetyczna, będzie Twoim niezastąpionym narzędziem w drodze do
                  osiągnięcia sukcesu. Dzięki jej funkcjom będziesz śledzić swoje spożycie kalorii oraz składników
                  odżywczych, otrzymywać spersonalizowane porady dietetyczne i przepisy
                </Text>
              </ListItem>
            </List>
            <Image
                boxSize={{base: '50vh', md: '75vh', xl: '90vh'}}
                src="img/circle.png"
                alt="Circle"
                position={"absolute"}
                justifyContent="center"
                alignItems="center"
            />
          </Flex>
        </Box>

      </div>
  );
}
