import {
  Container,
  Box,
  SimpleGrid,
  Text,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Input, ModalFooter, IconButton
} from '@chakra-ui/react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import React, {useEffect, useState} from 'react'
import {getCurrentUser, getUserSummary, getUserWeight} from "../util/APIUtils";
import {useNavigate} from "react-router-dom";
import {ACCESS_TOKEN, API_BASE_URL} from "../constans";
import axios from "axios";
import {FaInfoCircle} from "react-icons/fa";
export function calculatePercentWeight(weight, estimatedWeight) {
  let percentWeight = 100 -(weight / estimatedWeight) * 100;
  if (percentWeight > 100) {
    percentWeight = 100;
  }
  return Math.floor(percentWeight);
}

export function calculateWeightCircular(weight, estimatedWeight) {
  let difWeight = weight - estimatedWeight;
  return Math.floor(difWeight);
}
function calculateBMI(weight, height) {
  if (height <= 0) {
    return { bmiValue: null, bmiCategory: "" };
  }
  const bmi = weight / ((height/100) ** 2);
  const bmiValue = Math.round(bmi * 10) / 10;
  let bmiCategory;
  if (bmi < 16.0) {
    bmiCategory = "niedowaga (wygłodzenie)";
  } else if (bmi >= 16.0 && bmi < 17.0) {
    bmiCategory = "niedowaga (wychudzenie)";
  } else if (bmi >= 17.0 && bmi < 18.5) {
    bmiCategory = "niedowaga";
  } else if (bmi >= 18.5 && bmi < 25.0) {
    bmiCategory = "pożądana masa ciała";
  } else if (bmi >= 25.0 && bmi < 30.0) {
    bmiCategory = "nadwaga";
  } else if (bmi >= 30.0 && bmi < 35.0) {
    bmiCategory = "otyłość I stopnia";
  } else if (bmi >= 35.0 && bmi < 40.0) {
    bmiCategory = "otyłość II stopnia";
  } else {
    bmiCategory = "otyłość III stopnia";
  }
  return { bmiValue, bmiCategory };
}
export function calculateWeightCircularPercent(weight, estimatedWeight) {
  let percentWeight;
  if (weight > estimatedWeight) {
    percentWeight = ((weight - estimatedWeight) / weight) * 100;
    percentWeight = 100 - percentWeight;
  } else {
    percentWeight = ((estimatedWeight - weight) / estimatedWeight) * 100;
    percentWeight = 100 - percentWeight;
  }
  return Math.floor(percentWeight);
}
export function handleSetWeight(requestBody) {
  const token = localStorage.getItem(ACCESS_TOKEN);

  if (!token) {
    return Promise.reject("No access token set.");
  }

  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
  return axios.post(`${API_BASE_URL}/weight`, requestBody, config);
}
export function calculatePercentWater(weight, estimatedWeight) {
  let percentWeight = (weight / estimatedWeight) * 100;
  if (percentWeight > 100) {
    percentWeight = 100;
  } else if (percentWeight < 0) {
    percentWeight = 0;
  }
  return Math.floor(percentWeight);
}

