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
        >
          <Heading color="red">
            Niestety wystąpił błąd, aplikacja nie oferuje takiego punktu dostępu
          </Heading>
          <img src="img/404.png" alt="404 Error" />
        </Flex>
      </div>
  );
}
