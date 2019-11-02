import React, {useState} from 'react';
import './App.css';
import Login from './Login';
import Board from './Board';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return(
    <div>
      {isLoggedIn ? (
        <Board drawing="3"></Board>
      ) : (
        <Login onSubmit={(myName)=>{setIsLoggedIn(true); console.log("in app: " + myName)}}/>
      )}
    </div> 
  );
}
export default App;
