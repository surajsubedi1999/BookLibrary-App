import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { BookProvider } from './src/context/BookContext';

export default function App() {
  return (
    <BookProvider>
      <AppNavigator />
    </BookProvider>
  );
}