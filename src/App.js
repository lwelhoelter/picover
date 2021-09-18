import React, { useState } from 'react';
import axios from 'axios'

function App() {
  const [file, setFile] = useState()


  const fileSelectedHandler = event => {
    setFile(event.target.files[0])
  }

  const fileUploadHandler = () => {

  }

  // const fileUploadHandler = 
  return (
    <div className="App">
      <h1>Picover</h1>
      <input type="file" onChange={fileSelectedHandler}/>
      <button onClick={fileUploadHandler}>Upload</button>
    </div>
  );
}

export default App;
