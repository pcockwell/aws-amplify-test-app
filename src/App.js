import React, { useEffect, useState } from 'react'
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import { Auth, API } from 'aws-amplify'
import '@aws-amplify/ui/dist/style.css';
import { AmplifyAuthenticator, AmplifySignIn, AmplifySignUp, AmplifySignOut } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';


function App() {
  const [authState, setAuthState] = useState();
  const [selectedFile, setSelectedFile] = useState();
  const [uploadStatus, setUploadStatus] = useState('No File Selected');
  const [user, setUser] = useState();

  useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData)
    });
  }, []);

  const onFileChange = event => {
    setSelectedFile(event.target.files[0])
    setUploadStatus('File Not Uploaded')
  }
    
  // On file upload (click the upload button)
  const onFileUpload = () => {  
    // Request made to the backend api
    // Send formData objectconst apiName = 'MyApiName';
    const path = '/getUploadUrl'; 
    const token = user.getSignInUserSession().getIdToken().getJwtToken();
    const myInit = { // OPTIONAL
      headers: { Authorization: token },
      response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
      queryStringParameters: {  // OPTIONAL
        name: selectedFile.name,
        type: selectedFile.type
      },
    };

    setUploadStatus('Requesting Pre-Signed Upload URL')

    API
      .get('amplifyTestApi', path, myInit)
      .then(response => {
        setUploadStatus('Uploading to S3')
        const formData = new FormData();
        Object.keys(response.data.fields).forEach(key => {
          formData.append(key, response.data.fields[key]);
        });

        // Actual file has to be appended last.
        formData.append("file", selectedFile);

        return axios.post(response.data.upload_url, formData);
      })
      .then(response => {
        setUploadStatus('File Uploaded')
        console.log(response)
      })
      .catch(error => {
        setUploadStatus('Upload Failed - See Developer Console')
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
          <p>
            Upload Status:{" "}
            {uploadStatus}
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
  if (selectedFile) {
    console.log(selectedFile)
  }

  return authState === AuthState.SignedIn && user ? (
    <div className="App">
      <AmplifySignOut />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello, {user.attributes.email}</p>
        <p>Your organization is {user.attributes['custom:organization']}</p>
        <h3>
          Select a file to upload
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
        <AmplifySignIn slot="sign-in" usernameAlias="email" hideSignUp />
      </AmplifyAuthenticator>
  );
}

export default App;
