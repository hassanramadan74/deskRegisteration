import React from 'react';
import ReactDOM from 'react-dom/client';
import { CSSReset, ChakraProvider, extendTheme } from '@chakra-ui/react';

import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css';
import UserContextProvider from './Context/userContext.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
const customTheme = extendTheme({
    styles: {
      global: {
        'html, body': {
          backgroundColor: 'white', // Set your desired background color here        // Set your desired text color here
        },
      },
    },
  });
root.render(
    <UserContextProvider>
    <ChakraProvider theme={customTheme}>
    <CSSReset />
    <App />
  </ChakraProvider>
  </UserContextProvider>
);
