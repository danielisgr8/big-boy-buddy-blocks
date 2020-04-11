import React, {useState} from 'react';
import './App.css';
import Login from './Login';
import Game from './Game';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [playerName, setPlayerName] = useState("Player");
  const [playerColor, setPlayerColor] = useState("Orange");
  const [local, setLocal] = useState(false);

  return(
    <div>
      {isLoggedIn ? (
        <Game drawing="3" myName = {playerName} myColor = {playerColor} local={local} />
      ) : (
        <Login onSubmit={(myName, myColor, myLocal)=>{
          setIsLoggedIn(true); 
          setPlayerName(myName); 
          setPlayerColor(myColor);
          setLocal(myLocal);
          }}/>
      )}
    </div> 
  );
}
export default App;
