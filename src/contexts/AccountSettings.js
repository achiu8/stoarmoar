import React, { createContext, useState } from 'react';

export const LAYOUT = {
  GRID: 'grid',
  LIST: 'list',
};

const Context = createContext();

const Provider = ({ children }) => {
  const [layout, setLayout] = useState(LAYOUT.LIST);

  return (
    <Context.Provider value={{ layout, setLayout }}>
      {children}
    </Context.Provider>
  );
};

export default {
  Context,
  Provider,
  Consumer: Context.Consumer
};
