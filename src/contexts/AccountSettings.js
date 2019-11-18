import React, { createContext, useState } from 'react';

export const LAYOUT = {
  GRID: 'grid',
  LIST: 'list',
};

const AccountSettingsContext = createContext();

const Provider = ({ children }) => {
  const [layout, setLayout] = useState(LAYOUT.LIST);

  return (
    <AccountSettingsContext.Provider value={{ layout, setLayout }}>
      {children}
    </AccountSettingsContext.Provider>
  );
};

export default {
  Provider,
  Consumer: AccountSettingsContext.Consumer
};
