import React,{useState,useRef} from 'react';
import './App.css';

function padTime(time){
  return time.toString().padStart(2,'0');
}

export default function App() {
  const [title,setTitle]=useState('Let the countdown begin!!!');
  const [ timeLeft, setTimeLeft]=useState(60*60);
  const [isRunning,setIsRunning]=useState(false);
  const intervalRef=useRef(null);

  function startTimer(){

    if(intervalRef.current != null) return;

    setIsRunning(true);

    setTitle("Lets count down!");

    intervalRef.current = setInterval(()=>{
      setTimeLeft(timeLeft=> {
      
      if(timeLeft>= 1) return timeLeft-1;
      resetTimer();
      return 0;
      
      }); 
    },1000);
  }

  function stopTimer(){

    if(intervalRef == null) return;
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setTitle("You stoped the timer! Are you happy :)");
    intervalRef.current=null;
  }

  function resetTimer(){
    clearInterval(intervalRef.current);
    setTimeLeft(25*60);
    setIsRunning(false);
    intervalRef.current=null;
  }

  const minutes=padTime(Math.floor(timeLeft/60));
  const seconds=padTime(timeLeft-minutes*60)

  return (
    <div className="app">
      <h2>{title}</h2>

      <div className="timer">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>

      <div className="buttons">
        {!isRunning && <button onClick={startTimer}>Start</button>}
        {isRunning && <button onClick={stopTimer}>Stop</button>}
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}
