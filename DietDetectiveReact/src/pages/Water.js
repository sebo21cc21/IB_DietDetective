import React, {useEffect, useState} from 'react'
import {
  Box,
  Container,
  SimpleGrid,
  Text,
  Heading,
  IconButton,
  Flex,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent, ModalHeader, ModalCloseButton, ModalBody, useDisclosure, Button, ModalFooter
} from '@chakra-ui/react'
import {
  FaPlus,
  FaMinus, FaInfoCircle
} from 'react-icons/fa'
import {BsCupHot} from "react-icons/bs";
import { pl } from 'date-fns/locale';
import {GiWaterBottle, GiWaterGallon} from "react-icons/gi";
import {CiCoffeeCup} from "react-icons/ci";
import { SlCup } from "react-icons/sl";
import { BsCupStraw } from "react-icons/bs";
import {getWater, handleWater} from "../util/APIUtils";
import {format, subDays, isAfter, addDays, startOfWeek, isSameDay} from 'date-fns';
import { useToast } from '@chakra-ui/react';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
export default function Water() {
  const [waterVolume, setWaterVolume] = useState(0);
  const [waterData, setWaterData] = useState([]);
  const [showInfo, setShowInfo] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const setNewWater = (volume) => {
    const newWaterVolume = waterVolume + volume;
    setWaterVolume(newWaterVolume);

    handleWater({ volume })
        .then(() => {
          fetchWater();
        })
        .catch(error => {
          setWaterVolume(waterVolume);
          console.error('Nie udało się zaktualizować nawodnienia', error);
          toast({
            title: 'Error',
            description: 'Nie udało się zaktualizować nawodnienia, odśwież stronę i spróbuj ponownie.',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: "top-right"
          });
        });

    showNotification(volume, newWaterVolume);
  };
  const fetchWater = () => {
    getWater()
        .then(response => {
          setWaterData(response.data);
        })
        .catch(error => {
          console.error('Błąd podczas pobierania danych użytkownika', error);
        });
  };

  const calculateHydrationDays = () => {
    const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
    let hydratedDays = 0;

    for (let i = 0; i < 7; i++) {
      const day = addDays(startDate, i);
      const dayData = waterData.find(d => isSameDay(new Date(d.date), day));
      if (dayData && dayData.volume >= 2000) {
        hydratedDays++;
      }
    }

    return hydratedDays;
  };

  const chartData = waterData
      .map(item => ({
        ...item,
        name: format(new Date(item.date), 'EEEE', { locale: pl }),
        nawodnienie: item.volume
      }))
      .filter(item => isAfter(new Date(item.date), subDays(new Date(), 7)))
      .sort((a, b) => new Date(a.date) - new Date(b.date)) // Sort by date
      .slice(-7);

  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
  };
  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  const WeeklyGoal = ({ waterData }) => {
    const daysOfWeek = [...Array(7).keys()].map(i =>
        format(addDays(startOfWeek(new Date(), { weekStartsOn: 1 }), i), 'EEEE', { locale: pl })
    );

    const goalAchievement = daysOfWeek.map(day => {
      const dayData = waterData.find(d => format(new Date(d.date), 'EEEE', { locale: pl }) === day);
      return dayData && dayData.volume > 2000;
    });

    return (
        <Flex direction="column" alignItems="center" p="4" borderRadius="md">
          <SimpleGrid columns={3} spacing={3} width="100%" mb={3} >
            {goalAchievement.slice(0, 3).map((achieved, index) => (
                <Box textAlign="center" key={daysOfWeek[index]}>
                  <Text fontSize ={{ base: 'xx-small', md: 'lg' }}>{daysOfWeek[index]}</Text>
                  <Icon as={achieved ? FaPlus : FaMinus} color={achieved ? 'green.500' : 'red.500'} />
                </Box>
            ))}
          </SimpleGrid>
          <SimpleGrid columns={3} spacing={3} width="100%"  mb={3}>
            {goalAchievement.slice(3, 6).map((achieved, index) => (
                <Box textAlign="center" key={daysOfWeek[index + 3]}>
                  <Text fontSize ={{ base: 'xx-small', md: 'lg' }}>{daysOfWeek[index + 3]}</Text>
                  <Icon as={achieved ? FaPlus : FaMinus} color={achieved ? 'green.500' : 'red.500'} />
                </Box>
            ))}
          </SimpleGrid>
          <SimpleGrid columns={3} spacing={3} width="100%">
            <Box textAlign="center" /> {/* Empty box for spacing */}
            <Box textAlign="center" key={daysOfWeek[6]}>
              <Text fontSize ={{ base: 'xx-small', md: 'lg' }}>{daysOfWeek[6]}</Text>
              <Icon as={goalAchievement[6] ? FaPlus : FaMinus} color={goalAchievement[6] ? 'green.500' : 'red.500'} />
            </Box>
            <Box textAlign="center" /> {/* Empty box for spacing */}
          </SimpleGrid>
        </Flex>
    );
  };

  const showNotification = (volume, newWater) => {
    toast({
      title: volume >= 0 ? 'Dodano' : 'Usunięto',
      description: `${Math.abs(volume)} ml, aktualna zmiana nawodnienia: ${newWater} ml`,
      status: volume >= 0 ? 'success' : 'error',
      duration: 5000,
      isClosable: true,
      position: "top-right"
    });
  };

  useEffect(() => {
    fetchWater();
  }, []);
  const FirstBox = {
    bgGradient: "linear(to-r, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6))",
    h: "200px",
    color: "white",
    borderRadius: "lg",
    p: "20px",
    textAlign: "center"
  }

  const PlotBox = {
    bgGradient: "linear(to-r, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6))",
    h: "400px",
    color: "white",
    borderRadius: "lg",
    p: "20px",
    textAlign: "center"
  }

  const CalendarBox = {
    bgGradient: "linear(to-r, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6))",
    h: "400px",
    color: "white",
    borderRadius: "lg",
    p: "20px",
    textAlign: "center",
  }
  return (
    <div className="App">
      <Heading color={"white"}>Uzupełnij nawodnienie:</Heading>
      <Container maxWidth={"3x1"} py="10px" ml ={{ base: '5', md: '0' }}>
        <SimpleGrid spacing={10} minChildWidth="250px">
          <Box sx={FirstBox}>
            <Flex justifyContent="center">
              <BsCupHot size={70} color="white" />
            </Flex>
            <Text fontSize="xl" fontWeight="bold">100 ml</Text>
            <IconButton
              mt={"20px"}
              aria-label="Details"
              icon={<FaPlus />}
              onClick={() => setNewWater(100)}
              size="sm"
              colorScheme="green"
            />
            <IconButton
                ml = "20px"
                mt={"20px"}
                aria-label="Details"
                icon={<FaMinus />}
                onClick={() => setNewWater(-100)}
                size="sm"
                colorScheme="blue"
            />
          </Box>
          <Box sx={FirstBox}>
            <Flex justifyContent="center">
              <SlCup size={70} color="white" />
            </Flex>
            <Text fontSize="xl" fontWeight="bold">200 ml</Text>
            <IconButton
              mt={"20px"}
              aria-label="Details"
              icon={<FaPlus />}
              onClick={() => setNewWater(200)}
              size="sm"
              colorScheme="green"
            />
            <IconButton
                ml = "20px"
                mt={"20px"}
                aria-label="Details"
                icon={<FaMinus />}
                onClick={() => setNewWater(-200)}
                size="sm"
                colorScheme="blue"
            />
          </Box>
          <Box sx={FirstBox}>
            <Flex justifyContent="center">
              <BsCupStraw size={70} color="white" />
            </Flex>
            <Text fontSize="xl" fontWeight="bold">300 ml</Text>
            <IconButton
              mt={"20px"}
              aria-label="Details"
              icon={<FaPlus />}
              onClick={() => setNewWater(300)}
              size="sm"
              colorScheme="green"
            />
            <IconButton
                ml = "20px"
                mt={"20px"}
                aria-label="Details"
                icon={<FaMinus />}
                onClick={() => setNewWater(-300)}
                size="sm"
                colorScheme="blue"
            />
          </Box>
        </SimpleGrid>
      </Container>

      <Container maxWidth={"3x1"} py="10px" ml ={{ base: '5', md: '0' }}>
        <SimpleGrid spacing={10} minChildWidth="250px">
          <Box sx={FirstBox}>
            <Flex justifyContent="center">
              <CiCoffeeCup  size={70} color="white" />
            </Flex>
            <Text fontSize="xl" fontWeight="bold">400 ml</Text>
            <IconButton
              mt={"20px"}
              aria-label="Details"
              icon={<FaPlus />}
              onClick={() => setNewWater(400)}
              size="sm"
              colorScheme="green"
            />
            <IconButton
                ml = "20px"
                mt={"20px"}
                aria-label="Details"
                icon={<FaMinus />}
                onClick={() => setNewWater(-400)}
                size="sm"
                colorScheme="blue"
            />
          </Box>
          <Box sx={FirstBox}>
            <Flex justifyContent="center">
              <GiWaterBottle size={70} color="white" />
            </Flex>
            <Text fontSize="xl" fontWeight="bold">500 ml</Text>
            <IconButton
              mt={"20px"}
              aria-label="Details"
              icon={<FaPlus />}
              onClick={() => setNewWater(500)}
              size="sm"
              colorScheme="green"
            />
            <IconButton
                ml = "20px"
                mt={"20px"}
                aria-label="Details"
                icon={<FaMinus />}
                onClick={() => setNewWater(-500)}
                size="sm"
                colorScheme="blue"
            />
          </Box>
          <Box sx={FirstBox}>
            <Flex justifyContent="center">
              <GiWaterGallon  size={70} color="white" />
            </Flex>
            <Text fontSize="xl" fontWeight="bold">1000 ml</Text>
            <IconButton
              mt={"20px"}
              aria-label="Details"
              icon={<FaPlus />}
              onClick={() => setNewWater(1000)}
              size="sm"
              colorScheme="green"
            />
            <IconButton
                ml = "20px"
                mt={"20px"}
                aria-label="Details"
                icon={<FaMinus />}
                onClick={() => setNewWater(-1000)}
                size="sm"
                colorScheme="blue"
            />
          </Box>
        </SimpleGrid>

      </Container>
      <Container maxWidth={"3x1"} py="10px" mb={7} ml ={{ base: '5', md: '0' }}>
        <SimpleGrid spacing={10} minChildWidth="250px">
          <Box sx={PlotBox}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />

                <Legend />
                <ReferenceLine y={2000} label="2000 ml" stroke="red" strokeDasharray="3 3" />
                <Bar dataKey="nawodnienie" shape={<TriangleBar />} fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
        </Box>
          <Box sx={CalendarBox}>
            <Text fontSize ={{ base: 'md', md: 'xl' }} fontWeight="bold" mb={4}>
              Dni odpowiedniego nawodnienia w tygodniu
              <IconButton
                  ml={3}
                  aria-label="Show Info"
                  icon={<FaInfoCircle />}
                  onClick={onOpen}
                  size="sm"
                  colorScheme="blue"
              />
            </Text>
            {showInfo && (
                <span style={{fontSize: 'xx-small', verticalAlign: 'super', fontWeight: 'normal'}}> *zalecane dzienne nawodnienie >2l</span>
            )}

            <WeeklyGoal waterData={waterData} />
            <Text fontSize ={{ base: 'xx-small', md: 'lg' }} fontWeight="bold" >
              {calculateHydrationDays() !== 0 ? `Dni z rzędu ${calculateHydrationDays()}🔥` : ""}
            </Text>

          </Box>
      </SimpleGrid>
    </Container>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={"2xl"}>
        <ModalOverlay />
        <ModalContent >
          <ModalHeader>Dzienne nawodnienie</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Względem przyjętego zalecanego dziennego nawodnienia większego niż 2 litry.</Text>
            <Text>Reprezentowany wykres przedstawia zależność całkowitego nawodnienia z dnia [ml] od dnia. Typ wykresu ma charakter poglądowy.</Text>
            <br></br>
            <Text>Pamiętaj o regularnym spożywaniu wody i dbaniu o swoje zdrowie.</Text>
            <Text>Nie trać dobrej passy!</Text>
          </ModalBody>
          <ModalFooter>

          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
