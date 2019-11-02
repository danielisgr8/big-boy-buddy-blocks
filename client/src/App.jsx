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
        <Board drawing="3"></Board>
      )}
    </div> 
  );
}
export default App;
