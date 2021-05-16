/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement } from './element';
let Component, Target;

export default function renderApp(componentFunction = null, targetElement = null) {
  let { activeInputId } = window.dataStore;
  if (componentFunction) Component = componentFunction;
  if (targetElement) Target = targetElement;
  Target.innerHTML = '';
  Target.appendChild(<Component />);
  if (activeInputId !== '' && document.getElementById(activeInputId) !== null)
    document.getElementById(activeInputId).focus();
}
