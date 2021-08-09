//* Dependencies
import React from 'react';
import './css/style.css';

//* Components
import Card from './components/Card';

function App() {
  return (
    <div className='App'>
      <div className='cards'>
        <Card identity={'C'} />

        <Card identity={'W'} />
        <Card identity={'U'} />
        <Card identity={'B'} />
        <Card identity={'R'} />
        <Card identity={'G'} />

        <Card identity={'WU'} />
        <Card identity={'UB'} />
        <Card identity={'BR'} />
        <Card identity={'RG'} />
        <Card identity={'GW'} />
        <Card identity={'WB'} />
        <Card identity={'UR'} />
        <Card identity={'BG'} />
        <Card identity={'RW'} />
        <Card identity={'GU'} />

        <Card identity={'GWB'} />
        <Card identity={'WUB'} />
        <Card identity={'UBR'} />
        <Card identity={'BRG'} />
        <Card identity={'RGW'} />
        <Card identity={'WBG'} />
        <Card identity={'URW'} />
        <Card identity={'BGU'} />
        <Card identity={'RWB'} />
        <Card identity={'GBR'} />

        <Card identity={'WUBR'} />
        <Card identity={'UBRG'} />
        <Card identity={'BRGW'} />
        <Card identity={'RGWU'} />
        <Card identity={'GWUB'} />

        <Card identity={'WUBRG'} />
      </div>
    </div>
  );
}

export default App;
