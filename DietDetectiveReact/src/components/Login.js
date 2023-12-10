import React, {useContext} from 'react';
import {Button, Flex, HStack, Spacer, Text} from '@chakra-ui/react';
import {FaUser} from 'react-icons/fa';
import AuthContext from "../context/AuthProvider";
import {ACCESS_TOKEN} from "../constans";
import {Link, useNavigate} from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const {auth, setAuth} = useContext(AuthContext);
    console.log(auth)
    const logout = () => {
        setAuth({
            isAuthenticated: false,
            currentUser: null,
            isInterviewCompleted: false
        });
        localStorage.removeItem(ACCESS_TOKEN);
        navigate('/login');
    }

    return (

        (auth.isAuthenticated) ? (
                <Flex as="nav" alignItems="center" color={"white"}>
                    <Spacer/>
                    <HStack spacing="20px">
                        <FaUser size={20}/>
                        <Text>Witaj, {auth.currentUser.firstName}!</Text>
                        <Button colorScheme="messenger" onClick={logout}>Wyloguj</Button>
                    </HStack>
                </Flex>
            )
            : (
                <Flex as="nav" alignItems="center" color={"white"}>
                    <Spacer/>
                    <HStack spacing="20px">
                        <Link to="/login">
                            <Button colorScheme="messenger">Zaloguj</Button>
                        </Link>
                    </HStack>
                </Flex>
            )

    )
}
 