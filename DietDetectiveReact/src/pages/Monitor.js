import {
  Container,
  Box,
  SimpleGrid,
  Text,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Image,
  Button
} from '@chakra-ui/react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import React, {useEffect, useState} from 'react'
import {getCurrentUser, getUserSummary, getUserWeight} from "../util/APIUtils";
import {useNavigate} from "react-router-dom";
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

export function calculateWeightCircularPercent(weight, estimatedWeight) {
  let percentWeight;
  if (weight > estimatedWeight) {
    percentWeight = ((weight - estimatedWeight) / weight) * 100;
    percentWeight = 100 - percentWeight; // This will give a value greater than 100 if the weight is above the target
  } else {
    percentWeight = ((estimatedWeight - weight) / estimatedWeight) * 100;
    percentWeight = 100 - percentWeight; // This will give a value less than 100 if the weight is below the target
  }
  return Math.floor(percentWeight);
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
  console.log(weightValuePercent)
  const fetchSummarData = async () => {
    getUserSummary()
        .then(response => {
          setSummary(response.data);
          console.log(response.data);
        })
        .catch(error => {
          console.error('Błąd podczas pobierania danych użytkownika', error);
        });
  };
  const currentDate = new Date().toLocaleDateString('pl-PL');
  const fetchUserWeight = () => {
    getUserWeight()
        .then(response => {
          const processedData = response.data.map(item => ({
            date: item.date,
            waga: item.weight
          }));
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
          console.log(response.data);
        })
        .catch(error => {
          console.error('Błąd podczas pobierania danych użytkownika', error);
        });
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
    h: "200px",
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
        <Container as="section" maxWidth={"4x1"} py="10px">
          <SimpleGrid spacing={10} minChildWidth="250px">
            <Box sx={FirstBox}>
              <Text fontSize="xl" fontWeight="bold">Zapotrzebowanie</Text>
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

        <Container as="section" maxWidth={"3x1"} py="10px">
          <SimpleGrid spacing={10} minChildWidth="250px">
            <Box sx={SecondBox} bgImage="url('img/medusa.png')" backgroundSize='cover'>
              <Text>
                {user ? `${user.firstName} ${user.lastName}` : ''}</Text>
                <Text>
                <span style={{ color: "#A0AEC0" }}>Miło Cię znów widzieć!</span>
                </Text>
              <Text>
                <span style={{ color: "#A0AEC0" }}>Obserwuj swoje postępy.</span>
              </Text>

            </Box>

            <Box sx={SecondBox} bgGradient="linear(to-r, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6))">

              <Text fontSize="xl" fontWeight="bold">Miernik osiągnięć</Text>
              <Flex justifyContent={"flex-start"}>
                <Text><span style={{ color: "#A0AEC0" }}>Dążysz do {summary ? summary.targetWeight : ''}kg </span>
                </Text>
                <Text><span style={{ color: "#A0AEC0" }}>Cel: {user ? user.goal : ''} </span>
                </Text>

                <Flex justifyContent="right">
                  <CircularProgress
                      isIndeterminate={isIndeterminate}
                      value={!isIndeterminate ? parseInt(weightValuePercent) : undefined}
                      color='green.300'
                      size='150px'
                      thickness='14px'
                  >
                    <CircularProgressLabel>
                      {weightValue}kg
                    </CircularProgressLabel>
                  </CircularProgress>
                </Flex>
              </Flex>
            </Box>

            <Box sx={SecondBox} bgGradient="linear(to-r, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6))">
              <Flex justifyContent={"space-between"}>
              <Text fontSize="xl" fontWeight="bold">Spożycie wody</Text>
              <Button
                  size='sm'
                  colorScheme="teal" // Wybierz odpowiedni kolor
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
                      value={!isIndeterminate ?  waterValue : undefined}
                      size='150px'
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

        <Container as="section" maxWidth={"2x1"} py="10px">
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

      </div>
  )
}