import {
  Button,
  Container,
  Flex,
  Input,
  Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader,
  ModalOverlay
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Box, SimpleGrid, Text, Image } from '@chakra-ui/react';
import {getCurrentUser, getUserWeight, handleGoal, handleSetTargetWeight, handleSetWeight} from '../util/APIUtils';
export function calculateBMR(gender, weight, height, age) {
  console.log(gender,weight,height,age)
  let BMR = 0;

  if (gender === 'M' || gender === 'Mężczyzna' || gender === 'Mezczyzna' || gender === 'Chlopak'){
    BMR = Math.floor(66 + (13.7 * weight) + (5 * height) - (6.8 * age));
  } else if (gender === 'K' || gender === 'D' || gender === 'Kobieta' || gender === 'Dziewczyna'){
    BMR = Math.floor(655 + (9.6 * weight) + (1.8 * height) - (4.7 * age));
  }

  return BMR;
}
export function determineGoal(weight, estimatedWeight) {
  if (weight > estimatedWeight) {
    return "Zrzuć wagę";
  } else if (weight < estimatedWeight) {
    return "Nabierz masę";
  } else {
    return "Utrzymaj wagę";
  }
}
export function calculateAge(dateOfBirth) {
  const birthDate = new Date(dateOfBirth);
  const currentDate = new Date();
  return currentDate.getFullYear() - birthDate.getFullYear();
}

export default function Account() {
  const [user, setUser] = useState(null);
  const [weight, setWeight] = useState({weight: null});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newWeight, setNewWeight] = useState('');
  const [isTargetModalOpen, setIsTargetModalOpen] = useState(false);
  const [newTargetWeight, setNewTargetWeight] = useState('');
  const [goal, setGoal] = useState(null);
  const FirstBox = {
    h: "200px",
    color: "white",
    borderRadius: "lg",
    p: "75px",
    textAlign: "center"
  }

  const SecondBox = {
    h: "300px",
    color: "white",
    borderRadius: "lg",
    p: "80px",
    textAlign: "center"
  }
  const ThirdBox = {
    h: "300px",
    color: "white",
    borderRadius: "lg",
    p: "40px",
    textAlign: "left"
  }



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


  const fetchUserWeight = () => {
    getUserWeight()
        .then(response => {
          setWeight(response.data[0]);
          console.log(response.data[0]);
        })
        .catch(error => {
          console.error('Błąd podczas pobierania danych użytkownika', error);
        });
  };
  const handleWeightChange = async () => {
    let weightRequest = {
      weight: newWeight
    };
    console.log(weightRequest);
    await handleSetWeight(weightRequest);
    console.log(goal);
    setWeight({ weight: newWeight });
    await handleGoal({goal: determineGoal(newWeight, newTargetWeight)});
    setIsModalOpen(false);
  };
  useEffect(() => {
    fetchUserData();
    fetchUserWeight();
  }, []);

  const handleTargetWeightChange = async () => {
    let requestBody = {
      targetWeight: newTargetWeight
    };
    console.log(requestBody);
    setUser(prevUser => ({ ...prevUser, targetWeight: newTargetWeight }));
    await handleGoal({goal: determineGoal(newWeight, newTargetWeight)});
    await handleSetTargetWeight(requestBody);
    setIsTargetModalOpen(false);
  };

  return (
      <div className="App">
        <Container as="section" maxWidth={"1x1"} py="10px">
          <SimpleGrid spacing={10} minChildWidth="250px">
            <Box sx={FirstBox} bgImage="url('img/account.png')" backgroundSize='cover'>
              <Text fontSize="xl" fontWeight="bold">Zapotrzebowanie</Text>
              <Text>{user ? `${calculateBMR(user.sex, weight.weight, user.height, calculateAge(user.birthDate))} kcal` : ''}</Text>
            </Box>
          </SimpleGrid>
        </Container>

        <Container as="section" maxWidth={"2x1"} py="20px">
          <SimpleGrid spacing={10} minChildWidth="10px">
            <Box sx={SecondBox} bgImage="url('img/account2.png')" backgroundSize='cover'>

                <Text fontSize="xx-large" fontWeight="bold">{user ? `${user.firstName} ${user.lastName}` : ''}</Text>

                <Text>
                  <span style={{ color: "#A0AEC0" }}>Miło Cię znów widzieć!<br />
                Czy masz jakieś pytania?</span>
                </Text>

            </Box>

            <Box sx={ThirdBox} width="200%" bgGradient="linear(to-r, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6))">
              <Text fontSize="xl" fontWeight="bold">Informator o profilu</Text>
              <Flex justifyContent={"center"}>
                <Box letterSpacing='wide' mt='8'>
                  <Text fontSize="xl">Imię i nazwisko: {user ? `${user.firstName} ${user.lastName}` : ''}</Text>
                  <Text fontSize="xl">Email: {user ? user.email : ''}</Text>
                  <Text fontSize="xl">
                    {user && weight ? determineGoal(weight.weight, user.targetWeight) : ''}
                  </Text>
                  <Text fontSize="xl">Płeć: {user ? user.sex : ''}</Text>
                </Box>

                <Box letterSpacing='wide' ml='10' mt='8'>
                  <Text fontSize="xl">Wiek: {user ? calculateAge(user.birthDate) : ''} lata</Text>
                  <Text fontSize="xl">Wzrost {user ? user.height : ''} cm:</Text>
                  <Text fontSize="xl">Waga: {weight ? weight.weight : ''} kg</Text>
                  <Text fontSize="xl">Waga docelowa: {user ? user.targetWeight : ''} kg</Text>
                </Box>
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} isCentered>
                  <ModalOverlay />
                  <ModalContent mx="auto" my="auto" style={{ transform: 'translate(-50%, -50%)' }}>
                    <ModalHeader>Zmień swoją wagę</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Input
                          placeholder="Wprowadź nową wagę w kg"
                          value={newWeight}
                          type={"number"}
                          onChange={(e) => setNewWeight(e.target.value)}
                      />
                    </ModalBody>

                    <ModalFooter>
                      <Button colorScheme="blue" mr={3} onClick={handleWeightChange}>
                        Zapisz
                      </Button>
                      <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Anuluj</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>

                <Modal isOpen={isTargetModalOpen} onClose={() => setIsTargetModalOpen(false)} isCentered>
                  <ModalOverlay />
                  <ModalContent mx="auto" my="auto" style={{ transform: 'translate(-50%, -50%)' }}>
                    <ModalHeader>Zmień wagę docelową</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Input
                          placeholder="Wprowadź nową wagę docelową w kg"
                          type={"number"}
                          value={newTargetWeight}
                          onChange={(e) => setNewTargetWeight(e.target.value)}
                      />
                    </ModalBody>

                    <ModalFooter>
                      <Button colorScheme="green" mr={3} onClick={handleTargetWeightChange}>
                        Zapisz
                      </Button>
                      <Button variant="ghost" onClick={() => setIsTargetModalOpen(false)}>Anuluj</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </Flex>
              <Flex justifyContent={"center"} mt={5} >
                <Button mr={3} colorScheme="messenger" onClick={() => setIsModalOpen(true)}>Zmień wagę</Button>
                <Button colorScheme="teal" onClick={() => setIsTargetModalOpen(true)}>Zmień wagę docelową</Button>
              </Flex>
              </Box>
            <Box></Box>
          </SimpleGrid>
        </Container>
      </div>
  )
}
