import React, { useEffect, useState } from 'react';
import {Box, Container, SimpleGrid, Text, Heading, IconButton, Flex, Button} from '@chakra-ui/react';
import {
  FaPizzaSlice,
  FaHamburger,
  FaIceCream,
  FaInfoCircle,
  FaHotdog,
  FaApple,
  FaCookie,
  FaArrowRight,
  FaArrowLeft,
} from 'react-icons/fa';
import {getMeal, getMeals, getUserSummary} from '../util/APIUtils';
import {useNavigate} from "react-router-dom";

export default function Recipes() {
  const [meals, setMeals] = useState([]);
  const [meal, setMeal] = useState([]);
  const [id] = useState(16);
  const FirstBox = {
    bgGradient: "linear(to-r, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6))",
    width: "300px",
    height: "300px",
    color: "white",
    borderRadius: "lg",
    p: "20px",
    textAlign: "center"
  }
  const navigate = useNavigate();
  const handleDetailsClick = (id) => {
    console.log('Clicked:', id);
    navigate("/recipes/" + id);
  };
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(6);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= Math.ceil(meals.length / itemsPerPage)) {
      setCurrentPage(newPage);
      setTotalPages(Math.ceil(meals.length / itemsPerPage));
    }
  };

  const fetchMeals = async () => {
    getMeals(id)
        .then((response) => {
          setMeals(response.data);
        })
        .catch((error) => {
          console.error('Błąd podczas pobierania danych użytkownika', error);
        });
  };

  const fetchMeal = async () => {
    getMeal(id)
        .then((response) => {
          setMeal(response.data);
        })
        .catch((error) => {
          console.error('Błąd podczas pobierania danych użytkownika', error);
        });
  };

  useEffect(() => {
    fetchMeals();
    fetchMeal();
  }, []);

  return (
      <div className="App">
        <Heading color="white">Na co masz ochotę?</Heading>
        <Container maxWidth={'3x1'} py="10px" >
          <SimpleGrid spacing={10} ml ={{ base: '0', md: '55' }} minChildWidth="300px">
            {meals && meals.slice(startIndex, endIndex).map((meal, index) => (
                <Box key={meal.id} sx={FirstBox}>
                  <Flex justifyContent="center">
                    <img
                        src={meal.image}
                        alt={meal.name}
                        style={{
                          height: '50%',
                          width: '50%',
                          borderRadius: '50%'
                        }}
                    />
                  </Flex>
                  <Text fontSize="xl" fontWeight="bold">
                    {meal.name}
                  </Text>
                  <Text>{meal.calories} kcal / 100g</Text>

                  <Button
                      leftIcon={<FaInfoCircle />}
                      onClick={() => handleDetailsClick(meal.id)}
                      size="sm"
                      colorScheme="whiteAlpha"
                      variant="outline"
                  >
                    Przygotowanie
                  </Button>

                </Box>
            ))}
          </SimpleGrid>
        </Container>

        <Flex justifyContent="center" mt="2vh" mb="5vh" align="center" ml ={{ base: '16', md: '0' }}>
          {currentPage > 1 && (
          <IconButton
              aria-label="Previous Page"
              icon={<FaArrowLeft />}
              onClick={() => changePage(currentPage - 1)}
              size="sm"
              colorScheme="whiteAlpha"
              disabled={currentPage === 1}
          />
          )}
          <Text color="white" mx="20px">
            {currentPage}/{totalPages}
          </Text>
          {currentPage < totalPages && (
          <IconButton
              aria-label="Next Page"
              icon={<FaArrowRight />}
              onClick={() => changePage(currentPage + 1)}
              size="sm"
              colorScheme="whiteAlpha"
              disabled={currentPage === Math.ceil(meals.length / itemsPerPage)}
          />
          )}
        </Flex>
      </div>
  );
}