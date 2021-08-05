//* Dependencies
import React from 'react';
import './css/style.css';

//* Scripts
import api from './js/api';

//* Components
import Card from './components/Card';

function App() {
  return (
    <div className='App'>
      <div className='cards'>
        <Card name={'name'} cost={'cost'} identity={'identity'} art={'art'} />
      </div>
    </div>
  );
}

export default App;
