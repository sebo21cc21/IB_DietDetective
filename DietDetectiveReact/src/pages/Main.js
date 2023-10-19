import '../css/App.css';
import { Box, Heading, List, ListItem, Flex, Text, Image } from '@chakra-ui/react';
import React from 'react';

export default function Main() {
  return (
    <div className="App">
      <Box display="flex" justifyContent="center" align="center" height="80vh">
        <Flex alignItems="center" width="40%" justifyContent="center">
          <List>
            <ListItem color={"green.400"}>
              <Heading as="h1" size="xl">
                Głodni?
              </Heading>
            </ListItem>
            <ListItem color={"white"}>
              <Heading as="h1" size="xl">
                Z nami zjecie zdrowiej!
              </Heading>
            </ListItem>
            <ListItem color={"white"}>
              <Text display={{ base: "none", md: "block" }}>
                DietDetective to innowacyjna aplikacja dietetyczna, będzie Twoim niezastąpionym narzędziem w drodze do osiągnięcia sukcesu. Dzięki jej funkcjom będziesz mógł/a śledzić swoje spożycie kalorii oraz składników odżywczych, otrzymywać spersonalizowane porady dietetyczne i przepisy
              </Text>
            </ListItem>
          </List>
          <Image
            boxSize={{ base: '400px', md: '600px', xl: '640px'}}
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
