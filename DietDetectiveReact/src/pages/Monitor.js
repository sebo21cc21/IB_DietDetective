import { Container, Box, SimpleGrid, Text, Heading, CircularProgress, CircularProgressLabel, Flex, Image, List, ListItem, Progress, Input, Button, Table } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react';
import { FaTimes } from "react-icons/fa";
import axios from 'axios';
import { determineGoal, calculateBMR, calculateAge, calculatePercentWeight } from './Account';
export default function Monitor() {
  const [lastMeals, setLastMeals] = useState([]);
  const [isInputValid, setIsInputValid] = useState(false);
  const [newMeal, setNewMeal] = useState({ idIngredientCharacter: 1, name: "", unit: "szt", amountOfCalories: 0.0, amountOfCarbohydrates: 0.0, amountOfProteins: 0.0, amountOfFats: 0.0 });
  const FirstBox = {
    bgGradient: "linear(to-r, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6))",
    h: "100px",
    color: "white",
    borderRadius: "lg",
    p: "20px",
    textAlign: "center"
  }

  const SecondBox = {
    h: "200px",
    color: "white",
    borderRadius: "lg",
    p: "20px",
    textAlign: "left"
  }

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
    maxH: "350px", // Ustawia maksymalną wysokość kontenera
    borderRadius: "lg",
    p: "20px",
    textAlign: "center",
    overflowY: "auto", // Dodaje pasek przewijania, jeśli zawartość przekracza maksymalną wysokość
  };
  const miniBox = {
    h: "60px",
    w: "50%",
    color: "white",
    borderRadius: "lg",
    p: "5px",
    mt: "5px",
  }
  const errorInput = {
    border: "solid red"
  }
  const redNumber = {
    color: "red"
  }
  const [inputErrors, setInputErrors] = useState({
    name: false,
    amountOfCalories: false,
    amountOfCarbohydrates: false,
    amountOfProteins: false,
    amountOfFats: false
  });
  const [userData, setUserData] = useState(null);

  //Person
  useEffect(() => {
    axios.get('http://localhost:8080/person?limit=1')
      .then(response => {
        const sortedPerson = response.data.sort((a, b) => b.id - a.id);
        const lastPerson = sortedPerson.slice(0, 1);
        setUserData(lastPerson[0]);
      })
      .catch(error => console.error(error));
  }, []);

  //Ingerdeint
  useEffect(() => {
    fetch('http://localhost:8080/ingredient?limit=10') // Dodaj parametr limit do żądania HTTP
      .then(response => response.json())
      .then(data => {
        const sortedMeals = data.sort((a, b) => b.id - a.id); // Sortuj posiłki według ID w kolejności malejącej
        const last10Meals = sortedMeals.slice(0, 10); // Ogranicz liczbę posiłków do 10
        setLastMeals(last10Meals);
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    // Sprawdzanie poprawności wprowadzonych danych
    const { name, amountOfCalories, amountOfCarbohydrates, amountOfProteins, amountOfFats } = newMeal;
    const isValid =
      name.trim() !== "" &&
      !isNaN(parseFloat(amountOfCalories)) &&
      !isNaN(parseFloat(amountOfCarbohydrates)) &&
      !isNaN(parseFloat(amountOfProteins)) &&
      !isNaN(parseFloat(amountOfFats));
    setIsInputValid(isValid);
  }, [newMeal]);

  const deleteMeal = async (mealId) => {
    try {
      const response = await fetch(`http://localhost:8080/ingredient/${mealId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setLastMeals(prevMeals => prevMeals.filter(meal => meal.id !== mealId));
      } else {
        throw new Error('Error deleting meal');
      }
    } catch (error) {
      console.error(error);
    }
  };
  const addMeal = () => {
    if (!isInputValid) {
      return; // Jeśli dane nie są poprawne, nie dodawaj posiłku
    }
    // Wysyłanie żądania POST na http://localhost:8080/ingredient
    fetch('http://localhost:8080/ingredient', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMeal),
    })
      .then(response => response.json())
      .then(data => {
        // Aktualizowanie listy ostatnio spożytych posiłków
        setLastMeals(prevMeals => [data, ...prevMeals]);
      })
      .catch(error => console.error(error));
  };


  const handleNewMealChange = event => {
    const { name, value } = event.target;
    setNewMeal(prevMeal => ({ ...prevMeal, [name]: value }));

    if (name === "name") {
      setInputErrors(prevErrors => ({ ...prevErrors, name: value.trim() === "" }));
    } else {
      setInputErrors(prevErrors => ({
        ...prevErrors,
        [name]: isNaN(parseFloat(value))
      }));
    }
  };

  const [todayCalories, setTodayCalories] = useState(0);
  const [todayCarbohydrates, setTodayCarbohydrates] = useState(0);
  const [todayProteins, setTodayProteins] = useState(0);
  const [todayFats, setTodayFats] = useState(0);
  useEffect(() => {
    const fetchTodayCalories = async () => {
      const calories = await calculateTodayCalories();
      setTodayCalories(calories);
    };

    fetchTodayCalories();
  }, []);

  useEffect(() => {
    const fetchTodayNutrient = async () => {
      const calories = await calculateTodayNutrient("amountOfCarbohydrates");
      setTodayCarbohydrates(calories);
    };

    fetchTodayNutrient();
  }, []);

  useEffect(() => {
    const fetchTodayNutrient = async () => {
      const calories = await calculateTodayNutrient("amountOfProteins");
      setTodayProteins(calories);
    };

    fetchTodayNutrient();
  }, []);

  useEffect(() => {
    const fetchTodayNutrient = async () => {
      const calories = await calculateTodayNutrient("amountOfFats");
      setTodayFats(calories);
    };

    fetchTodayNutrient();
  }, []);

  const calculateTodayCalories = async () => {
    try {
      const response = await fetch('http://localhost:8080/ingredient', {
        method: 'GET',
      });
      const ingredients = await response.json();
      let todayCalories = 0;

      ingredients.forEach((ingredient) => {
        todayCalories += ingredient.amountOfCalories;
      });

      return todayCalories;
    } catch (error) {
      console.error(error);
    }
  };

  const calculateTodayNutrient = async (nutrientType) => {
    try {
      const response = await fetch('http://localhost:8080/ingredient', {
        method: 'GET',
      });
      const ingredients = await response.json();
      let todayNutrient = 0;

      ingredients.forEach((ingredient) => {
        todayNutrient += ingredient[nutrientType];
      });

      return todayNutrient;
    } catch (error) {
      console.error(error);
    }
  };

  const age = calculateAge(userData && userData.dateOfBirth);
  const percentWeight = calculatePercentWeight(userData && userData.weight, userData && userData.estimated_weight);
  const BMR = calculateBMR(userData && userData.gender, userData && userData.weight, userData && userData.height, age);
  const goal = determineGoal(userData && userData.weight, userData && userData.estimated_weight);
  const remainingCalories = BMR - todayCalories;
  return (
    <div className="App">
      <Container as="section" maxWidth={"4x1"} py="10px">
        <SimpleGrid spacing={10} minChildWidth="250px">
          <Box sx={FirstBox}>
            <Text fontSize="xl" fontWeight="bold">Zapotrzebowanie</Text>
            <Text>{BMR} kcal</Text>
          </Box>
          <Box sx={FirstBox}>
            <Text fontSize="xl" fontWeight="bold">Dzisiejsze kalorie</Text>
            <Text >{todayCalories} kcal</Text>
          </Box>
          <Box sx={FirstBox}>
            <Text sx={remainingCalories < 0 ? redNumber : ""} fontSize="xl" fontWeight="bold">Pozostało</Text>
            <Text sx={remainingCalories < 0 ? redNumber : ""}>{remainingCalories} kcal</Text>
          </Box>
          <Box sx={FirstBox}>
            <Text fontSize="xl" fontWeight="bold">Waga</Text>
            <Text>
              {userData && userData.weight} kg <span style={{ color: "green", fontSize: "75%" }}>{100 - percentWeight}%</span></Text>
          </Box>
        </SimpleGrid>
      </Container>

      <Container as="section2" maxWidth={"3x1"} py="10px">
        <SimpleGrid spacing={10} minChildWidth="250px">
          <Box sx={SecondBox} bgImage="url('img/medusa.png')" backgroundSize='cover'>
            <Text>
              Witaj ponownie!<br />
              <Heading size='lg'>{userData && userData.name} {userData && userData.surname}</Heading>
              <span style={{ color: "#A0AEC0" }}>Miło Cię znów widzieć!<br />
                Czy masz jakieś pytania?</span>
            </Text>
          </Box>

          <Box sx={SecondBox} bgGradient="linear(to-r, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6))">

            <Text fontSize="xl" fontWeight="bold">Miernik osiągnięć</Text>
            <Flex justifyContent="left">
              <Flex>
                <Text><span style={{ color: "#A0AEC0" }}>Dążysz do {userData && userData.estimated_weight} kg </span></Text>
                <Text><span style={{ color: "#A0AEC0" }}>Cel: {goal} </span></Text>
              </Flex>
              <Flex justifyContent="right">
                <CircularProgress value={86} color='green.300' size='150px' thickness='14px'>
                  <CircularProgressLabel>86%</CircularProgressLabel>
                </CircularProgress>
              </Flex>
            </Flex>
          </Box>

          <Box sx={SecondBox} bgGradient="linear(to-r, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6))">
            <Text fontSize="xl" fontWeight="bold">Spożycie wody</Text>
            <Flex justifyContent={"flex"}>

              <Box sx={miniBox} bgGradient="linear(to-r, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6))">

                <Text fontSize="md" ml="10px"><span style={{ color: "#A0AEC0" }}>Dzienny cel</span></Text>
                <Text fontSize="md" fontWeight="bold" ml="15px">2 500 ml</Text>

              </Box>

              <Box sx={miniBox} bgGradient="linear(to-r, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6))">
                <Text fontSize="md" ml="10px"><span style={{ color: "#A0AEC0" }}>Osiągnięto</span></Text>
                <Text fontSize="md" fontWeight="bold" ml="15px">1 000 ml</Text>
              </Box>

              <Box sx={{ justifyContent: 'right' }}>
                <CircularProgress variant="determinate" value={40} size='120px' thickness={5}>
                  <CircularProgressLabel>40%</CircularProgressLabel>
                </CircularProgress>
              </Box>
            </Flex>
          </Box>
        </SimpleGrid>
      </Container>

      <Container as="section" maxWidth={"2x1"} py="10px">
        <SimpleGrid spacing={10} minChildWidth="250px">
          <Box sx={ThirdBox}>
            <Text fontSize="xl" fontWeight="bold">Waga</Text>
            <Text>
              <span style={{ color: "green" }}>-5kg</span> <span style={{ color: "grey" }}>2023</span>
            </Text>
            <Image mt="40px" src="img/Graph.png"></Image>
          </Box>
          <Box sx={ThirdBox}>
            <Image src="img/Graph2.png"></Image>
            <Text fontSize="xl" fontWeight="bold">Spożycie w ostatnim tygodniu</Text>
            <Text><span style={{ color: "green" }}>(+23 %)</span> <span style={{ color: "grey" }}>niż poprzedni tydzień</span></Text>
            <Flex justifyContent={'flex-start'} >

              <List mx="10%">
                <ListItem>
                  <Text>Węglowodany</Text>
                </ListItem>
                <ListItem>
                  <Text>{todayCarbohydrates} g</Text>
                </ListItem>
                <Progress size='xs' value={50} />
              </List>

              <List mx="10%">
                <ListItem>
                  <Text>Tłuszcze</Text>
                </ListItem>
                <ListItem>
                  <Text>{todayFats} g</Text>
                </ListItem>
                <Progress size='xs' value={79} />
              </List>

              <List mx="10%">
                <ListItem>
                  <Text>Białka</Text>
                </ListItem>
                <ListItem>
                  <Text>{todayProteins} g</Text>
                </ListItem>
                <Progress size='xs' value={79} />
              </List>
            </Flex>

          </Box>

        </SimpleGrid>
      </Container>

      <Container as="section4" maxWidth={"2x1"} py="10px">
        <SimpleGrid spacing={10} minChildWidth="250px">
          <Box sx={FourthBox}>
            <Text fontSize="xl" fontWeight="bold">Ostatnio spożyte posiłki</Text>
            <Flex justifyContent="center">
              <Input type="text" name="name" value={newMeal.name} onChange={handleNewMealChange} placeholder="Nazwa" sx={inputErrors.name ? errorInput : ""} />
              <Input type="text" name="amountOfCalories" value={newMeal.amountOfCalories} onChange={handleNewMealChange} placeholder="Kalorie" sx={inputErrors.amountOfCalories ? errorInput : ""} />
              <Input type="text" name="amountOfCarbohydrates" value={newMeal.amountOfCarbohydrates} onChange={handleNewMealChange} placeholder="Węglowodany" sx={inputErrors.amountOfCarbohydrates ? errorInput : ""} />
              <Input type="text" name="amountOfProteins" value={newMeal.amountOfProteins} onChange={handleNewMealChange} placeholder="Białka" sx={inputErrors.amountOfProteins ? errorInput : ""} />
              <Input type="text" name="amountOfFats" value={newMeal.amountOfFats} onChange={handleNewMealChange} placeholder="Tłuszcze" sx={inputErrors.amountOfFats ? errorInput : ""} />
              <Button colorScheme="messenger" w="full" onClick={addMeal}>Dodaj</Button>
            </Flex>

            <Flex justifyContent="center">
              <Table>
                <thead>
                  <tr>
                    <th>Posiłek</th>
                    <th>Ilość</th>
                    <th>Kalorie</th>
                    <th>Węglowodany</th>
                    <th>Białka</th>
                    <th>Tłuszcze</th>
                    <th>Usuń</th>
                  </tr>
                </thead>
                <tbody>
                  {lastMeals.map(meal => (
                    <tr key={meal.id}>
                      <td>{meal.name}</td>
                      <td>{meal.unit}</td>
                      <td>{meal.amountOfCalories}</td>
                      <td>{meal.amountOfCarbohydrates}</td>
                      <td>{meal.amountOfProteins}</td>
                      <td>{meal.amountOfFats}</td>
                      <td style={{ paddingLeft: '2%' }}>
                        <FaTimes
                          style={{ cursor: 'pointer' }}
                          onClick={() => deleteMeal(meal.id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Flex>
          </Box>
          <Box sx={FourthBox}>
            <Text fontSize="xl" fontWeight="bold">Makroskładniki z dnia</Text>
            <Text>Cel</Text>
            <Flex justifyContent="space-around" alignItems="center">
              <Box sx={miniBox}>
                <Text fontSize="lg" fontWeight="bold">Węglowodany</Text>
                <CircularProgress
                  value={(todayCarbohydrates / (3 * (userData && userData.weight))) * 100}
                  size='170px'
                  color="green"
                  thickness='4px'
                >
                  <CircularProgressLabel>
                    Cel <br></br>
                    {Math.min(Math.floor((todayCarbohydrates / (3 * (userData && userData.weight))) * 100), 100)}%
                  </CircularProgressLabel>
                </CircularProgress>
                {Math.min(Math.floor((todayCarbohydrates / (3 * (userData && userData.weight))) * 100), 100) === 100 ? (
                  <Text fontSize="lg" fontWeight="bold"><span style={{ color: "green" }}>Osiągnięto</span></Text>
                ) : (
                  <Text fontSize="lg" fontWeight="bold">Nie osiągnięto</Text>
                )}
              </Box>

              <Box sx={miniBox}>
                <Text fontSize="lg" fontWeight="bold">Białko</Text>
                <CircularProgress
                  value={(todayProteins / (userData && userData.weight)) * 100}
                  size='170px'
                  color="blue"
                  thickness='4px'
                >
                  <CircularProgressLabel>
                    Cel <br></br>
                    {Math.min(Math.floor((todayProteins / (userData && userData.weight)) * 100), 100)}%
                  </CircularProgressLabel>
                </CircularProgress>
                {Math.min(Math.floor((todayProteins / (userData && userData.weight)) * 100), 100) === 100 ? (
                  <Text fontSize="lg" fontWeight="bold"><span style={{ color: "green" }}>Osiągnięto</span></Text>
                ) : (
                  <Text fontSize="lg" fontWeight="bold">Nie osiągnięto</Text>
                )}
              </Box>

              <Box sx={miniBox}>
                <Text fontSize="lg" fontWeight="bold">Tłuszcze</Text>
                <CircularProgress
                  value={Math.floor((todayFats / (userData && userData.weight)) * 100)}
                  size='170px'
                  color="red"
                  thickness='4px'
                >
                  <CircularProgressLabel>
                    Cel <br></br>
                    {Math.min(Math.floor((todayFats / (userData && userData.weight)) * 100), 100)}%
                  </CircularProgressLabel>
                </CircularProgress>
                {Math.min(Math.floor((todayFats / (userData && userData.weight)) * 100), 100) === 100 ? (
                  <Text fontSize="lg" fontWeight="bold"><span style={{ color: "green" }}>Osiągnięto</span></Text>
                ) : (
                  <Text fontSize="lg" fontWeight="bold">Nie osiągnięto</Text>
                )}
              </Box>

            </Flex>
          </Box>
        </SimpleGrid>
      </Container>
    </div>
  )
}
