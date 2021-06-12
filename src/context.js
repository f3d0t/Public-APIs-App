import { createContext, useContext } from 'react';

export const FiltersContext = createContext({});
export const useFiltersContext = () => useContext(FiltersContext);
