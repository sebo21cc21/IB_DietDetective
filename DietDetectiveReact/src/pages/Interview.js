import React from 'react';
import { Box, Heading, FormControl, FormLabel, Input, Button, Text } from '@chakra-ui/react';
import axios from 'axios';

const formContainerStyles = {
  maxW: "md",
  mx: "auto",
  mt: 6,
  p: 10,
  borderWidth: 1,
  borderRadius: "md",
  boxShadow: "md",
  bgGradient: "linear(to-r, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8))"
};

const headingStyles = {
  size: "lg",
  textAlign: "center",
  mb: 4,
  color: "white",
};

const formLabelStyles = {
  color: "white",
};

export default function Interview() {
  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [date, setDate] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [targetWeight, setTargetWeight] = React.useState("");

  const handleFinishInterview = async () => {
    try {
      const response = await axios.post('http://localhost:8080/person', {
        name: name,
        surname: surname,
        dateOfBirth: date,
        gender: gender,
        height: parseInt(height),
        weight: parseInt(weight),
        estimated_weight: parseInt(targetWeight)
      });

      console.log("Form submitted!");
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Box sx={formContainerStyles}>
      <Heading sx={headingStyles}>Witaj!</Heading>
      <Text sx={headingStyles}>Wypełnij wywiad środowiskowy</Text>

      <FormControl id="name" mb={4}>
        <FormLabel sx={formLabelStyles}>Imie</FormLabel>
        <Input color = "white" placeholder="Podaj imie" value={name} onChange={(e) => setName(e.target.value)} />
      </FormControl>

      <FormControl id="surname" mb={4}>
        <FormLabel sx={formLabelStyles}>Drugie Imie</FormLabel>
        <Input color = "white" placeholder="Podaj nazwisko" value={surname} onChange={(e) => setSurname(e.target.value)} />
      </FormControl>

      <FormControl id="date" mb={4}>
        <FormLabel sx={formLabelStyles}>Date Urodzenia</FormLabel>
        <Input color = "white" type="date" placeholder="Podaj swój wiek" value={date} onChange={(e) => setDate(e.target.value)} />
      </FormControl>

      <FormControl id="gender" mb={4}>
        <FormLabel sx={formLabelStyles}>Płeć</FormLabel>
        <Input color = "white" placeholder="Podaj swoją płeć" value={gender} onChange={(e) => setGender(e.target.value)} />
      </FormControl>

      <FormControl id="height" mb={4}>
        <FormLabel sx={formLabelStyles}>Wzrost</FormLabel>
        <Input color = "white" type="number" placeholder="Podaj swój wzrost" value={height} onChange={(e) => setHeight(e.target.value)} />
      </FormControl>

      <FormControl id="weight" mb={4}>
        <FormLabel sx={formLabelStyles}>Waga</FormLabel>
        <Input color = "white" type="number" placeholder="Podaj swoją wagę" value={weight} onChange={(e) => setWeight(e.target.value)} />
      </FormControl>

      <FormControl id="targetWeight" mb={4}>
        <FormLabel sx={formLabelStyles}>Waga docelowa</FormLabel>
        <Input
          color = "white" 
          type="number"
          placeholder="Podaj wagę docelową"
          value={targetWeight}
          onChange={(e) => setTargetWeight(e.target.value)}
        />
      </FormControl>

      <Button colorScheme="messenger" size="md" w="full" onClick={handleFinishInterview}>
        Zakończ wywiad
      </Button>
    </Box>
  );
}
