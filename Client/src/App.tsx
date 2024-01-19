import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import axios from 'axios';

function App() {
  const [count, setCount] = useState(0);
  const [hasResponse, setHasResponse] = useState(false); // New state to track response

  useEffect(() => {
    // Make a GET request
    axios.get('http://localhost:3000/')
      .then(response => {
        // Handle the response data
        console.log("its all here " + response.data);
        setHasResponse(true); // Set state to true when response is received
      })
      .catch(error => {
        // Handle errors
        console.error('Error fetching data:', error);
        setHasResponse(false); // Set state to false in case of an error
      });
  }, []); // Empty dependency array to ensure the effect runs once on component mount

  return (
    <>
      {hasResponse && (  // Render the app only if there is a response
        <div>
          <div>
            <a href="https://vitejs.dev" target="_blank">
            </a>
            <a href="https://react.dev" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>
          <h1>Vite + React</h1>
          <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </button>
            <p>
              Edit <code>src/App.tsx</code> and save to test HMR
            </p>
          </div>
          <p className="read-the-docs">
            Click on the Vite and React logos to learn more
          </p>
        </div>
      )}
    </>
  );
}

export default App;
