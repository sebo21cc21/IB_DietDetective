import React, {useContext, useState} from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import Login from '../components/Login';
import SideNavbar from '../components/SideNavbar';
import Footer from '../components/Footer';
import {Button, Flex, Grid, GridItem, HStack, IconButton, Spacer, Text, useBreakpointValue} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import AuthContext from "../context/AuthProvider";
import {ACCESS_TOKEN} from "../constans";
import Stripe from "../components/Stripe";
import {FaUser} from "react-icons/fa";

export default function RootLayout() {
  const [showNavbar, setShowNavbar] = useState(false);
  const {setAuth, auth} = useContext(AuthContext);
  const navigate = useNavigate();
  const toggleNavbar = () => {
    setShowNavbar(!showNavbar);
  };
  const logout = () => {
    setAuth({
      isAuthenticated: false,
      currentUser: null,
      isInterviewCompleted: false
    });
    localStorage.removeItem(ACCESS_TOKEN);
    navigate('/login');
  }

  const footer = {
    as: 'footer',
    colSpan: '6',
    bg: '',
    color: 'white',
    textAlign: 'center',
    position: 'fixed',
    bottom: '0',
    left: '0',
    width: '100%',
  };

  const isMobile = useBreakpointValue({ base: true, lg: false });

  return (
    <div style={{ backgroundImage: `url('img/bg.jpg')`, backgroundSize: 'cover' }}>
      <Grid templateColumns="repeat(6, 1fr)" style={{ minHeight: '100vh', position: 'relative' }}>
        <GridItem
          as="aside"
          colSpan={{ base: 6, lg: 1, xl: 1}}
          bgGradient="linear(to-r, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.1))"
          minHeight={{ lg: '100vh' }}
          p={{ base: '20px', lg: '30px' }}
          display={showNavbar || !isMobile ? 'block' : 'none'}
        >
          <SideNavbar />
        </GridItem>
        <GridItem as="main" colSpan="5" p="20px">
          {isMobile && (
            <IconButton
              icon={showNavbar ? <CloseIcon /> : <HamburgerIcon />}
              size="lg"
              position="absolute"
              top="20px"
              right="20px"
              onClick={toggleNavbar}
              zIndex="999"
              aria-label="Burger menu"/>
          )}
          {!isMobile && auth.isInterviewCompleted ? (<Login />) : ""}
          {isMobile && auth.isInterviewCompleted ?  (
              <Flex as="nav" alignItems="center" color={"white"} ml = {5}>
                <Stripe />

                <HStack spacing="20px">
                  <Button ml = {3} colorScheme="messenger" size = "sm" onClick={logout}>Wyloguj</Button>
                </HStack>
              </Flex>
          ) : ""
          }
          <Outlet />
          
        </GridItem>
        <GridItem sx={footer}>
          <Footer />
        </GridItem>
      </Grid>
    </div>
  );
}
