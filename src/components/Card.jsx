import React from 'react';

// []
// [G]
// [R, G]
// [B, R, G]
// [U, B, R, G]
// [W, U, B, R, G]
const border = (identity) => {
  const colors = {
    W: '#e9e3b1',
    U: '#8ebbd1',
    B: '#9b8e8a',
    R: '#de8166',
    G: '#80b092',
  };
  switch (identity.length) {
    case 1:
      return colors[identity[0]];
    case 2:
      return `linear-gradient(90deg, ${colors[identity[0]]} 35%, ${
        colors[identity[1]]
      } 65%)`;
    case 3:
      return `linear-gradient(90deg, ${colors[identity[0]]} 0%, ${
        colors[identity[1]]
      } 30%, ${colors[identity[1]]} 70%, ${colors[identity[2]]} 100%)`;
    case 4:
      return `radial-gradient(ellipse at top left, ${
        colors[identity[0]]
      } 15%, transparent 60%), 
      radial-gradient(ellipse at bottom left, ${
        colors[identity[1]]
      } 15%, transparent 60%),
      radial-gradient(ellipse at top right, ${
        colors[identity[2]]
      } 15%, transparent 70%),
      radial-gradient(circle at bottom right, ${
        colors[identity[3]]
      } 15%, transparent 70%)`;
    case 5:
      return '#e7ce7b';
    default:
      return '#cac5c0';
  }
};

const background = (url) => ({
  backgroundImage: `url(${url})`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
});

const testName = 'Asmoranomardicadaistinaculdacar';

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
