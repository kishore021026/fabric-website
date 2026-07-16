import { createContext, useContext, useState } from 'react';

const BagContext = createContext();

export const BagProvider = ({ children }) => {
  const [bagItems, setBagItems] = useState([]);

  const addToBag = (product) => {
    setBagItems((prev) => [...prev, product]);
  };

  return (
    <BagContext.Provider value={{ bagItems, addToBag }}>
      {children}
    </BagContext.Provider>
  );
};

export const useBag = () => useContext(BagContext);