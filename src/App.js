import React, { useEffect } from 'react'
import logo from './logo.svg';
import './App.css';
import { Auth } from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react'
import '@aws-amplify/ui/dist/style.css';


const signUpConfig = {
  hiddenDefaults: ['username'],
  signUpFields: [
    {
      label: 'Email',
      key: 'username',
      required: true,
      displayOrder: 1,
      type: 'email',
      custom: false
    },
    {
      label: 'Password',
      key: 'password',
      required: true,
      displayOrder: 2,
      type: 'password',
      custom: false
    }
  ]
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default withAuthenticator(App, { signUpConfig });
