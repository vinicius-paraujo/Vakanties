import * as React from 'react-native';

import { AlertProvider } from './assets/context/AlertContext';
import RegionProvider from './assets/context/RegionContext';
import AppNav from './assets/navigation/AppNav';

export default function App() {
  return (
    <AlertProvider>
    <RegionProvider>
      <AppNav />
    </RegionProvider>
    </AlertProvider>
  );
}