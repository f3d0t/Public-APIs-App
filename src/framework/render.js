/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement } from './element';
let Component, Target, ActiveInputId;

export function renderApp(componentFunction = null, targetElement = null) {
  const { activeInputId } = window.dataStore;
  if (componentFunction) Component = componentFunction;
  if (activeInputId) ActiveInputId = activeInputId;
  if (targetElement) Target = targetElement;
  Target.innerHTML = '';
  Target.appendChild(<Component />);
  if (activeInputId !== undefined && document.getElementById(ActiveInputId) !== null)
    document.getElementById(activeInputId).focus();
}
