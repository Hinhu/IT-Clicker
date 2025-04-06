import React from 'react';

import NavBar from './NavBar';
import Typer from './Typer';
import LinesProvider from './LinesProvider';

function App() {
  return (
    <div className="flex flex-grow overflow-hidden">
      <LinesProvider>
        <NavBar />
        <Typer />
      </LinesProvider>
    </div>
  );
}

export default App;
