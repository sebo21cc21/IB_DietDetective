import {
  Container,
  Box,
  SimpleGrid,
  Text,
  Flex,
  Input,
  Checkbox,
  CheckboxGroup,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Select, IconButton, useBreakpointValue, Radio, RadioGroup,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import {
  getCategoryName,
  getEaten,
  getEatenSummary,
  getMeals,
  handleDeleteEatenMeal,
  handleEaten,
} from "../util/APIUtils";
import { FaPlus } from "react-icons/fa";
import { useToast } from '@chakra-ui/react';
import EatenMealsSummaryChart from "../components/EatenMealsSummaryChart";
import EatenMealsLastWeekChart from "../components/EatenMealsLastWeekChart";
import {LuListFilter} from "react-icons/lu";

export default function Monitor() {
  const [meals, setMeals] = useState([]);
  const [eatenMeals, setEatenMeals] = useState([]);
  const [eatenMealsSummary, setEatenMealsSummary] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isIntoleranceSelected, setIsIntoleranceSelected] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageEaten, setCurrentPageEaten] = useState(1);
  const pageSize = 5;
  const totalPagesEaten = Math.ceil(eatenMeals.length / pageSize);
  const [isLactoseFreeSelected, setIsLactoseFreeSelected] = useState(false);
  const [isGlutenFreeSelected, setIsGlutenFreeSelected] = useState(false);
  const paginatedEatenMeals = eatenMeals.slice((currentPageEaten - 1) * pageSize, currentPageEaten * pageSize);
  const [selectedFilter, setSelectedFilter] = useState("ingredients");
  const [visibleCheckboxIds, setVisibleCheckboxIds] = useState(new Set());
  const [mealWeights, setMealWeights] = useState({});
  const checkboxGridSpacing = useBreakpointValue({ base: 5, md: 3 });
  const [isLowCarbSelected, setIsLowCarbSelected] = useState(false);
  const [isHighProteinSelected, setIsHighProteinSelected] = useState(false);
  const toast = useToast();
  const [isFilterActive, setIsFilterActive] = useState(false);

  const categoryOptions = {
    ingredients: 'Składniki',
    recipes: 'Przepisy',
  };


  const fetchCategoryMeals = async (categoryId) => {
    getMeals(categoryId)
        .then(response => {
          setMeals(response.data);
        })
        .catch(error => {
          console.error('Error fetching meals', error);
        });
  };
  const fetchEatenMeals = async () => {
    getEaten()
        .then(response => {
          const aggregatedData = response.data.reduce((acc, meal) => {
            if (acc[meal.id]) {
              acc[meal.id].count += 1;
            } else {
              acc[meal.id] = {...meal, count: 1};
            }
            return acc;
          }, {});

          setEatenMeals(Object.values(aggregatedData));
        })
        .catch(error => {
          console.error('Error fetching meals', error);
        });
  };
  const fetchEatenMealSummary = async () => {
    getEatenSummary()
        .then(response => {
          setEatenMealsSummary(response.data);
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
  const setNewEaten = async (mealID) => {
    let weight = mealWeights[mealID] || 100;
    const mealToAdd = meals.find(meal => meal.id === mealID);


    if (!mealToAdd) {
      console.error('Meal not found');
      return;
    }
    try {
      await handleEaten({mealId: parseInt(mealID), eatenWeight: weight});
      await fetchEatenMeals();
      await fetchEatenMealSummary();
      toast({
        title: `Pomyślnie dodano ${mealToAdd.name}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: "top"
      });
    } catch (error) {
      console.error('Error adding eaten meal', error);
    }
  };
  const handleWeightChange = (mealId, weight) => {
    setMealWeights(prevWeights => ({
      ...prevWeights,
      [mealId]: weight
    }));
  };

  useEffect(() => {
    fetchEatenMeals();
    fetchEatenMealSummary();
  }, []);


  useEffect(() => {
    if (selectedCategoryIds.length === 0) {
      fetchCategoryMeals('1,16');
    } else {
      const categoryIdsString = selectedCategoryIds.join(',');
      fetchCategoryMeals(categoryIdsString);
    }
  }, [selectedCategoryIds]);



  useEffect(() => {
    switch(selectedFilter) {
      case 'all':
        setVisibleCheckboxIds(new Set([1, 16]));
        break;
      case 'ingredients':
        setVisibleCheckboxIds(new Set(Array.from({ length: 14 }, (_, i) => i + 2)));
        break;
      case 'recipes':
        setVisibleCheckboxIds(new Set(Array.from({ length: 7 }, (_, i) => i + 19)));
        break;
      default:
        setVisibleCheckboxIds(new Set());
    }
  }, [selectedFilter, meals]);
  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
  }
  const handleCategoryChange = (e) => {
    const id = parseInt(e.target.value, 10);
    setSelectedCategoryIds(prev =>
        prev.includes(id) ? prev.filter(cid => cid !== id) : [...prev, id]
    );
    setCurrentPage(1);
  };
  const handleToleranceChange = (e) => {
    const id = parseInt(e.target.value, 10);
    setIsIntoleranceSelected(e.target.checked);
    setSelectedCategoryIds(prev =>
        prev.includes(id) ? prev.filter(cid => cid !== id) : [...prev, id]
    );
    if (id === 17) {
      setIsLactoseFreeSelected(e.target.checked);

      if (e.target.checked && isGlutenFreeSelected) {
        setIsGlutenFreeSelected(false);
      }
    }

    if (id === 18) {
      setIsGlutenFreeSelected(e.target.checked);

      if (e.target.checked && isLactoseFreeSelected) {
        setIsLactoseFreeSelected(false);
      }
    }
    setCurrentPage(1);
  };

  const revertToOriginalOrder = () => {
    fetchCategoryMeals(selectedCategoryIds.join(',') || '1,16');
  }

  const handleDietChange = (e) => {
    if (e.target.value === 'lowCarb') {
      setIsLowCarbSelected(e.target.checked);
      if (e.target.checked) {
        setMeals([...meals].sort((a, b) => a.carbohydrates - b.carbohydrates));
      } else if (!isHighProteinSelected) {
        revertToOriginalOrder();
      }
    } else if (e.target.value === 'highProtein') {
      setIsHighProteinSelected(e.target.checked);
      if (e.target.checked) {
        setMeals([...meals].sort((a, b) => b.proteins - a.proteins));
      } else if (!isLowCarbSelected) {
        revertToOriginalOrder();
      }
    }
  };
  const handleDelete = async (mealId) => {
    const mealToAdd = meals.find(meal => meal.id === mealId);

    if (!mealToAdd) {
      console.error('Meal not found');
      return;
    }

    try {
      const updatedEatenMeals = eatenMeals.filter(meal => meal.id !== mealId);
      setEatenMeals(updatedEatenMeals);

      const startIndex = (currentPageEaten - 1) * pageSize;
      if (updatedEatenMeals.slice(startIndex, startIndex + pageSize).length === 0 && currentPageEaten > 1) {
        setCurrentPageEaten(currentPageEaten - 1);
      }
      handleDeleteEatenMeal(mealId)
          .then(() => {
            fetchEatenMeals();
            fetchEatenMealSummary();
            console.log("Meal deleted successfully.");
          })
          .catch(error => {
            console.error("Failed to delete meal:", error);
          });
      toast({
        title: `Pomyślnie usunięto ${mealToAdd.name}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: "top"
      });
    } catch (error) {
      console.error('Error deleting meal', error);
    }
  };
  const toggleFilter = () => {
    setIsFilterActive(!isFilterActive);
    setSelectedCategoryIds([]);
    setSearchTerm('');
    setIsIntoleranceSelected(false);
    setIsLowCarbSelected(false);
    setIsHighProteinSelected(false);
    setSelectedFilter('ingredients');
    setVisibleCheckboxIds(new Set());

    fetchCategoryMeals(selectedCategoryIds.join(',') || '1,16');
  };

  const filteredMeals = meals.filter(meal => {
    const searchWords = searchTerm.toLowerCase().split(/\s+/);
    const mealNameLower = meal.name.toLowerCase();
    return searchWords.every(word => mealNameLower.includes(word));
  });
  const paginatedMeals = filteredMeals.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const totalPages = Math.ceil(filteredMeals.length / pageSize);
  const ThirdBox = {
    bgGradient: "linear(to-r, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6))",
    h: "350px",
    color: "white",
    borderRadius: "lg",
    p: "20px",
    textAlign: "center"
  }

  const FourthBox = {
    bgGradient: "linear(to-r, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6))",
    color: "white",
    h: "350px",
    borderRadius: "lg",
    p: "20px",
    textAlign: "center"
  }
  const miniBox = {
    h: "60px",
    w: "50%",
    color: "white",
    borderRadius: "lg",
    p: "5px",
    mt: "5px",
  }
  return (
      <div className="App">
        <Container as="section" maxWidth="2x1" py="10px" ml ={{ base: '6', md: '0' }}>
          <SimpleGrid spacing={10} minChildWidth="250px" >
            <Box>
              <Button aria-label="Details" colorScheme="teal" onClick={toggleFilter}><LuListFilter /> Filtruj</Button>
              {isFilterActive && ( <>
              <Text fontSize="xl" fontWeight="bold" color="white">Wybierz kategorię</Text>
              <RadioGroup value={selectedFilter} onChange={setSelectedFilter}>
                <SimpleGrid columns={2} spacing={checkboxGridSpacing} color="white" placeItems="center" justifyContent="center">
                <Radio color="white" value="ingredients" isDisabled={isIntoleranceSelected}>
                  Składniki
                </Radio>
                <Radio color="white" value="recipes">
                  Przepisy
                </Radio>
                </SimpleGrid>
              </RadioGroup>


              <CheckboxGroup colorScheme="green">
                {!isIntoleranceSelected && (<>
                <Text fontSize="xl" fontWeight="bold" color="white" mt={10} mb={5}>Filtruj po kategoriach:</Text>
                <SimpleGrid columns={{ base: 2, md: 5 }} spacing={checkboxGridSpacing} color="white">
                  {categories.filter(category => visibleCheckboxIds.has(category.id)).map(category => (
                      <Checkbox key={category.id} value={category.id.toString()} onChange={handleCategoryChange}>
                        {category.name}
                      </Checkbox>
                  ))}
                </SimpleGrid>
                </>
                )}
                {selectedFilter.includes("recipes") && (
                    <>
                <Text fontSize="xl" fontWeight="bold" color="white" mt={10} mb={5}>Nietolerancje pokarmowe:</Text>
                <SimpleGrid columns={2} spacing={checkboxGridSpacing} color="white" placeItems="center" justifyContent="center">
                  {categories.filter(category => category.id === 17).map(category => (
                      <Checkbox key={17} value={"17"} onChange={handleToleranceChange} isDisabled = {isGlutenFreeSelected}>
                        {category.name}
                      </Checkbox>
                  ))}
                  {categories.filter(category => category.id === 18).map(category => (
                      <Checkbox key={18} value={"18"} onChange={handleToleranceChange} isDisabled = {isLactoseFreeSelected}>
                        {category.name}
                      </Checkbox>
                  ))}
                </SimpleGrid></>
                )}
                <Text fontSize="xl" fontWeight="bold" color="white" mt={10} mb={5}>Wybierz rodzaj diety:</Text>
                <SimpleGrid columns={2} spacing={checkboxGridSpacing} color="white" placeItems="center" justifyContent="center">
                  <Checkbox value="lowCarb" isChecked={isLowCarbSelected} onChange={handleDietChange}>
                    Dieta niskowęglowodanowa
                  </Checkbox>
                  <Checkbox value="highProtein" isChecked={isHighProteinSelected} onChange={handleDietChange}>
                    Dieta wysokobiałkowa
                  </Checkbox>
                </SimpleGrid>
              </CheckboxGroup>
                  </>
              )}
              <Text fontSize="xl" fontWeight="bold" color="white" mt={10}>Wyszukaj posiłki</Text>
              <Input color="white" _placeholder={{  color: 'rgba(255, 255, 255, 0.800)' }} placeholder="Wyszukaj posiłek..." onChange={(e) => setSearchTerm(e.target.value)} />

              <Table className="responsive-table" variant="simple" color="white">
                <Thead>
                  <Tr>
                    <Th color = "rgba(255, 255, 255, 0.800)">Nazwa posiłku</Th>
                    <Th color = "rgba(255, 255, 255, 0.800)">Proporcja na</Th>
                    <Th color = "rgba(255, 255, 255, 0.800)">Kalorie</Th>
                    <Th color = "rgba(255, 255, 255, 0.800)">Białka</Th>
                    <Th color = "rgba(255, 255, 255, 0.800)">Węglowodany</Th>
                    <Th color = "rgba(255, 255, 255, 0.800)">Tłuszcze</Th>
                    <Th color = "rgba(255, 255, 255, 0.800)">Dodaj do spożytych</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {paginatedMeals.map(meal => (
                      <Tr key={meal.id}>
                        <Td data-label="Nazwa posiłku">{meal.name}</Td>
                        <Td data-label="Proporcja na">{meal.unit}</Td>
                        <Td data-label="Kalorie">{meal.calories} kcal</Td>
                        <Td data-label="Białka">{meal.proteins} g</Td>
                        <Td data-label="Węglowodany">{meal.carbohydrates} g</Td>
                        <Td data-label="Tłuszcze">{meal.fats} g</Td>
                        <Td className="add-to-eaten">
                          {meal.id >= 6605 && meal.id <= 6640 ? (
                              <Button
                                  colorScheme="green"
                                  onClick={() => setNewEaten(meal.id)}
                              >
                                Dodaj spożyty posiłek
                              </Button>
                          ) : (
                              <Flex>
                                <Input
                                    type="number"
                                    mr = {2}
                                    placeholder="Wpisz wagę w gramach"
                                    _placeholder={{  color: 'rgba(255, 255, 255, 0.800)' }}
                                    value={mealWeights[meal.id] || ''}
                                    onChange={(e) => handleWeightChange(meal.id, e.target.value)}
                                />
                                <IconButton
                                    justifyContent={"center"}
                                    aria-label="Details"
                                    icon={<FaPlus />}
                                    colorScheme="green"
                                    onClick={() => setNewEaten(meal.id)}
                                    isDisabled={!mealWeights[meal.id]}
                                />
                              </Flex>
                          )}
                        </Td>
                      </Tr>
                  ))}
                </Tbody>
              </Table>
              <Flex justifyContent="center" mt="2" align="center">
                {currentPage > 1 && (
                    <Button onClick={() => setCurrentPage(currentPage - 1)}>Poprzednia</Button>
                )}
                <Text fontSize="md" color="white" mx="4">{`${currentPage}/${totalPages}`}</Text>
                {currentPage < totalPages && (
                    <Button onClick={() => setCurrentPage(currentPage + 1)}>Następna</Button>
                )}
              </Flex>
              <Text fontSize="xl" mt={10} fontWeight="bold" color="white">Dzisiejsze spożyte posiłki</Text>
              {eatenMeals.length === 0 ? (
                  <Text color="white" mt="4" textAlign="center">
                    Brak spożytych posiłków w ciągu dnia. Dodaj posiłek powyżej.
                  </Text>
              ) : (<>
                    <Table className="responsive-table" variant="simple" color="white">
                      <Thead>
                        <Tr>
                          <Th color = "rgba(255, 255, 255, 0.800)">Nazwa posiłku</Th>
                          <Th color = "rgba(255, 255, 255, 0.800)">Proporcja na</Th>
                          <Th color = "rgba(255, 255, 255, 0.800)">Kalorie</Th>
                          <Th color = "rgba(255, 255, 255, 0.800)">Białka</Th>
                          <Th color = "rgba(255, 255, 255, 0.800)">Węglowodany</Th>
                          <Th color = "rgba(255, 255, 255, 0.800)">Tłuszcze</Th>
                          <Th color = "rgba(255, 255, 255, 0.800)">Usuń</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {paginatedEatenMeals.map(eatenMeal => (
                            <Tr key={eatenMeal.meal.id}>
                              <Td data-label="Nazwa posiłku">{eatenMeal.meal.name} </Td>
                              <Td data-label="Proporcja na">{eatenMeal.meal.id >= 6605 && eatenMeal.meal.id <= 6640 ?
                                  `${parseInt(parseInt(eatenMeal.meal.unit.replace('g', '')) / 100 * eatenMeal.eatenWeight)} g` :
                                  `${eatenMeal.eatenWeight} g`
                              }</Td>
                              <Td data-label="Kalorie">{(eatenMeal.meal.calories ).toFixed(0)} kcal</Td>
                              <Td data-label="Białka">{(eatenMeal.meal.proteins ).toFixed(1)} g</Td>
                              <Td data-label="Węglowodany">{(eatenMeal.meal.carbohydrates ).toFixed(1)} g</Td>
                              <Td data-label="Tłuszcze">{(eatenMeal.meal.fats ).toFixed(1)} g</Td>

                              <Td className="add-to-eaten">
                                <Button colorScheme="red" onClick={() => handleDelete(eatenMeal.meal.id)}>
                                  Usuń
                                </Button>
                              </Td>
                            </Tr>
                        ))}
                      </Tbody>
                    </Table>

                    <Flex justifyContent="center" mt="2" align="center" mb={5}>
                      {currentPageEaten > 1 && (
                          <Button onClick={() => setCurrentPageEaten(currentPageEaten - 1)}>Poprzednia</Button>
                      )}
                      <Text fontSize="md" color="white" mx="4">{`${currentPageEaten}/${totalPagesEaten}`}</Text>
                      {currentPageEaten < totalPagesEaten && (
                          <Button onClick={() => setCurrentPageEaten(currentPageEaten + 1)}>Następna</Button>
                      )}
                    </Flex>
                  </>
              )}

            </Box>
          </SimpleGrid>
        </Container>
        <Container as="section" maxWidth={"2x1"} py="10px" mb = {7} ml ={{ base: '6', md: '0' }}>
          <SimpleGrid spacing={10} minChildWidth="250px">
            <Box sx={ThirdBox} alignItems="center" minH="300px">
              <Text fontSize="xl" fontWeight="bold">Spożycie w ciągu dnia</Text>
              <EatenMealsSummaryChart eatenMealsSummary={eatenMealsSummary} />
            </Box>
            <Box sx={FourthBox}>
              <Text fontSize="xl" fontWeight="bold">Spożyte kalorie w ostatnim tygodniu</Text>
              <EatenMealsLastWeekChart eatenMealsFromLastWeek={eatenMealsSummary.eatenMealsFromLastWeek} />
            </Box>
          </SimpleGrid>
        </Container>
      </div>
  );
}