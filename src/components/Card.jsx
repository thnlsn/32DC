//* Dependencies
import React, { useState, useEffect, useRef } from 'react';

//* Scripts
import { searchCommanders, getCommander } from '../js/api';
import { border } from '../js/scripts';

const background = (url) => ({
  backgroundImage: `url(${url})`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
});

// In the case of modal double-faced cards, name, cost and art will be arrays with the main side data first //~ HANDLE THIS CASE!
// In the case of single-faced flip cards, name and art will be arrays with main side data first //~ HANDLE THIS CASE!
//~ Make button to view the full card image / both sides if array of data
//~ Make button to view flip-side if array of data
const Card = ({ identity }) => {
  const [flipped, setFlipped] = useState(false); // Flip this if option is clicked and successful response
  const [suggestions, setSuggestions] = useState([]); //
  const [name, setName] = useState(null);
  const [cost, setCost] = useState(null);
  const [art, setArt] = useState(null);
  const [loading, setLoading] = useState(false);

  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Handle search input change //////////////////////////////////////////////////////////////////////////
  const handleOnChange = async ({ target: { value } }) => {
    // Remove spaces to avoid tons of responses for essentially nothing
    if (value.replace(/\s+/g, '')) {
      setSuggestions(await searchCommanders(value, identity));
    } else {
      setSuggestions([]);
    }
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Fetch commander data when a new selection is chosen  ////////////////////////////////////////////////
  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
    } else {
      // Do things after first render
      const fetchCommander = async () => {
        return await getCommander(name);
      };
      const commander = fetchCommander();
      console.log(commander);
    }
  }, [name]);

  return (
    <div className='card' style={{ background: `${border(identity)}` }}>
      {flipped ? (
        <div className='image-container' style={background(art)}>
          <div className='image-container__cost'>{cost}</div>
          <div className='image-container__name card-name'>{name}</div>
        </div>
      ) : (
        <div className='new-container'>
          <input
            className='new-container__input'
            style={{
              borderRadius: `4px 4px ${suggestions.length ? 0 : 4}px ${
                suggestions.length ? 0 : 4
              }px`,
            }}
            type='text'
            onKeyUp={handleOnChange}
            // On press enter, submit with index 0 (first autocorrect)
          />
          <ul className='suggestions text'>
            {suggestions.map((suggestion, i) => (
              <li
                className='suggestions__suggestion text'
                key={i}
                onClick={({ target: { textContent } }) => setName(textContent)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Card;

// Click +
// Input field search
//
