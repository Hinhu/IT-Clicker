import React from 'react';
import './App.css';
import NavBar from './NavBar';
import Typer from './Typer';

function App() {
  return (
    <div className="flex flex-grow overflow-hidden">
      <NavBar />
      <Typer />
    </div>
  );
}

export default App;
