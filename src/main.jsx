import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import * as serviceWorkerRegistration from '../serviceWorkerRegistration';

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(
  <ChakraProvider>
    <App />
  </ChakraProvider>
  ,
)

serviceWorkerRegistration.register();