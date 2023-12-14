import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';
import reportWebVitals from './config/reportWebVitals';
import {ChakraProvider} from '@chakra-ui/react';
import theme from './config/chakra-theme';
import {AuthProvider} from "./context/AuthProvider";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ChakraProvider theme={theme}>
        <React.StrictMode>
            <AuthProvider>
                <App/>
            </AuthProvider>
        </React.StrictMode>
    </ChakraProvider>
);


reportWebVitals();
