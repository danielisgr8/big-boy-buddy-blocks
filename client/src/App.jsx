import React, {useState} from 'react';
import './App.css';
import Login from './Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState("false");
  return(
    <div>
      {isLoggedIn ? (
        <Login/>
      ) : (
        <Login/>
      )}
    </div> 
  );
}

export default App;
