import { useState, useEffect } from 'react';
import { fetchData, getUniqueValuesArray } from './';
import { ApiHtml } from '../components/ApiHtml/ApiHtml';

export function useApis() {
  const [error, setError] = useState(null);
  const [filterArrays, setFilterArrays] = useState({ Category: [], HTTPS: [], Auth: [], Cors: [] });
  const [filters, setFilters] = useState({ Category: '', HTTPS: '', Auth: '', Cors: '' });
  const [apiArray, setApiArray] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [displayRandom, setDisplayRandom] = useState(false);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    loadData();
  }, [refresh]);

  function reloadData() {
    setRefresh(refresh => refresh + 1);
    setIsDataLoading(true);
  }

  function loadData() {
    fetchData()
      .then(data => {
        const { message, code } = data;

        if (code !== '200' && message) throw Error(message);

        setError(null);
        const apis = data.entries.map((api, id) => {
          if (api.Auth === '') api.Auth = 'none';
          api.HTML = ApiHtml(api, id);
          return api;
        });
        setApiArray(apis);
        const filterArrays = {};
        Object.keys(filters).map(key => {
          filterArrays[key] = getUniqueValuesArray(apis, key);
        });
        setFilterArrays(filterArrays);
      })
      .catch(setError)
      .finally(() => {
        setIsDataLoading(false);
      });
  }

  return {
    error,
    setError,
    filterArrays,
    setFilterArrays,
    filters,
    setFilters,
    apiArray,
    setApiArray,
    isDataLoading,
    setIsDataLoading,
    displayRandom,
    setDisplayRandom,
    reloadData,
  };
}
