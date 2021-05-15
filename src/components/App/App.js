import { Header } from '../Header/Header';
import { Menu } from '../Menu/Menu';
import { Content } from '../Content/Content';
import styles from './App.css';

export function App() {
  return `${Header()}
          ${Menu()}
          ${Content()}`;
}
