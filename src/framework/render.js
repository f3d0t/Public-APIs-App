import { App } from '../components/App/App';

export function renderApp() {
  let { activeInputId } = window.dataStore;
  document.getElementById('app-root').innerHTML = `${App()}`;
  if (activeInputId !== '' && document.getElementById(activeInputId) !== null)
    document.getElementById(activeInputId).focus();
}
