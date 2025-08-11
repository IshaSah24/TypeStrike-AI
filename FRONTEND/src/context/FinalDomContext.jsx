import { createContext, useContext, useState } from 'react';
const FinalDomContext = createContext(null);

export const FinalDomProvider = ({ children }) => {
  const [finalDOM, setFinalDOM] = useState(null);

  return (
    <FinalDomContext.Provider value={{ finalDOM, setFinalDOM }}>
      {children}
    </FinalDomContext.Provider>
  );
};

export const useFinalDom = () => {
  const context = useContext(FinalDomContext);
  if (!context) {
    throw new Error('useFinalDom must be used within a FinalDomProvider');
  }
  return context;
};