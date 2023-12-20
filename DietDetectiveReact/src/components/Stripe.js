import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
    Box,
    Button, Flex,
    Icon,
    Spinner,
    Text,
    Modal,
    useBreakpointValue,
    useToast, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Input, ModalFooter, // Import useToast hook
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { getCurrentUser, handlePremium } from '../util/APIUtils';


export default function Stripe(props) {
    const { email } = props;
    const isMobile = useBreakpointValue({ base: true, lg: false });
    const stripePromise = loadStripe(
        'pk_test_51OO9DeFYd1rsIj1DJ1ypszKldUe7veUkjZ0CW5GfekhvqjmcIqxnzyV7s35H7h7BAtqeInArLbIMuD1WIU2Hwa3s00o2IovmJA'
    );
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState();
    const [showInvalidEmailToast, setShowInvalidEmailToast] = useState(false); // Track if the toast should be shown
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toast = useToast(); // Initialize the useToast hook

    async function handleCheckout() {
        setLoading(true);
        setIsModalOpen(true);
        const stripe = await stripePromise;
        await handlePremium({
            premium: false,
        });
        const timeoutId = setTimeout(() => {
            // Set a timeout for 10 seconds
            setLoading(false);
            setShowInvalidEmailToast(true);
        }, 10000); // 10 seconds

        const { error } = await stripe.redirectToCheckout({
            lineItems: [
                {
                    price: 'price_1OO9RyFYd1rsIj1D6k1xo43e',
                    quantity: 1,
                },
            ],
            mode: 'payment',
            successUrl: `${window.location.origin}/account`,
            cancelUrl: `${window.location.origin}/404`,
            customerEmail: `${user.email}`,
        });
        if (error) {
            clearTimeout(timeoutId);
            setLoading(false);
            console.log(error);
        }
    }

    const fetchUserData = () => {
        getCurrentUser()
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.error('Błąd podczas pobierania danych użytkownika', error);
            });
    };

    useEffect(() => {
        fetchUserData();
        const url = new URL(window.location.href);
        const isPaymentSuccess = url.pathname === '/account';
        if (isPaymentSuccess) {
            handlePremium({ premium: true })
                .then(() => {
                    console.log('Premium status updated to true.');
                })
                .catch((error) => {
                    console.error('Failed to update premium status:', error);
                });
        }
    }, []);

    useEffect(() => {
        const url = new URL(window.location.href);
        const isPaymentSuccess = url.pathname === '/account';
        if (isPaymentSuccess) {
            handlePremium({ premium: true })
                .then(() => {
                    console.log('Premium status updated to true.');
                    fetchUserData();
                })
                .catch((error) => {
                    console.error('Failed to update premium status:', error);
                });
        } else {
            fetchUserData();
        }
    }, []);

    useEffect(() => {
        if (showInvalidEmailToast) {
            toast({
                title: 'Podany podczas rejestracji adres email nie jest prawdziwy',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    }, [showInvalidEmailToast]);

    return (
        <>
            {user && user.premium === true ? (
                <Box textAlign="center" ml={5}>
                    <Flex>
                    <Text fontSize="lg" color="yellow.500" fontWeight="bold">
                        Użytkownik Wspierający{' '}
                        <Icon as={StarIcon} mb={1} color="yellow.500" />
                    </Text>
                    </Flex>
                </Box>
            ) : (
                <Button
                    onClick={() => setIsModalOpen(true)}
                    size="sm"
                    ml={isMobile ? '0' : '5'}
                    isLoading={loading}
                    colorScheme="yellow"
                    variant="solid"
                    leftIcon={<StarIcon />}
                    loadingText={isMobile ? 'Płatność...' : 'Przekierowywanie do płatności...'}
                    spinner={<Spinner size="sm" />}
                >
                    Przejdź do premium
                </Button>)}

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} isCentered size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Wsparcie użytkownika</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>Teraz zostaniesz przekierowany do bezpiecznej płatności.</Text>
                        <Text>Aktualnie wprowadzony jest tryb testowy.</Text>
                        <br></br>
                        <Text>W celu autoryzacji płatności wprowadź kartę: 4242 4242 4242 4242</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={() => setIsModalOpen(false)}>
                            Anuluj
                        </Button>
                        <Button colorScheme='teal' onClick={() => {
                            setIsModalOpen(false);
                            handleCheckout();
                        }}>
                            Kontynuuj płatność
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </>
    );
}
