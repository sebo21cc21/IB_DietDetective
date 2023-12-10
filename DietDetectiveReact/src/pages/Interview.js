import React from 'react';
import { Box, Heading, FormControl, FormLabel, Input, Button, Text, Select, Alert, AlertIcon } from '@chakra-ui/react';
import { handleFinishInterview } from "../util/APIUtils";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

const GoalEnum = {
    ZrzućWagę: 'Zrzuć wagę',
    UtrzymajWagę: 'Utrzymaj wagę',
    NabierzMasę: 'Nabierz masę',
};
const GenderEnum = {
    K: 'Kobieta',
    M: 'Mężczyzna',
};

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
    const navigate = useNavigate();
    const [date, setDate] = React.useState("");
    const [sex, setSex] = React.useState("");
    const [height, setHeight] = React.useState("");
    const [weight, setWeight] = React.useState("");
    const [targetWeight, setTargetWeight] = React.useState("");
    const [goal, setGoal] = React.useState("");
    const [validationErrors, setValidationErrors] = React.useState({}); // State for validation errors

    const { auth, setAuth } = React.useContext(AuthContext);

    // Function to reset validation errors
    const resetValidationErrors = () => {
        setValidationErrors({});
    };

    const handleFinishInterviewClick = async () => {
        resetValidationErrors(); // Reset validation errors

        const requestBody = {
            birthDate: date,
            sex: sex,
            height: parseInt(height),
            targetWeight: parseInt(targetWeight),
            weight: parseInt(weight),
            goal: goal,
        };

        // Validation of data
        const errors = {};

        if (!requestBody.birthDate) {
            errors.birthDate = "Pole wymagane";
        }

        if (!requestBody.sex) {
            errors.sex = "Pole wymagane";
        }

        if (!requestBody.height) {
            errors.height = "Pole wymagane";
        }

        if (!requestBody.targetWeight) {
            errors.targetWeight = "Pole wymagane";
        }

        if (!requestBody.weight) {
            errors.weight = "Pole wymagane";
        }

        if (!requestBody.goal) {
            errors.goal = "Pole wymagane";
        }
        // Weight validation based on the goal
        switch (requestBody.goal) {
            case GoalEnum.UtrzymajWagę:
                if (requestBody.weight !== requestBody.targetWeight) {
                    errors.targetWeight = "Waga docelowa musi być równa aktualnej wadze";
                }
                break;
            case GoalEnum.NabierzMasę:
                if (requestBody.weight >= requestBody.targetWeight) {
                    errors.targetWeight = "Waga docelowa musi być większa niż aktualna waga";
                }
                break;
            case GoalEnum.ZrzućWagę:
                if (requestBody.weight <= requestBody.targetWeight) {
                    errors.targetWeight = "Waga docelowa musi być mniejsza niż aktualna waga";
                }
                break;
            default:
                break;
        }

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        try {
            await handleFinishInterview(requestBody);
            console.log("Form submitted!");

            setAuth({
                isAuthenticated: auth.isAuthenticated,
                currentUser: auth.currentUser,
                isInterviewCompleted: true
            });

            navigate('/monitor');
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <Box sx={formContainerStyles}>
            <Heading sx={headingStyles}>Witaj!</Heading>
            <Text sx={headingStyles}>Wypełnij wywiad środowiskowy</Text>

            <FormControl id="date" mb={4}>
                <FormLabel sx={formLabelStyles}>Data urodzenia</FormLabel>
                <Input
                    color="white"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    sx={{
                        '::-webkit-calendar-picker-indicator': {
                            filter: 'invert(1)',
                        }
                    }}
                />
                {validationErrors.birthDate && (
                    <Alert status="error">
                        <AlertIcon />
                        {validationErrors.birthDate}
                    </Alert>
                )}
            </FormControl>

            <FormControl id="sex" mb={4}>
                <FormLabel sx={formLabelStyles}>Płeć biologiczna</FormLabel>
                <Select
                    color="white"
                    value={sex}
                    onChange={(e) => setSex(e.target.value)}
                >
                    <option value="" color={'gray.500'} disabled hidden>
                        Wybierz płeć biologiczną
                    </option>
                    {Object.values(GenderEnum).map((genderOption) => (
                        <option
                            key={genderOption}
                            value={genderOption}
                            style={{ color: "black" }}
                        >
                            {genderOption}
                        </option>
                    ))}
                </Select>
                {validationErrors.sex && (
                    <Alert status="error">
                        <AlertIcon />
                        {validationErrors.sex}
                    </Alert>
                )}
            </FormControl>

            <FormControl id="height" mb={4}>
                <FormLabel sx={formLabelStyles}>Wzrost</FormLabel>
                <Input color="white" type="number" placeholder="Podaj swój wzrost" _placeholder={{ color: 'white' }} value={height} onChange={(e) => setHeight(e.target.value)} />
                {validationErrors.height && (
                    <Alert status="error">
                        <AlertIcon />
                        {validationErrors.height}
                    </Alert>
                )}
            </FormControl>

            <FormControl id="goal" mb={4}>
                <FormLabel sx={formLabelStyles}>Cel</FormLabel>
                <Select
                    color="white"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                >
                    <option value="" color={'gray.500'} disabled hidden>
                        Wybierz cel
                    </option>
                    {Object.values(GoalEnum).map((goalOption) => (
                        <option
                            key={goalOption}
                            value={goalOption}
                            style={{color: "black"}}
                        >
                            {goalOption}
                        </option>
                    ))}
                </Select>
                {validationErrors.goal && (
                    <Alert status="error">
                        <AlertIcon/>
                        {validationErrors.goal}
                    </Alert>
                )}
            </FormControl>

            <FormControl id="weight" mb={4}>
                <FormLabel sx={formLabelStyles}>Waga</FormLabel>
                <Input color="white" type="number" placeholder="Podaj swoją wagę" _placeholder={{ color: 'white' }} value={weight} onChange={(e) => setWeight(e.target.value)} />
                {validationErrors.weight && (
                    <Alert status="error">
                        <AlertIcon />
                        {validationErrors.weight}
                    </Alert>
                )}
            </FormControl>

            <FormControl id="targetWeight" mb={4}>
                <FormLabel sx={formLabelStyles}>Waga docelowa</FormLabel>
                <Input
                    color="white"
                    type="number"
                    placeholder="Podaj wagę docelową"
                    _placeholder={{ color: 'white' }}
                    value={targetWeight}
                    onChange={(e) => setTargetWeight(e.target.value)}
                />
                {validationErrors.targetWeight && (
                    <Alert status="error">
                        <AlertIcon />
                        {validationErrors.targetWeight}
                    </Alert>
                )}
            </FormControl>

            <Button colorScheme="messenger" size="md" w="full" onClick={handleFinishInterviewClick}>
                Zakończ wywiad
            </Button>
        </Box>
    );
}