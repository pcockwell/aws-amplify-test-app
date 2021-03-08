import React, { useEffect, useState } from 'react'
import logo from './logo.svg';
import './App.css';
import { Auth, API } from 'aws-amplify'
import '@aws-amplify/ui/dist/style.css';
import { AmplifyAuthenticator, AmplifySignIn, AmplifySignUp, AmplifySignOut } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';


function App() {
  const [authState, setAuthState] = useState();
  const [selectedFile, setSelectedFile] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
        setAuthState(nextAuthState);
        setUser(authData)
    });
  }, []);

  const onFileChange = event => {
    setSelectedFile(event.target.files[0])
  }
    
  // On file upload (click the upload button)
  const onFileUpload = () => {  
    // Details of the uploaded file
    console.log(selectedFile);
  
    // Request made to the backend api
    // Send formData objectconst apiName = 'MyApiName';
    const path = '/report'; 
    const myInit = { // OPTIONAL
      body: {
        name: selectedFile.name,
        type: selectedFile.type,
      }, // replace this with attributes you need
      headers: {}, // OPTIONAL
    };

    console.log(myInit)

    API
      .put('amplifyTestApi', path, myInit)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error.response);
     });
  };

  const fileData = () => {
    if (selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {selectedFile.name}</p>
          <p>File Type: {selectedFile.type}</p>
          <p>
            Last Modified:{" "}
            {selectedFile.lastModifiedDate.toDateString()}
          </p>

        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  }

  if (authState === AuthState.SignedIn && user) {
    console.log(user)
  }

  return authState === AuthState.SignedIn && user ? (
    <div className="App">
      <AmplifySignOut />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello, {user.attributes.email}</p>
        <h3>
          File Upload using React!
        </h3>
        <div>
            <input type="file" onChange={onFileChange} />
            <button onClick={onFileUpload}>
              Upload!
            </button>
        </div>
        {fileData()}
      </header>
    </div>
    ) : (
      <AmplifyAuthenticator>
        <AmplifySignUp
          slot="sign-up"
          usernameAlias="email"
          formFields={[
            { type: "email" },
            { type: "password" },
          ]}
        />
        <AmplifySignIn slot="sign-in" usernameAlias="email" />
      </AmplifyAuthenticator>
  );
}

export default App;
