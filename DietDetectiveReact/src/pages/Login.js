import React from 'react';
import { Box, Heading, FormControl, FormLabel, Input, Button, Text, Switch, Link as ChakraLink } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

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

export default function Login() {
  return (
    <Box sx={formContainerStyles}>
      <Heading sx={headingStyles}>Miło Cię znów widzieć!</Heading>

      <Text sx={textStyles}>Wprowadź Email oraz hasło, aby się zalogować</Text>

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
        Nie masz konta?{' '}
        <ChakraLink as={NavLink} to="/register" sx={linkStyles}>
          Zarejestruj się
        </ChakraLink>
      </Text>
    </Box>
  );
}
