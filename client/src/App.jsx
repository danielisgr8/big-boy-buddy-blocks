import React, {useState} from 'react';
import './App.css';
import Login from './Login';
import Game from './Game';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [playerName, setPlayerName] = useState("Player");
  const [playerColor, setPlayerColor] = useState("Forgot a Color");
  return(
    <div>
      {isLoggedIn ? (
        <Game drawing="3" myName = {playerName} myColor = {playerColor} />
      ) : (
        <Login onSubmit={(myName, myColor)=>{
          setIsLoggedIn(true); 
          setPlayerName(myName); 
          setPlayerColor(myColor);
          }}/>
      )}
    </div> 
  );
}
export default App;
