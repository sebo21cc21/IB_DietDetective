import { CircularProgress, CircularProgressLabel, Container, Flex, Heading } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Box, SimpleGrid, Text, Image } from '@chakra-ui/react';
import axios from 'axios';

export function determineGoal(weight, estimatedWeight) {
  if (weight > estimatedWeight) {
    return "Zrzucenie wagi";
  } else if (weight < estimatedWeight) {
    return "Masa";
  } else {
    return "Utrzymanie";
  }
}

export function calculateBMR(gender, weight, height, age) {
  let BMR = 0;

  if (gender === 'M' || gender === 'Mężczyzna' || gender === 'Mezczyzna' || gender === 'Chlopak'){
    BMR = Math.floor(66 + (13.7 * weight) + (5 * height) - (6.8 * age));
  } else if (gender === 'K' || gender === 'D' || gender === 'Kobieta' || gender === 'Dziewczyna'){
    BMR = Math.floor(655 + (9.6 * weight) + (1.8 * height) - (4.7 * age));
  }
  
  return BMR;
}

export function calculateAge(dateOfBirth) {
  const birthDate = new Date(dateOfBirth);
  const currentDate = new Date();
  const age = currentDate.getFullYear() - birthDate.getFullYear();
  return age;
}

export function calculatePercentWeight(weight, estimatedWeight) {
  const percentWeight = (weight / estimatedWeight) * 100;
  return Math.floor(percentWeight);
}

