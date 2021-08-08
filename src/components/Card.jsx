//* Dependencies
import React, { useState, useEffect } from 'react';

//* Scripts
import { searchCommanders } from '../js/api';
import { border } from '../js/scripts';

const background = (url) => ({
  backgroundImage: `url(${url})`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
});

// In the case of modal double-faced cards, name, cost and art will be arrays with the main side data first //~ HANDLE THIS CASE!
// In the case of single-faced flip cards, name and art will be arrays with main side data first //~ HANDLE THIS CASE!
//~ Make button to view the full card image
//~ Make button to view flip-side if array of data
const Card = ({ identity }) => {
  const [flipped, setFlipped] = useState(false); // Flip this if option is clicked and successful response
  let name = '';
  let art = '';
  let cost = '';

  return (
    <div className='card' style={{ background: `${border(identity)}` }}>
      {flipped ? (
        <div className='image-container' style={background(art)}>
          <div className='image-container__cost'>{cost}</div>
          <div className='image-container__name card-name'>{name}</div>
        </div>
      ) : (
        <div className='new-container' style={background(art)}>
          <input
            className='new-container__input'
            type='text'
            onChange={({ target: { value } }) => {
              searchCommanders(value, identity);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Card;

// Click +
// Input field search
//
