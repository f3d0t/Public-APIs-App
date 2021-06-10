import { createContext, useContext } from './framework';

export const ApiContext = createContext();
export const useApiContext = () => useContext(ApiContext);
