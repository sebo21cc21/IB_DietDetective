import {
  Button,
  Container,
  Flex,
  Input,
  Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader,
  ModalOverlay
} from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { Box, SimpleGrid, Text } from '@chakra-ui/react';
import {
  getCurrentUser,
  getUserSummary,
  getUserWeight,
  handleGoal,
  handleSetTargetWeight,
  handleSetWeight
} from '../util/APIUtils';
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
export function calculateBMR(gender, weight, height, age) {
  let BMR = 0;

  if (gender === 'M' || gender === 'Mężczyzna' || gender === 'Mezczyzna' || gender === 'Chlopak'){
    BMR = Math.floor(66 + (13.7 * weight) + (5 * height) - (6.8 * age));
  } else if (gender === 'K' || gender === 'D' || gender === 'Kobieta' || gender === 'Dziewczyna'){
    BMR = Math.floor(655 + (9.6 * weight) + (1.8 * height) - (4.7 * age));
  }

  return BMR;
}
export default function Account() {
  const [user, setUser] = useState(null);
  const [weight, setWeight] = useState({weight: null});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newWeight, setNewWeight] = useState('');
  const [isTargetModalOpen, setIsTargetModalOpen] = useState(false);
  const [newTargetWeight, setNewTargetWeight] = useState('');
  const [goal, setGoal] = useState(null);
  const [summary, setSummary] = useState(null);
  const toast = useToast();
  const FirstBox = {
    h: "200px",
    color: "white",
    borderRadius: "lg",
    p: "80px",
    textAlign: "center"

  }

  const SecondBox = {
    h: "350px",
    color: "white",
    borderRadius: "lg",
    p: "120px",
    textAlign: "center"
  }
  const ThirdBox = {
    h: "350px",
    color: "white",
    borderRadius: "lg",
    p: "40px",
    textAlign: "left"
  }



  const fetchUserData = () => {
    getCurrentUser()
        .then(response => {
          setUser(response.data);
        })
        .catch(error => {
          console.error('Błąd podczas pobierania danych użytkownika', error);
        });
  };


  const fetchUserWeight = () => {
    getUserWeight()
        .then(response => {
          if (response && response.data && response.data.length > 0) {
            setWeight(response.data[response.data.length - 1]);
          } else {
            console.error("Brak danych lub pusta tablica w odpowiedzi.");
          }
        })
        .catch(error => {
          console.error('Błąd podczas pobierania danych użytkownika', error);
        });
  };

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
      setWeight({ weight: newWeight });
      setSummary({ todayWeight: newWeight });
      await handleGoal({goal: determineGoal(newWeight, newTargetWeight)});
      setIsModalOpen(false);
      await fetchSummarData();
      toast({
        title: 'Pomyślnie zmieniono wagę',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: "top"
      });
    } catch (error) {
      console.error('Nie udało się zaktualizować wagi', error);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchUserWeight();
    fetchSummarData();
  }, []);

  const handleTargetWeightChange = async () => {
    let requestBody = {
      targetWeight: newTargetWeight
    };
    try {
      await handleSetTargetWeight(requestBody);
      setUser(prevUser => ({ ...prevUser, targetWeight: newTargetWeight }));
      await handleGoal({goal: determineGoal(newWeight, newTargetWeight)});
      setIsTargetModalOpen(false);
      toast({
        title: 'Pomyślnie zmieniono wagę docelową',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: "top"
      });
    } catch (error) {
      console.error('Nie udało się zaktualizować wagi docelowej', error);
    }
  };

  return (
      <div className="App">


        <Container as="section" maxWidth={"2x1"} py="20px" mt={3}>
          <SimpleGrid spacing={10} minChildWidth="300px">
            <Box sx={SecondBox} bgImage="url('img/account2.png')" backgroundSize='cover' >
              <Flex direction={{ base: "row", md: "row" }} justifyContent="center">
              <Text fontSize= "xx-large" fontWeight="bold">{user ? `${user.firstName} ${user.lastName}` : ''}</Text>
              </Flex>
            </Box>
            <Box sx={ThirdBox} width={["100%", "100%", "100%","100%",  "210%","210%"]} bgGradient="linear(to-r, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6))">
              <Text fontSize={["md", "lg", "xl"]} fontWeight="bold">Informator o profilu</Text>
              <Flex justifyContent={"center"}>
                <Box letterSpacing='wide' mt='8'>
                  <Text fontSize={["2xs", "xs", "xs", "md", "md", "xl"]} >Imię i nazwisko: {user ? `${user.firstName} ${user.lastName}` : ''}</Text>
                  <Text fontSize={["2xs", "xs", "xs", "md", "md", "xl"]} >Email: {user ? user.email : ''}</Text>
                  <Text fontSize={["2xs", "xs", "xs", "md", "md", "xl"]} >Cel: {user && weight ? determineGoal(weight.weight, user.targetWeight) : ''}</Text>
                  <Text fontSize={["2xs", "xs", "xs", "md", "md", "xl"]} >Płeć biologiczna: {user ? user.sex : ''}</Text>
                </Box>
                <Box letterSpacing='wide' ml='10' mt='8'>
                  <Text fontSize={["2xs", "xs", "xs", "md", "md", "xl"]} >Wiek: {user ? calculateAge(user.birthDate) : ''} lata</Text>
                  <Text fontSize={["2xs", "xs", "xs", "md", "md", "xl"]} >Wzrost: {user ? user.height : ''} cm</Text>
                  <Text fontSize={["2xs", "xs", "xs", "md", "md", "xl"]} >Waga: {summary ? summary.todayWeight : ''} kg</Text>
                  <Text fontSize={["2xs", "xs", "xs", "md", "md", "xl"]} >Waga docelowa: {user ? user.targetWeight : ''} kg</Text>
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
                  <ModalContent mx="auto" my="auto" style={{ transform: 'translate(-50%, -50%)' }} >
                    <ModalHeader >Zmień wagę docelową</ModalHeader>
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
                <Button size={["xs", "xs", "xs", "md", "md", "lg"]} mr={3} colorScheme="blue" onClick={() => setIsModalOpen(true)}>Zmień wagę</Button>
                <Button size={["xs", "xs", "xs", "md", "md", "lg"]} colorScheme="teal" onClick={() => setIsTargetModalOpen(true)}>Zmień wagę docelową</Button>
              </Flex>
              </Box>
            <Box></Box>
          </SimpleGrid>
        </Container>
        {/*<Container as="section" maxWidth={"1x1"} py="10px">*/}
        {/*  <SimpleGrid spacing={10} minChildWidth="300px">*/}
        {/*    <Box sx={FirstBox} bgImage="url('img/account.png')" backgroundSize='cover'>*/}
        {/*      <Text fontSize={{ base: "lg", md: "2xl" }}fontWeight="bold">Miło Cię znów widzieć!<br /></Text>*/}
        {/*    </Box>*/}
        {/*  </SimpleGrid>*/}
        {/*</Container>*/}
      </div>
  )
}
