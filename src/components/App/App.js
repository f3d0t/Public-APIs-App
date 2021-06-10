/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../../framework';
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
      <Menu
        filterArrays={filterArrays}
        filters={filters}
        setFilters={setFilters}
        setDisplayRandom={setDisplayRandom}
        setReload={reloadData}
      />
      <Content
        error={error}
        isDataLoading={isDataLoading}
        apiArray={apiArray}
        filterArrays={filterArrays}
        filters={filters}
        displayRandom={displayRandom}
      />
    </>
  );
}
