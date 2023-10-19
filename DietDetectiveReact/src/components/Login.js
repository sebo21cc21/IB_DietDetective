import React, { useEffect, useState } from 'react';
import { Flex, Spacer, Text, Button, HStack } from '@chakra-ui/react';
import { FaUser } from 'react-icons/fa';
import axios from 'axios';
export default function Login() {
  const [userData, setUserData] = useState(null);

  //Person
  useEffect(() => {
    axios.get('http://localhost:8080/person?limit=1')
      .then(response => {
        const sortedPerson = response.data.sort((a, b) => b.id - a.id);
        const lastPerson = sortedPerson.slice(0, 1);
        setUserData(lastPerson[0]);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    
    <Flex as= "nav" alginItems="center" color={"white"}>
      <Spacer />
      <HStack spacing="20px">
        <FaUser size={20}/>
        <Text >Witaj, {userData && userData.name} {userData && userData.surname}!</Text>
        <Button colorScheme="messenger">Logout</Button>
      </HStack>
    </Flex> 
  )
}
 