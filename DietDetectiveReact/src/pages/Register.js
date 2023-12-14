import React, {useContext, useState} from 'react';
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
    Checkbox,
} from '@chakra-ui/react';
import {NavLink, useNavigate} from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AuthContext from "../context/AuthProvider";
import { register } from '../util/APIUtils';

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
    textAlign: "center",
    mb: 2,
};

const formLabelStyles = {
    color: "white",
};

const linkStyles = {
    color: "blue.500",
};

export default function Register() {
    const {setAuth} = useContext(AuthContext);
    const [registrationError, setRegistrationError] = useState('');
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Imię jest wymagane'),
        surname: Yup.string().required('Nazwisko jest wymagane'),
        email: Yup.string().required('Email jest wymagany').email('Nieprawidłowy format email'),
        password: Yup.string()
            .required('Hasło jest wymagane')
            .min(8, 'Hasło musi mieć co najmniej 8 znaków')
            .matches(/(?=.*[!@#$%^&*])/, 'Hasło musi zawierać co najmniej jeden znak specjalny (!@#$%^&*)'),
        agreeToTerms: Yup.boolean().oneOf([true], 'Musisz zaakceptować Regulamin i warunki'),
    });
    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: '',
            surname: '',
            email: '',
            password: '',
            agreeToTerms: false,
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const registerRequest = {
                    firstname: values.name,
                    lastname: values.surname,
                    email: values.email,
                    password: values.password,
                };

                const responseData = await register(registerRequest);

                setAuth({
                    isAuthenticated: true,
                    currentUser: responseData,
                    isInterviewCompleted: responseData.interviewCompleted
                });

                navigate('/interview');
                console.log('Registration successful:', responseData);
            } catch (error) {
                console.error('Registration failed:', error);
                const errorMessage = 'Rejestracja niepoprawna, użytkownik istnieje';
                setRegistrationError(errorMessage);
            }
        },
    });

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        formik.setFieldValue('agreeToTerms', !isChecked);
    };

    return (
        <Box sx={formContainerStyles} mb={8}>
            <Heading sx={headingStyles}>Witaj!</Heading>
            <Text sx={textStyles}>
                Uzupełnij, aby bezpłatnie zalogować się lub utworzyć nowe konto w systemie.
            </Text>

            <form onSubmit={formik.handleSubmit}>
                <FormControl id="fullName" mb={4}>
                    <FormLabel sx={formLabelStyles}>Imię</FormLabel>
                    <Input
                        color="white"
                        type="text"
                        placeholder="Wprowadź Imię"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.name && formik.errors.name && (
                        <Alert status="error" variant="subtle" mt={1}>
                            <AlertIcon />
                            <AlertDescription>{formik.errors.name}</AlertDescription>
                        </Alert>
                    )}
                </FormControl>

                <FormControl id="surname" mb={4}>
                    <FormLabel sx={formLabelStyles}>Nazwisko</FormLabel>
                    <Input
                        color="white"
                        type="text"
                        placeholder="Wprowadź Nazwisko"
                        name="surname"
                        value={formik.values.surname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.surname && formik.errors.surname && (
                        <Alert status="error" variant="subtle" mt={1}>
                            <AlertIcon />
                            <AlertDescription>{formik.errors.surname}</AlertDescription>
                        </Alert>
                    )}
                </FormControl>

                <FormControl id="email" mb={4}>
                    <FormLabel sx={formLabelStyles}>Email</FormLabel>
                    <Input
                        color="white"
                        type="email"
                        placeholder="Wprowadź Email"
                        name="email"
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

                <FormControl id="password" mb={4}>
                    <FormLabel sx={formLabelStyles}>Hasło</FormLabel>
                    <Input
                        color="white"
                        type="password"
                        placeholder="Wprowadź hasło"
                        name="password"
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

                <FormControl mb={4} display="flex" alignItems="flex-start">
                    <Checkbox
                        isChecked={isChecked}
                        onChange={handleCheckboxChange}
                        colorScheme="blue"
                        color={"white"}
                    >
                        <Box textAlign="justify" ml={2} fontSize="12px">
                            Niniejszym akceptuję <ChakraLink
                            href="https://www.freeprivacypolicy.com/live/6b237d9c-11fb-4bc4-a979-572c2f3e57fd"
                            color="blue.500" isExternal>Regulamin, Warunki Handlowe</ChakraLink>, zgadzam się na warunki i postanowienia tego serwisu.*
                        </Box>
                    </Checkbox>
                    {formik.touched.agreeToTerms && formik.errors.agreeToTerms && (
                        <Alert status="error" variant="subtle" mt={1}>
                            <AlertIcon />
                            <AlertDescription>{formik.errors.agreeToTerms}</AlertDescription>
                        </Alert>
                    )}
                </FormControl>
                <FormControl display="flex" alignItems="flex-start">
                    <Checkbox
                        colorScheme="blue"
                        color={"white"}
                    >
                        <Box textAlign="justify" ml={2} fontSize="12px">
                            Wyrażam zgodę na kontakt ze mną, w tym na przesyłanie informacji sprzedażowych i marketingowych dotyczących DietDetective, od LDV Polska S.A. z siedzibą w Warszawie, za pomocą środków komunikacji elektronicznej (e-mail, SMS), a także wyrażenie zgody na przetwarzanie przez LDV Polska S.A. z siedzibą w Warszawie mojego dane osobowe (adres e-mail, numer telefonu) w tym celu. Podstawa prawna przetwarzania danych jest art. 6 ust. (a) RODO.
                        </Box>
                    </Checkbox>
                </FormControl>

                {registrationError && (
                    <Alert status="error" variant="subtle" mb={4}>
                        <AlertIcon />
                        <AlertDescription>{registrationError}</AlertDescription>
                    </Alert>
                )}

                <Button colorScheme="messenger" size="md" w="full" md="2" type="submit"  mt={3}>
                    Zarejestruj się
                </Button>
            </form>

            <Text textAlign="center" color="gray.500">
                Masz już konto?{' '}
                <ChakraLink as={NavLink} to="/login" sx={linkStyles}>
                    Zaloguj się
                </ChakraLink>
            </Text>
        </Box>
    );
}
