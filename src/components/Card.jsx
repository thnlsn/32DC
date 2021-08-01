import React from 'react';

const background = (url) => ({
  backgroundImage: `url(${url})`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
});

const Card = ({
  name,
  cost = {},
  identity = 'c',
  art = 'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/f/0/f06fc6e0-b22c-40d3-bb53-d5ec400d921c.jpg?1562943286',
}) => {
  return (
    <div className='card-container'>
      <div className='image-container' style={background(art)}>
        <div className='image-container__cost'>{cost}</div>
        <div className='image-container__name'>{name}</div>
      </div>
    </div>
  );
};

export default Card;
