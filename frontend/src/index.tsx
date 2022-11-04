import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import { ChakraProvider } from '@chakra-ui/react';
import { Web3Context, Web3Provider } from './context/Web3Context';
import {CartProvider } from './context/CartContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(

  <Web3Provider>

    <CartProvider>

    


  <ChakraProvider>
  
        <BrowserRouter>
      <App />


    </BrowserRouter>

  </ChakraProvider>

  </CartProvider>


  </Web3Provider>


  


);
