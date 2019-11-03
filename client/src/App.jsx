import React, {useState} from 'react';
import './App.css';
import Login from './Login';
import Game from './Game';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [playerName, setPlayerName] = useState("Player");
  const [playerScore, setPlayerScore] = useState(0);
  const [playerColor, setPlayerColor] = useState("Forgot a Color");
  return(
    <div>
      {isLoggedIn ? (
        <Game myName = {playerName} myScore = {playerScore} myColor = {playerColor} />
      ) : (
        <Login onSubmit={(myName, myColor)=>{
          setIsLoggedIn(true); 
          setPlayerName(myName); 
          setPlayerColor(myColor);
          setPlayerScore(playerScore)}}/>
      )}
    </div> 
  );
}
export default App;
