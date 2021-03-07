import React, { useEffect } from 'react'
import logo from './logo.svg';
import './App.css';
import { Auth } from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react'
import '@aws-amplify/ui/dist/style.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          It has been edited and pushed
        </p>
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

export default withAuthenticator(App);
