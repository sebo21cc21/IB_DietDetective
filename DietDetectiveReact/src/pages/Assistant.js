import React, { useEffect, useState } from 'react';
import { Input, Button, Box, Text, VStack, Spinner } from '@chakra-ui/react';
import axios from 'axios';
import { getCurrentUser, getEatenSummary } from "../util/APIUtils";

const ChatComponent = () => {
    const [inputValue, setInputValue] = useState('');
    const [response, setResponse] = useState('');
    const [eatenMealsSummary, setEatenMealsSummary] = useState([]);
    const [user, setUser] = useState(null);
    const [initialValue, setInitialValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true);
        fetchUserData();
        fetchEatenMealSummary();
        try {
            const result = await axios.post('https://api.openai.com/v1/chat/completions', {
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        'role': "system",
                        'content': initialValue
                    },
                    {
                        'role': "user",
                        'content': inputValue
                    }
                ],
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
                setResponse(result.data.choices[0].message.content);
            }
        } catch (error) {
            console.error('Error fetching response:', error);
        } finally {
            setIsLoading(false);
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
            <Button colorScheme="blue" onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? <Spinner size="sm" /> : 'Wyślij wiadomość'}
            </Button>
            {response && (
                <Box>
                    <Text fontSize="lg" color="white" textAlign="justify" mb={{ base: '20', md: '10' }}>{response} </Text>
                </Box>
            )}
        </VStack>
    );
};

export default ChatComponent;

