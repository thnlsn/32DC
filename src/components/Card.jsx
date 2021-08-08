import React from 'react';

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
const Card = ({
  name = 'Kozilek, the Great Distortion',
  cost = '{8}{C}{C}',
  identity = ['R', 'G', 'W', 'U'],
  art = 'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/f/0/f06fc6e0-b22c-40d3-bb53-d5ec400d921c.jpg?1562943286',
}) => {
  return (
    <div className='card' style={{ background: `${border(identity)}` }}>
      <div className='image-container' style={background(art)}>
        <div className='image-container__cost'>{cost}</div>
        <div className='image-container__name card-name'>{name}</div>
      </div>
    </div>
  );
};

export default Card;
