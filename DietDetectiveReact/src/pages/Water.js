import React, {useEffect, useState} from 'react'
import {Box, Container, SimpleGrid, Text, Heading, IconButton, Flex, Icon} from '@chakra-ui/react'
import {
  FaPlus,
  FaMinus, FaInfoCircle
} from 'react-icons/fa'
import {BsCupHot, BsQuestion} from "react-icons/bs";
import { pl } from 'date-fns/locale';
import {GiSmallFire, GiWaterBottle, GiWaterGallon} from "react-icons/gi";
import {CiCoffeeCup, CiGlass} from "react-icons/ci";
import { SlCup } from "react-icons/sl";
import { BsCupStraw } from "react-icons/bs";
import {getUserWeight, getWater, getWaterToday, handleWater} from "../util/APIUtils";
import {format, subDays, isAfter, addDays, startOfWeek, isSameDay} from 'date-fns';

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
export default function Water() {
  const [waterVolume, setWaterVolume] = useState(0);
  const [waterData, setWaterData] = useState([]);
  const [waterToday, setWaterToday] = useState({});
  const [showInfo, setShowInfo] = useState(false);
  const setNewWater = (volume) => {
    getWater()
        .then(response => {
          setWaterData(response.data);
        })
    setWaterVolume(volume);
    handleWater({ volume });
    getWater()
        .then(response => {
          setWaterData(response.data);
        })
  };
  const fetchWater = () => {
    getWater()
        .then(response => {
          setWaterData(response.data);
          console.log(response.data);
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
        <Flex justifyContent="space-between" p="4" borderRadius="md">
          {goalAchievement.map((achieved, index) => (
              <Box textAlign="center">
                <Text fontSize="lg">{daysOfWeek[index]}</Text>
                <Icon as={achieved ? FaPlus : FaMinus} color={achieved ? 'green.500' : 'red.500'} />
              </Box>
          ))}
        </Flex>
    );
  };

  const fetchWaterToday = () => {
    getWaterToday()
        .then(response => {
          setWaterToday(response.data);
          console.log(response.data);
        })
        .catch(error => {
          console.error('Błąd podczas pobierania danych użytkownika', error);
        });
  };

  useEffect(() => {
    fetchWaterToday();
    fetchWater();
    // const interval = setInterval(() => {
    //   fetchWater();
    // }, 5000);
    // return () => clearInterval(interval);
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
    h: "250px",
    color: "white",
    borderRadius: "lg",
    p: "20px",
    textAlign: "center",
  }
  return (
    <div className="App">
      <Heading color={"white"}>Uzupełnij nawodnienie:</Heading>
      <Container maxWidth={"3x1"} py="10px">
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

      <Container maxWidth={"3x1"} py="10px">
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
      <Container maxWidth={"3x1"} py="10px">
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
          <Box sx={CalendarBox} mt={16}>
            <Text fontSize="x-large" fontWeight="bold" mb={4}>
              Dni odpowiedniego nawodnienia w tygodniu
              <IconButton
                  ml={3}
                  aria-label="Show Info"
                  icon={<FaInfoCircle />}
                  onClick={() => setShowInfo(!showInfo)}
                  size="sm"
                  colorScheme="blue"
              />
              {showInfo && (
                  <span style={{fontSize: 'xx-small', verticalAlign: 'super', fontWeight: 'normal'}}> *odpowiednie nawodnienie przyjmuje większe niż 2l</span>
              )}
            </Text>

            <WeeklyGoal waterData={waterData} />
            <Text fontSize="lg" fontWeight="bold" >
              {calculateHydrationDays() !== 0 ? `Dni z rzędu ${calculateHydrationDays()}🔥` : ""}
            </Text>

          </Box>
      </SimpleGrid>
    </Container>

    </div>
  )
}
