import React from 'react';
import { Flex, Heading } from "@chakra-ui/react";

export default function Recipes() {
  return (
      <div className="App">
        <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="80vh"
            ml ={{ base: '20', md: '0' }}
        >
          <Heading color="red">
            Niestety wystąpił błąd. Spróbuj ponownie później.
          </Heading>
          <img src="img/404.png" alt="404 Error" />
        </Flex>
      </div>
  );
}
