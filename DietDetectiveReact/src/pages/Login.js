import React, {useContext, useEffect, useState} from 'react';
import {
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button,
    Text,
    Link as ChakraLink,
    Alert,
    AlertIcon,
    AlertDescription,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ACCESS_TOKEN } from '../constans';
import {getCurrentUser, login} from '../util/APIUtils';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';

const formContainerStyles = {
    maxW: 'md',
    mx: 'auto',
    mt: 6,
    p: 10,
    borderWidth: 1,
    borderRadius: 'md',
    boxShadow: 'md',
    bgGradient: 'linear(to-r, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8))',
};

const headingStyles = {
    size: 'lg',
    textAlign: 'center',
    mb: 4,
    color: 'white',
};

const textStyles = {
    color: 'gray.500',
    mb: 2,
};

const formLabelStyles = {
    color: 'white',
};

const linkStyles = {
    color: 'blue.500',
};

export default function Login() {
    const [setUser] = useState();
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState(false);
    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Email jest wymagany').email('Nieprawidłowy format email'),
        password: Yup.string()
            .required('Hasło jest wymagane')
            .min(8, 'Hasło musi mieć co najmniej 8 znaków')
            .matches(/(?=.*[!@#$%^&*])/, 'Hasło musi zawierać co najmniej jeden znak specjalny (!@#$%^&*)'),
    });
    const fetchUserData = () => {
        getCurrentUser()
            .then(response => {
                console.log(response.data);
                setUser(response.data);
            })
            .catch(error => {
                console.error('Błąd podczas pobierania danych użytkownika', error);
            });
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: (values, { setSubmitting, setErrors }) => {
            setLoginError(false);
            login(values)
                .then((response) => {

                    localStorage.setItem(ACCESS_TOKEN, response.token);
                    setAuth({
                        isAuthenticated: true,
                        currentUser: response,
                        isInterviewCompleted: response.interviewCompleted
                    });
                    fetchUserData();
                    navigate('/monitor');
                })
                .catch((error) => {
                    setSubmitting(false);
                    setLoginError(true);
                    setErrors({ login: 'Nieprawidłowy email lub hasło' });
                });
        },
    });

    return (
        <Box sx={formContainerStyles}>
            <Heading sx={headingStyles}>Miło Cię znów widzieć!</Heading>

            <Text sx={textStyles}>Wprowadź Email oraz hasło, aby się zalogować</Text>
            <form onSubmit={formik.handleSubmit}>
                <FormControl id="email" mb={4} isInvalid={formik.touched.email && formik.errors.email}>
                    <FormLabel sx={formLabelStyles}>Email</FormLabel>
                    <Input
                        color="white"
                        type="email"
                        name="email"
                        placeholder="Wprowadź Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <Alert status="error" variant="subtle" mt={1}>
                            <AlertIcon />
                            <AlertDescription>{formik.errors.email}</AlertDescription>
                        </Alert>
                    )}
                </FormControl>

                <FormControl id="password" mb={4} isInvalid={formik.touched.password && formik.errors.password}>
                    <FormLabel sx={formLabelStyles}>Hasło</FormLabel>
                    <Input
                        color="white"
                        type="password"
                        name="password"
                        placeholder="Wprowadź hasło"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.password && formik.errors.password && (
                        <Alert status="error" variant="subtle" mt={1}>
                            <AlertIcon />
                            <AlertDescription>{formik.errors.password}</AlertDescription>
                        </Alert>
                    )}
                </FormControl>


                {loginError && (
                    <Alert status="error" variant="subtle" mb={4}>
                        <AlertIcon />
                        <AlertDescription>Nieprawidłowe dane logowania. Sprawdź poprawność adresu email lub hasła</AlertDescription>
                    </Alert>
                )}
                <Button type="submit" colorScheme="messenger" size="md" w="full" md="2" isLoading={formik.isSubmitting}>
                    Zaloguj się
                </Button>
            </form>

            <Text textAlign="center" color="gray.500">
                Nie masz konta?{' '}
                <ChakraLink as={NavLink} to="/register" sx={linkStyles}>
                    Zarejestruj się
                </ChakraLink>
            </Text>
        </Box>
    );
}
