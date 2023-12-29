import React, {useEffect, useState} from 'react';
import {Box, Flex, Heading} from "@chakra-ui/react";
import {getCurrentUser} from "../util/APIUtils";
export default function Success() {
    const FirstBox = {
        bgGradient: "linear(to-r, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6))",
        width: "350px",
        height: "300px",
        color: "white",
        borderRadius: "lg",
        p: "20px",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
    }

    const fetchUserData = () => {
        getCurrentUser()
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error('Błąd podczas pobierania danych użytkownika', error);
            });
    };
    useEffect(() => {
        fetchUserData();
    }, []);

    const [user, setUser] = useState();
  return (
      <div className="App">
      <Flex
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          ml ={{ base: '20', md: '0' }}
      >
          <Box sx={FirstBox}  alignItems="center" justifyContent="center">
              <Heading color="green.400">
                  {fetchUserData()}
                  Gratulacje płatność przeszła pomyślnie! <br></br><br></br>Dziękujemy!
              </Heading>
          </Box>
    </Flex>
      </div>
  );
}
