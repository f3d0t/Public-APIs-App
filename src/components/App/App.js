/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment, useState, useEffect } from '../../framework';
import { fetchData, getFilterValues } from '../../data';
import { ApiHtml } from '../ApiHtml/ApiHtml';

import { Header } from '../Header/Header';
import { Menu } from '../Menu/Menu';
import { Content } from '../Content/Content';
import { styles } from './App.css';

export function App() {
  const [error, setError] = useState(null);
  const [filterArrays, setFilterArrays] = useState({ Category: [], HTTPS: [], Auth: [], Cors: [] });
  const [filters, setFilters] = useState({ Category: '', HTTPS: '', Auth: '', Cors: '' });
  const [apiArray, setApiArray] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [displayRandom, setDisplayRandom] = useState(false);

  useEffect(() => {
    if (isDataLoading) {
      fetchData()
        .then(data => {
          const { message, code } = data;

          if (code !== '200' && message) throw Error(message);

          setError(null);
          const apis = data.entries.map(api => {
            if (api.Auth === '') api.Auth = 'none';
            api.HTML = ApiHtml(api);
            return api;
          });
          setApiArray(apis);
          const filterArrays = {};
          Object.keys(filters).map(key => {
            filterArrays[key] = getFilterValues(apis, key);
          });
          setFilterArrays(filterArrays);
        })
        .catch(setError)
        .finally(() => setIsDataLoading(false));
    }
  }, [isDataLoading]);

  return (
    <>
      <Header />
      <Menu
        filterArrays={filterArrays}
        filters={filters}
        setFilters={setFilters}
        setDisplayRandom={setDisplayRandom}
        setReload={setIsDataLoading}
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
