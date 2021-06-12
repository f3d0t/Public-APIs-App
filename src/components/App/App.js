import React from 'react';
import { FiltersContext } from '../../context';
import { useApis } from '../../data';

import { Header } from '../Header/Header';
import { Menu } from '../Menu/Menu';
import { Content } from '../Content/Content';

import { styles } from './App.css';

export function App() {
  const {
    error,
    filterArrays,
    filters,
    setFilters,
    apiArray,
    isDataLoading,
    displayRandom,
    setDisplayRandom,
    reloadData,
  } = useApis();
  return (
    <>
      <Header />
      <FiltersContext.Provider value={{ filters, filterArrays }}>
        <Menu
          setFilters={setFilters}
          displayRandom={displayRandom}
          setDisplayRandom={setDisplayRandom}
          reloadData={reloadData}
        />
        <Content
          error={error}
          isDataLoading={isDataLoading}
          apiArray={apiArray}
          displayRandom={displayRandom}
        />
      </FiltersContext.Provider>
    </>
  );
}
