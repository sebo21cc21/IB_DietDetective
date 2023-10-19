import React from 'react';
import { Box, Heading, FormControl, FormLabel, Input, Button, Text, Switch, Link as ChakraLink, Flex } from '@chakra-ui/react';
import { Link, NavLink } from 'react-router-dom';
import { FaGithub, FaGoogle } from 'react-icons/fa';

const formContainerStyles = {
  maxW: "md",
  mx: "auto",
  mt: 6,
  p: 10,
  borderWidth: 1,
  borderRadius: "md",
  boxShadow: "md",
  bgGradient: "linear(to-r, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8))"
};

const headingStyles = {
  size: "lg",
  textAlign: "center",
  mb: 4,
  color: "white",
};

const textStyles = {
  color: "gray.500",
  mb: 2,
};

const formLabelStyles = {
  color: "white",
};

const linkStyles = {
  color: "blue.500",
};

export default function Register() {
  return (
    <Box sx={formContainerStyles}>
      <Heading sx={headingStyles}>Witaj!</Heading>
      <Text sx={textStyles}>Skorzystaj z tych niesamowitych formularzy, aby bezpłatnie zalogować się lub utworzyć nowe konto w swoim projekcie.</Text>
      <Text sx={headingStyles}>Zarejestruj się z</Text>
      <FormControl id="Github" mb={4}>
        <Flex justifyContent="center">
          <Flex justifyContent="flex-start">
            <Box px={5}>
              <Link href="https://www.github.com/" isExternal mx={2} >
                  <FaGithub size={70} />
              </Link>
            </Box>
            <Box px={5}>
              <Link href="https://www.google.com/" isExternal mx={2} >
                  <FaGoogle size={70} />
              </Link>
            </Box>
          </Flex>
        </Flex>
      </FormControl>

      <Text sx={headingStyles}>lub</Text>


      <FormControl id="fullName" mb={4}>
        <FormLabel sx={formLabelStyles}>Imię i Nazwisko</FormLabel>
        <Input color = "white" type="text" placeholder="Wprowadź Imię i Nazwisko" />
      </FormControl>

      <FormControl id="email" mb={4}>
        <FormLabel sx={formLabelStyles}>Email</FormLabel>
        <Input color = "white" type="email" placeholder="Wprowadź Email" />
      </FormControl>

      <FormControl id="password" mb={4}>
        <FormLabel sx={formLabelStyles}>Hasło</FormLabel>
        <Input color = "white" type="password" placeholder="Wprowadź hasło" />
      </FormControl>

      <FormControl display="flex" alignItems="center" mb={4}>
        <Switch id="rememberMe" colorScheme="blue" />
        <FormLabel htmlFor="rememberMe" mb={0} ml={2}>
          <Text sx={formLabelStyles}>Pamiętaj mnie</Text>
        </FormLabel>
      </FormControl>
      <Button colorScheme="messenger" size="md" w="full" md="2">Zaloguj się</Button>

      <Text textAlign="center" color= "gray.500">
        Masz konto?{' '}
        <ChakraLink as={NavLink} to="/login" sx={linkStyles}>
          Zaloguj się
        </ChakraLink>
      </Text>
    </Box>
  );
}
