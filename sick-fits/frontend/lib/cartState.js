/* eslint-disable import/prefer-default-export */
import { createContext, useContext, useState } from 'react';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function CartStateProvider({ children }) {
  // This is our own custom provider!
  // We will store data (state) and functionality
  // (updaters) in here and anyone can access it via the consumer

  const [cartOpen, setCartOpen] = useState(false);

  function toggleCart() {
    setCartOpen(!cartOpen);
  }

  return (
    <LocalStateProvider value={{ cartOpen, toggleCart }}>
      {children}
    </LocalStateProvider>
  );
}

// make a custom hook for accessing the cart local state

function useCart() {
  const all = useContext(LocalStateContext);
  return all;
}

export { CartStateProvider, useCart };
