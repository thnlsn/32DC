//* Dependencies
import React from 'react';
import './css/style.css';

//* Components
import Card from './components/Card';

function App() {
  return (
    <div className='App'>
      <div className='cards'>
        <Card identity={'W'} />
        <Card identity={'U'} />
        <Card identity={'B'} />
        <Card identity={'R'} />
        <Card identity={'G'} />
      </div>
    </div>
  );
}

export default App;
