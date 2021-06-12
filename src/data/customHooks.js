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
  const [search, setSearch] = useState('');
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
    search,
    setSearch,
    reloadData,
  };
}

export function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay], // Only re-call effect if value or delay changes
  );
  return debouncedValue;
}
