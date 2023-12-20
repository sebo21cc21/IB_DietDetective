import React, { useEffect, useState } from 'react';
import { Input, Button, Box, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import { getCurrentUser, getEatenSummary } from "../util/APIUtils";

const ChatComponent = () => {
    const [inputValue, setInputValue] = useState('');
    const [response, setResponse] = useState('');
    const [eatenMealsSummary, setEatenMealsSummary] = useState([]);
    const [user, setUser] = useState(null);
    const [initialValue, setInitialValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const fetchEatenMealSummary = async () => {
        getEatenSummary()
            .then(response => {
                setEatenMealsSummary(response.data);
                updateInitialValue(user, response.data);
            })
            .catch(error => {
                console.error('Error fetching meals', error);
            });
    };

    const fetchUserData = () => {
        getCurrentUser()
            .then(response => {
                setUser(response.data);
                updateInitialValue(response.data, eatenMealsSummary);
            })
            .catch(error => {
                console.error('Błąd podczas pobierania danych użytkownika', error);
            });
    };

    const updateInitialValue = (userData, eatenSummaryData) => {
        if (userData && eatenSummaryData) {
            const template = `Odpowiadaj jako asystent żywieniowy DietDetective. Dane użytkownika: ${JSON.stringify(userData)}. Podsumowanie spożycia: ${JSON.stringify(eatenSummaryData)}.`;
            setInitialValue(template);
        }
    };

    useEffect(() => {
        fetchUserData();
        fetchEatenMealSummary();
    }, []);

    const handleSubmit = async () => {
        try {
            const result = await axios.post('https://api.openai.com/v1/completions', {
                model: 'text-davinci-003',
                prompt: initialValue + inputValue,
                temperature: 1,
                max_tokens: 600,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer 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`
                },
                responseType: 'json'
            });

            if (result.data.choices && result.data.choices.length > 0) {
                setResponse(result.data.choices[0].text);
            }
        } catch (error) {
            console.error('Error fetching response:', error);
        }
    };

    return (
        <VStack spacing={4} mt={5}>
            <Input
                _placeholder={{  color: 'rgba(255, 255, 255, 0.800)' }}
                placeholder="Wpisz zapytanie do DietDetective..."
                value={inputValue}
                onChange={handleInputChange}
                color="white"
            />
            <Button colorScheme="blue" onClick={handleSubmit}>
                Wyślij wiadomość
            </Button>
            {response && (
                <Box>
                    <Text fontSize="lg" color="white" textAlign="justify">{response} </Text>
                </Box>
            )}
        </VStack>
    );
};

export default ChatComponent;
