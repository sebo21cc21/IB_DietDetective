import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import {GiHeartBeats, GiHomeGarage} from 'react-icons/gi';
import {FaBeer, FaSignInAlt, FaUser, FaUserPlus, FaUtensils} from 'react-icons/fa';
import {Box, Flex, Heading, List, ListItem} from '@chakra-ui/react';
import AuthContext from "../context/AuthProvider";


export default function SideNavbar() {
    const iconBox = {
        marginRight: "8px",
        bg: "#30344D",
        borderRadius: "25%",
        width: "40px",
        height: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    };
    const lineStyle = {
        borderTop: "1px solid rgba(255, 255, 255, 1)",
        marginTop: "20px",
        marginBottom: "20px",
        opacity: "0.5"
    };
    const {auth} = useContext(AuthContext);
    return (
        <List color="white">
            <Flex align="center">
                <img src="img/logo.png" alt="logo" style={{width: "45px", height: "45px"}}/>
                <Heading size="md" noOfLines={1} as="h1">
                    DietDetective
                </Heading>
            </Flex>
            <hr style={lineStyle}/>
            <ListItem marginBottom="20px">
                <NavLink to="/">
                    <Flex align="center">
                        <Box sx={iconBox}>
                            <GiHomeGarage size={20}/>
                        </Box>
                        Strona Główna
                    </Flex>
                </NavLink>
            </ListItem>
            {auth.isInterviewCompleted && auth.isAuthenticated ? (
                <>
                    <ListItem marginBottom="20px">
                        <NavLink to="/monitor">
                            <Flex align="center">
                                <Box sx={iconBox}>
                                    <GiHeartBeats size={20}/>
                                </Box>
                                Monitorowanie
                            </Flex>
                        </NavLink>
                    </ListItem>
                    <ListItem marginBottom="20px">
                        <NavLink to="/meal">
                            <Flex align="center">
                                <Box sx={iconBox}>
                                    <FaBeer size={20}/>
                                </Box>
                                Posiłki
                            </Flex>
                        </NavLink>
                    </ListItem>
                    <ListItem marginBottom="20px">
                        <NavLink to="/recipes">
                            <Flex align="center">
                                <Box sx={iconBox}>
                                    <FaUtensils size={20}/>
                                </Box>
                                Przepisy
                            </Flex>
                        </NavLink>
                    </ListItem>
                    <ListItem marginBottom="20px">
                        <NavLink to="/account">
                            <Flex align="center">
                                <Box sx={iconBox}>
                                    <FaUser size={20}/>
                                </Box>
                                Profil
                            </Flex>
                        </NavLink>
                    </ListItem>
                </>
            ) : (
                <>
                    <ListItem marginBottom="20px">
                        <Flex align="center">
                            <Box sx={iconBox}>
                                <FaSignInAlt size={20}/>
                            </Box>
                            <NavLink to="/login">
                                Logowanie
                            </NavLink>
                        </Flex>
                    </ListItem>
                    <ListItem marginBottom="20px">
                        <Flex align="center">
                            <Box sx={iconBox}>
                                <FaUserPlus size={20}/>
                            </Box>
                            <NavLink to="/register">
                                Rejestracja
                            </NavLink>
                        </Flex>
                    </ListItem>
                </>
            )}
        </List>
    );

}
