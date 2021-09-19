import React, { useState } from 'react';
import axios from 'axios'
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'

function App() {
  const [file, setFile] = useState()


  const fileSelectedHandler = async (event) => {
    setFile(event.target.files[0])
    console.log(event.target.files[0])
    const {data} = await axios.get('/api/users')
    console.log(data)
  }

  const fileUploadHandler = () => {

  }

  // const fileUploadHandler = 
  return (
    <div className="App">
      <h1>Picover</h1>
      <input type="file" onChange={fileSelectedHandler}/>
      <button onClick={fileUploadHandler}>Upload</button>
      <h1>We now have Auth!</h1>
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);
