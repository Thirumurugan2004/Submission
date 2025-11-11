import React from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import { Provider } from 'react-redux';
import { store } from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <LoginForm />
    </Provider>
  );
}

export default App;