export default function Monitor() {
  const [weightDifference, setWeightDifference] = useState(0);
  const [weight, setWeight] = useState();
  const navigate = useNavigate();
  const [summary, setSummary] = useState(null);
  const [user, setUser] = useState(null);
  const [isIndeterminate, setIsIndeterminate] = useState(true);
  const [isWeightModalOpen, setIsWeightModalOpen] = useState(false);
  const [isBMIModalOpen, setIsBMIModalOpen] = useState(false);
  const [isBMRModalOpen, setIsBMRModalOpen] = useState(false);
  const [newWeight, setNewWeight] = useState('');
  useEffect(() => {
    if (summary && summary.todayWeight === 0) {
      setIsWeightModalOpen(true);
    }
  }, [summary]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsIndeterminate(false);
    }, 2000);

    return () => clearTimeout(timer); // cleanup the timer
  }, []);

  const weightValue = summary && summary.todayWeight != null && summary.targetWeight != null
      ? `${calculateWeightCircular(summary.todayWeight, summary.targetWeight)}`
      : '';

  const waterValue = summary && summary.waterToday != null && summary.waterDemand != null
      ? `${calculatePercentWater(summary.waterToday, summary.waterDemand)}`
      : '';

  const weightValuePercent = summary && summary.todayWeight != null && summary.targetWeight != null
      ? `${calculateWeightCircularPercent(summary.todayWeight, summary.targetWeight)}`
      : '';

  const openBMIModal = () => setIsBMIModalOpen(true);
  const closeBMIModal = () => setIsBMIModalOpen(false);

  const openBMRModal = () => setIsBMRModalOpen(true);
  const closeBMRModal = () => setIsBMRModalOpen(false);

  const fetchSummarData = async () => {
    getUserSummary()
        .then(response => {
          setSummary(response.data);
        })
        .catch(error => {
          console.error('Błąd podczas pobierania danych użytkownika', error);
        });
  };
  const handleWeightChange = async () => {
    let weightRequest = {
      weight: newWeight
    };

    try {
      await handleSetWeight(weightRequest);
      setNewWeight('');
      setIsWeightModalOpen(false);
      await fetchData();
    } catch (error) {
      console.error('Error updating weight', error);
    }
  };
  const currentDate = new Date().toLocaleDateString('pl-PL');
  const fetchUserWeight = () => {
    getUserWeight()
        .then(response => {
          const processedData = response.data.map(item => ({
            date: item.date,
            waga: item.weight
          }));
          processedData.sort((a, b) => new Date(a.date) - new Date(b.date));
          setWeight(processedData);
          if (processedData.length >= 2) {
            const lastIndex = processedData.length - 1;
            const lastWeight = processedData[lastIndex].waga;
            const secondLastWeight = processedData[lastIndex - 1].waga;
            const difference = lastWeight - secondLastWeight;
            setWeightDifference(difference);
          }
        })
        .catch(error => {
          console.error('Błąd podczas pobierania danych użytkownika', error);
        });
  };
  const fetchUserData = () => {
    getCurrentUser()
        .then(response => {
          setUser(response.data);
        })
        .catch(error => {
          console.error('Błąd podczas pobierania danych użytkownika', error);
        });
  };
  const fetchData = async () => {
    await Promise.all([fetchSummarData(), fetchUserWeight(), fetchUserData()]);
  };

  useEffect(() => {
    fetchSummarData();
    fetchUserData();
    fetchUserWeight();
  }, []);


  const FirstBox = {
    bgGradient: "linear(to-r, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6))",
    h: "100px",
    color: "white",
    borderRadius: "lg",
    p: "20px",
    textAlign: "center"
  }

  const SecondBox = {
    h: "210px",
    color: "white",
    borderRadius: "lg",
    p: "20px",
    textAlign: "left"
  }

  const ThirdBox = {
    bgGradient: "linear(to-r, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6))",
    h: "400px",
    color: "white",
    borderRadius: "lg",
    p: "20px",
    textAlign: "center"
  }

  const miniBox = {
    h: "60px",
    w: "120%",
    color: "white",
    borderRadius: "lg",
    p: "5px",
    mt: "5px",
  }

  const redNumber = {
    color: "red"
  }
  return (
      <div className="App">
        <Container as="section" maxWidth={"3x1"} py="10px" ml ={{ base: '5', md: '0' }}>
          <SimpleGrid spacing={10} minChildWidth="250px">
            <Box sx={SecondBox} bgImage="url('img/medusa.png')" backgroundSize='cover'>
              <Text>
                {user ? `${user.firstName} ${user.lastName}` : ''}</Text>
                <Text>
                <span style={{ color: "#A0AEC0" }}>Miło Cię znów widzieć!</span>
                </Text>
              <Text>
                <span style={{ color: "#A0AEC0" }}>Obserwuj postępy.</span>
              </Text>

            </Box>

            <Box sx={SecondBox} bgGradient="linear(to-r, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6))">
              <Flex justifyContent={"flex-start"}>
              <Text fontSize="xl" fontWeight="bold">Miernik osiągnięć</Text>
              <IconButton
                  ml={4}
                  aria-label="Show BMI Info"
                  icon={<FaInfoCircle />}
                  onClick={openBMIModal}
                  size="sm"
                  colorScheme="blue"
              />
              </Flex>
              <Flex justifyContent={"flex-start"}>
                <Text ><span style={{ color: "#A0AEC0", fontSize: 'small' }}>Wskaźnik masy ciała: {summary && user ? calculateBMI(summary.todayWeight, user.height).bmiValue : ''} to {summary && user ? calculateBMI(summary.todayWeight, user.height).bmiCategory : ''}.  <br></br> Dążysz do {summary ? summary.targetWeight : ''}kg</span>
                </Text>

                <Flex justifyContent="right">
                  <CircularProgress
                      isIndeterminate={isIndeterminate}
                      value={!isIndeterminate ? parseInt(weightValuePercent) : undefined}
                      color='green.300'
                      size={{ base: '120px', md: '150px' }}
                      thickness='14px'
                  >
                    <CircularProgressLabel>
                      {weightValue}kg
                    </CircularProgressLabel>
                  </CircularProgress>
                </Flex>
              </Flex>
            </Box>
            <Modal isOpen={isWeightModalOpen} onClose={() => setIsWeightModalOpen(false)}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Proszę uzupełnij dzisiejszą wagę</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Input
                      placeholder="Wprowadź swoją wagę w kg"
                      type="number"
                      value={newWeight}
                      onChange={(e) => setNewWeight(e.target.value)}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="blue" onClick={handleWeightChange}>
                    Zapisz
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            <Box sx={SecondBox} bgGradient="linear(to-r, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6))">
              <Flex justifyContent={"space-between"}>
              <Text fontSize="xl" fontWeight="bold">Spożycie wody</Text>
              <Button
                  size='sm'
                  colorScheme="teal"
                  onClick={() => {navigate('/water')}}
              >
                Edytuj
              </Button>
              </Flex>
              <Flex justifyContent={"flex"}>
              <Flex direction="column" alignItems="center" justifyContent="center">

                <Box sx={miniBox} bgGradient="linear(to-r, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6))">
                  <Text fontSize="md" ml="10px"><span style={{ color: "#A0AEC0" }}>Dzienny cel</span></Text>
                  <Text fontSize="md" fontWeight="bold" ml="15px">{summary ? `${summary.waterDemand} ml` : ''}</Text>
                </Box>

                <Box sx={miniBox} bgGradient="linear(to-r, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6))">
                  <Text fontSize="md" ml="10px"><span style={{ color: "#A0AEC0" }}>Osiągnięto</span></Text>
                  <Text fontSize="md" fontWeight="bold" ml="15px">{summary ? `${summary.waterToday} ml`: ''}</Text>
                </Box>
                </Flex>
                <Box sx={{ justifyContent: 'right' }} ml = {30}>
                  <CircularProgress
                      isIndeterminate={isIndeterminate}
                      value={!isIndeterminate ? waterValue : undefined}
                      size={{ base: '100px', md: '150px' }}
                      thickness='7'
                  >
                    <CircularProgressLabel>
                      {waterValue}%
                    </CircularProgressLabel>
                  </CircularProgress>
                </Box>
              </Flex>

            </Box>
          </SimpleGrid>
        </Container>

        <Container as="section" maxWidth={"4x1"} py="10px" ml ={{ base: '5', md: '0' }}>
          <SimpleGrid spacing={10} minChildWidth="250px">
            <Box sx={FirstBox}>
              <Flex justifyContent={"space-between"}>
              <Text fontSize="xl" ml={{base: "10", md: "17"}} fontWeight="bold">Zapotrzebowanie</Text>
              <IconButton
                  ml={2}
                  aria-label="Show BMR Info"
                  icon={<FaInfoCircle />}
                  onClick={openBMRModal}
                  size="sm"
                  colorScheme="blue"
              />
              </Flex>
              <Text>{summary ? summary.caloriesDemand : ''} kcal</Text>
            </Box>
            <Box sx={FirstBox}>
              <Text fontSize="xl" fontWeight="bold">Dzisiejsze kalorie</Text>
              <Text>{summary ? summary.caloriesConsumedToday : ''} kcal</Text>
            </Box>
            <Box sx={FirstBox}>
              <Text sx={summary ? summary.caloriesLeftToday : '' < 0 ? redNumber : ""} fontSize="xl" fontWeight="bold">Pozostało</Text>
              <Text sx={summary ? summary.caloriesLeftToday : '' < 0 ? redNumber : ""} >{summary ? summary.caloriesLeftToday : ''} kcal</Text>
            </Box>
            <Box sx={FirstBox}>
              <Text fontSize="xl" fontWeight="bold">Waga</Text>
              <Text>
                {summary ? summary.todayWeight : ''} kg </Text>
              <Text> <span style={{
                color: "green",
              }}>{summary ? `zostało ${calculatePercentWeight(summary.todayWeight, summary.targetWeight)}% wagi do celu` : ''}</span>
              </Text>
            </Box>
          </SimpleGrid>
        </Container>

        <Container as="section" maxWidth={"2x1"} py="10px" ml ={{ base: '5', md: '0' }}>
          <SimpleGrid spacing={10} minChildWidth="250px">
            <Flex sx={ThirdBox} flexDirection="column" alignItems="center">
              <Text fontSize="xx-large" >Waga</Text>
              <Text>
                Od ostatniego pomiaru zmiana wynosi: <span style={{ color: "green", marginRight:"50px"}}>{weightDifference}kg</span> Ostatni pomiar wykonano: <span style={{ color: "green" }}>{currentDate}</span>
              </Text>
              <ResponsiveContainer>
                <AreaChart
                    data={weight}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="waga" stroke="#8884d8" fill="light_blue" />
                </AreaChart>
              </ResponsiveContainer>
            </Flex>
          </SimpleGrid>
        </Container>

        <Modal isOpen={isBMIModalOpen} onClose={closeBMIModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Wzór na BMI (Wskaźnik masy ciała)</ModalHeader>
            <ModalCloseButton/>
            <ModalBody>
              BMI = (Masa (kg)) / (Wzrost (m)^2)
            </ModalBody>
            <br></br>
          </ModalContent>
        </Modal>

        <Modal isOpen={isBMRModalOpen} onClose={closeBMRModal} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Wzory na BMR (Zapotrzebowanie kaloryczne)</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>Wykorzystano uproszczony wzór Harrisa-Benedicta:</Text>
              <Text>
              Dla mężczyzn: BMR = 66,47 + (5 × wysokość w cm) + (13,7 × waga w kg) - (6,8 × wiek w latach)
              </Text>
              <Text>
              Dla kobiet: BMR = 655,1 + (1,8 × wysokość w cm) + (9,6 × waga w kg) - (4,7 × wiek w latach)
              </Text>
            </ModalBody>
            <br></br>
          </ModalContent>
        </Modal>
      </div>
  )
}