import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Login from '../components/Login';
import SideNavbar from '../components/SideNavbar';
import Footer from '../components/Footer';
import { Grid, GridItem, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

export default function RootLayout() {
  const [showNavbar, setShowNavbar] = useState(false);

  const toggleNavbar = () => {
    setShowNavbar(!showNavbar);
  };

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
            />
          )}
          {!isMobile && <Login />}
          <Outlet />
          
        </GridItem>
        <GridItem sx={footer}>
          <Footer />
        </GridItem>
      </Grid>
    </div>
  );
}
