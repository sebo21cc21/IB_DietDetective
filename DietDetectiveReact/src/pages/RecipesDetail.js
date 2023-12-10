import React, { useEffect, useState } from 'react';
import { Box, Container, SimpleGrid, Text, Heading, IconButton, Flex, Button,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    VStack} from '@chakra-ui/react';
import { FaArrowLeft } from 'react-icons/fa';
import { getMeal } from '../util/APIUtils';
import { useNavigate, useParams } from 'react-router-dom';

export default function RecipesDetail() {
    const { id } = useParams(); // Pobieranie `id` z URL
    const [meal, setMeal] = useState({});
    const navigate = useNavigate();
    const descriptionParagraphs = meal.longDescription?.includes('\\n')
        ? meal.longDescription.split('\\n')
        : [meal.longDescription];


    const NutritionTable = () => (
        <Table variant="simple" colorScheme="blue" width={"50%"}>
            <Thead>
                <Tr>
                    <Th color={'white'}>Kaloryczność</Th>
                    <Th color={'white'}>Węglowodany</Th>
                    <Th color={'white'}>Białka</Th>
                    <Th color={'white'}>Tłuszcze</Th>
                    <Th color={'white'}>Masa</Th>
                    <Th color={'white'}>Ilość</Th>
                </Tr>
            </Thead>
            <Tbody>
                <Tr>
                    <Td>{parseInt((parseInt(meal.calories) * parseInt(meal.unit)) / 100)} kcal</Td>
                    <Td>{meal.carbohydrates} g</Td>
                    <Td>{meal.proteins} g</Td>
                    <Td>{meal.fats} g</Td>
                    <Td>{meal.unit}</Td>
                    <Td>1 porcja</Td>
                </Tr>
            </Tbody>
        </Table>
    );
    const handleDetailsClick = () => {
        navigate('/recipes');
    };

    const fetchMeal = async () => {
        getMeal(id)
            .then((response) => {
                setMeal(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Błąd podczas pobierania danych użytkownika', error);
            });
    };

    useEffect(() => {
        fetchMeal();
    }, [id]);

    const FirstBox = {
        bgGradient: 'linear(to-r, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6))',
        color: 'white',
        borderRadius: 'lg',
        p: '20px',
        textAlign: 'center',
    };
    return (
        <div className="App">
            <Heading color="white">Na co masz ochotę?</Heading>
            <Flex justifyContent="center">
                <SimpleGrid spacing={10} justifyContent="center">
                    <Box sx={FirstBox}>
                        <Flex justifyContent="center">
                            <img
                                src={meal.image}
                                alt={meal.name}
                                style={{
                                    height: 'auto',
                                    maxWidth: '25%',
                                    borderRadius: '30%',
                                }}
                            />
                        </Flex>
                        <Text fontSize="xl" fontWeight="bold">
                            {meal.name}
                        </Text>
                            <Text mb={4}>🕑Czas przygotowania: {meal.preparationTime} min🕑</Text>
                        <VStack spacing={4}>
                            <Text>{meal.shortDescription}</Text>

                            <Text fontSize="xl" fontWeight="bold">
                                Tabela wartości odżywczych:
                            </Text>
                            <NutritionTable/>
                            <Text fontSize="xl" fontWeight="bold">
                                Przygotowanie:
                            </Text>
                            {descriptionParagraphs.map((paragraph, index) => (
                                <Text key={index}>{paragraph}</Text>
                            ))}
                            <Button
                                leftIcon={<FaArrowLeft/>}
                                onClick={handleDetailsClick}
                                size="sm"
                                colorScheme="ghost"
                                variant="outline"
                            >
                                Powrót
                            </Button>
                        </VStack>


                    </Box>
                </SimpleGrid>
            </Flex>
        </div>
    );
}
