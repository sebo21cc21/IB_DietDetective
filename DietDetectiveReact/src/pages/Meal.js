import { Container, Box, SimpleGrid, Text, Flex, Input, Checkbox, CheckboxGroup, Stack, Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { getCategoryName, getMeals } from "../util/APIUtils";

export default function Monitor() {
  const [meals, setMeals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const fetchCategoryMeals = async (categoryId) => {
    getMeals(categoryId)
        .then(response => {
          setMeals(response.data);
        })
        .catch(error => {
          console.error('Error fetching meals', error);
        });
  };

  useEffect(() => {
    getCategoryName()
        .then(response => {
          setCategories(response.data);
        })
        .catch(error => {
          console.error('Error fetching categories', error);
        });
  }, []);

  useEffect(() => {
    // If no categories are selected, fetch all meals or a default category
    if (selectedCategoryIds.length === 0) {
      fetchCategoryMeals(16); // Default category ID
    } else {
      // Fetch meals for each selected category
      selectedCategoryIds.forEach(categoryId => {
        fetchCategoryMeals(categoryId);
      });
    }
  }, [selectedCategoryIds]);

  const handleCategoryChange = (e) => {
    const id = parseInt(e.target.value, 10);
    setSelectedCategoryIds(prev =>
        prev.includes(id) ? prev.filter(cid => cid !== id) : [...prev, id]
    );
    setCurrentPage(1); // Reset the page number to 1 on category change
  };

  const filteredMeals = meals.filter(meal => meal.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const paginatedMeals = filteredMeals.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const totalPages = Math.ceil(filteredMeals.length / pageSize);
  return (
      <div className="App">
        <Container as="section" maxWidth={"2x1"} py="10px">
          <SimpleGrid spacing={10} minChildWidth="250px">
            {/* Filtry kategorii */}
            <Box>
              <Text fontSize="xl" fontWeight="bold" color="white">Filtruj po kategoriach</Text>
              <CheckboxGroup colorScheme="green">
                <Stack spacing={3} direction="column" color="white">
                  {categories.map(category => (
                      <Checkbox key={category.id} value={category.id.toString()} onChange={handleCategoryChange}>
                        {category.name}
                      </Checkbox>
                  ))}
                </Stack>
              </CheckboxGroup>
            </Box>

            <Box>
              <Text fontSize="xl" fontWeight="bold" color="white">Wyszukaj posiłki</Text>
              <Input placeholder="Wyszukaj posiłek..." onChange={(e) => setSearchTerm(e.target.value)} />



              <Table variant="simple" color="white">
                <Thead>
                  <Tr>
                    <Th>Nazwa posiłku</Th>
                    <Th>Kalorie</Th>
                    {/* Inne kolumny według potrzeb */}
                  </Tr>
                </Thead>
                <Tbody>
                  {paginatedMeals.map(meal => (
                      <Tr key={meal.id}>
                        <Td>{meal.name}</Td>
                        <Td>{meal.calories}</Td>
                        {/* Inne kolumny według potrzeb */}
                      </Tr>
                  ))}
                </Tbody>
              </Table>
              {/* Paginacja */}
              <Flex justifyContent="center" mt="2">
                <Button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}>Poprzednia</Button>
                <Text mx="4">{currentPage}</Text>
                <Button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}>Następna</Button>
              </Flex>
            </Box>
          </SimpleGrid>
        </Container>
      </div>
  )
}