export function calculateTimeSinceRegistration(registrationDate) {
  const currentDate = new Date();
  const modifiedDate = new Date(registrationDate);
  const timeDifference = currentDate - modifiedDate;
  const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  return hours + " godzin " + minutes + " minut";
}
export default function Account() {
  const FirstBox = {
    h: "100px",
    color: "white",
    borderRadius: "lg",
    p: "20px",
    textAlign: "center"
  };
  const SecondBox = {
    h: "200px",
    color: "white",
    borderRadius: "lg",
    p: "20px",
    textAlign: "left"
  };
  const ThirdBox = {
    bgGradient: "linear(to-r, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6))",
    h: "250px",
    color: "white",
    borderRadius: "lg",
    p: "20px",
    mx: "150px",
    textAlign: "center"
  };
  const miniBox = {
    h: "60px",
    color: "white",
    w: "110%",
    borderRadius: "lg",
    p: "5px",
    mt: "5px",
    ml: "80%"
  };
  const miniBox2 = {
    h: "60px",
    w: "150%",
    color: "white",
    borderRadius: "lg",
    p: "5px",
    mt: "5px",
    ml: "40%"
  };

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/person?limit=1')
      .then(response => {
        const sortedPerson = response.data.sort((a, b) => b.id - a.id);
        const lastPerson = sortedPerson.slice(0, 1);
        setUserData(lastPerson[0]);
      })
      .catch(error => console.error(error));
  }, []);

  const age = calculateAge(userData && userData.dateOfBirth);
  const percentWeight = calculatePercentWeight(userData && userData.weight, userData && userData.estimated_weight);
  const BMR = calculateBMR(userData && userData.gender, userData && userData.weight, userData && userData.height, age);
  const timeSinceRegistration = calculateTimeSinceRegistration(userData && userData.modifiedDate);
  const goal = determineGoal(userData && userData.weight, userData && userData.estimated_weight);
  return (
    <Box>
      <Container as="section" maxWidth={"1x1"} py="10px">
        <SimpleGrid spacing={10} minChildWidth="250px">
          <Box sx={FirstBox} bgImage="url('img/account.png')" backgroundSize='cover'>
            <Text fontSize="xl" fontWeight="bold">Zapotrzebowanie</Text>
            <Text>{BMR} kcal</Text>
          </Box>
        </SimpleGrid>
      </Container>

      <Container as="section" maxWidth={"2x1"} py="10px">
        <SimpleGrid spacing={10} minChildWidth="10px">
          <Box sx={SecondBox} bgImage="url('img/account2.png')" backgroundSize='cover'>
            <Text>
              Witaj ponownie!<br />
              <Heading size='lg'>{userData && userData.name} {userData && userData.surname}</Heading>
              <span style={{ color: "#A0AEC0" }}>Miło Cię znów widzieć!<br />
                Czy masz jakieś pytania?</span>
            </Text>
          </Box>

          <Box sx={SecondBox} width="200%" bgGradient="linear(to-r, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6))">
            <Text fontSize="xl" fontWeight="bold">Informator o profilu</Text>
            <Flex justifyContent={"center"}>
              <Box letterSpacing='wide' mt='3'>
                <Text>Imię: {userData && userData.name}</Text>
                <Text>Nazwisko: {userData && userData.surname}</Text>
                <Text>Data urodzenia: {userData && userData.dateOfBirth}</Text>
                <Text>Wzrost: {userData && userData.height} cm</Text>
              </Box>
              <Box letterSpacing='wide' ml='10' mt='3'>
                <Text>Waga: {userData && userData.weight} kg</Text>
                <Text>Waga docelowa: {userData && userData.estimated_weight} kg</Text>
                <Text>Cel: {goal}</Text>
              </Box>
            </Flex>
          </Box>
          <Box></Box>
        </SimpleGrid>
      </Container>

      <Container as="section" maxWidth={"1x1"} py="10px">
        <SimpleGrid spacing={10} minChildWidth="250px">
          <Box sx={ThirdBox}>
            <Text fontSize="xl" fontWeight="bold">Informator zdrowia</Text>
            <Flex justifyContent={"flex-start"}>
              <Box>
                <CircularProgress color='green.300' size='150px' thickness='14px' value={86}>
                  <CircularProgressLabel>86%</CircularProgressLabel>
                </CircularProgress>
                <Text>{timeSinceRegistration}</Text>
                <Text>Czas od rejestracji</Text>
              </Box>
              <Flex justifyContent={"center"}>
                <Box>

                  <Box sx={miniBox2} bgGradient="linear(to-r, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6))">
                    <Flex justifyContent={"space-between"}>
                      <Box>
                        <Text fontSize="md" ml="10px"><span style={{ color: "#A0AEC0" }}>Cel</span></Text>
                        <Text fontSize="md" fontWeight="bold" ml="15px">76%</Text>
                      </Box>
                      <Image src="img/Line2.png" backgroundSize='cover'></Image>
                    </Flex>
                  </Box>

                  <Box sx={miniBox2} bgGradient="linear(to-r, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6))">
                    <Flex justifyContent={"space-between"}>
                      <Box>
                        <Text fontSize="md" ml="10px"><span style={{ color: "#A0AEC0" }}>Waga</span></Text>
                        <Text fontSize="md" fontWeight="bold" ml="15px">{Math.floor(percentWeight)}%</Text>
                      </Box>
                      <Image src="img/Line3.png" backgroundSize='cover'></Image>
                    </Flex>
                  </Box>


                </Box>

                <Box>

                  <Box sx={miniBox} bgGradient="linear(to-r, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6))">
                    <Flex justifyContent={"space-between"}>
                      <Box>
                        <Text fontSize="md" ml="10px"><span style={{ color: "#A0AEC0" }}>Progres</span></Text>
                        <Text fontSize="md" fontWeight="bold" ml="15px">+26%</Text>
                      </Box>
                      <Image src="img/Line4.png" backgroundSize='cover'></Image>
                    </Flex>
                  </Box>

                  <Box sx={miniBox} bgGradient="linear(to-r, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6))">
                    <Flex justifyContent={"space-between"}>
                      <Box>
                        <Text fontSize="md" ml="10px"><span style={{ color: "#A0AEC0" }}>Zapotrzebowanie</span></Text>
                        <Text fontSize="md" fontWeight="bold" ml="15px"> {BMR} kcal</Text>
                      </Box>
                      <Image src="img/Line3.png" backgroundSize='cover'></Image>
                    </Flex>
                  </Box>
                </Box>
              </Flex>
            </Flex>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  )
}
