import { useState, useEffect } from '../framework';
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
    console.log('useEffect call');
  }, [refresh]);

  function reloadData() {
    setIsDataLoading(true);
    setRefresh(refresh => refresh + 1);
    console.log('reloadData call');
  }

  function loadData() {
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
          filterArrays[key] = getUniqueValuesArray(apis, key);
        });
        setFilterArrays(filterArrays);
      })
      .catch(setError)
      .finally(() => {
        setIsDataLoading(false);
        console.log('.finally in fetch');
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
