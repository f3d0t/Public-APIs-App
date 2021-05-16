/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../../framework/element';
import { Header } from '../Header/Header';
import { Menu } from '../Menu/Menu';
import { Content } from '../Content/Content';

export function App() {
  return (
    <>
      <Header />
      <Menu />
      <Content />
    </>
  );
}
