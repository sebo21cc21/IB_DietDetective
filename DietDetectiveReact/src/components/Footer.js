import React from 'react';
import { Box, Flex, Text, Link } from '@chakra-ui/react';
import { FaLinkedin, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <Box bg="#1B1B1B" color="white" py={4} textAlign="center">
      <Flex justifyContent="center" alignItems="center" mb={2}>
        <Flex justifyContent="flex-start" alignItems="center">
          <Link href="https://www.linkedin.com/" isExternal mx={2}>
            <FaLinkedin size={20} />
          </Link>
          <Link href="https://www.twitter.com/" isExternal mx={2}>
            <FaTwitter size={20} />
          </Link>
          <Link href="https://www.instagram.com/" isExternal mx={2}>
            <FaInstagram size={20} />
          </Link>
          <Link href="https://www.github.com/" isExternal mx={2}>
            <FaGithub size={20} />
          </Link>
        </Flex>
        <Flex justifyContent="center">
          <Text fontSize="sm" opacity={0.8} >
            &copy; {new Date().getFullYear()} Company All rights Reserved
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;