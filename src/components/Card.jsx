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
//~ Make button to view the full card image / both sides if array of data.
//~ Make button to view flip-side if array of data.
//~ Don't allow search when "No Results..." - and don't let there be hover effect on it either.
//~ Make it so autocompletes scroll down when you press down and it is in the overflowed portion.
const Card = ({ identity }) => {
  const [flipped, setFlipped] = useState(false); // Flip this if option is clicked and successful response
  const [suggestions, setSuggestions] = useState([]); //
  const [selection, setSelection] = useState(null); // For up/down key press on input to cycle options
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
        const commander = await getCommander(name);
        console.log(commander);
        if (commander) {
          const { cost, art } = commander;

          setCost(cost);
          setArt(art);
        } else {
          alert('Something went wrong in your getCommander request...');
          //~ Some kind of visual error indicator
        }
      };
      fetchCommander();
    }
  }, [name]);

  useEffect(() => {
    console.log(name, art, cost);
    if (name && cost && art) {
      console.log('flipped');
      setFlipped(true);
    }
  }, [name, cost, art]);

  //~ Add useEffect to fetch for DB when there is one, and set name field of card

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
            onKeyDown={({ key, target: { textContent } }) => {
              if (key === 'Enter') {
                console.log('Enter');
                setName(suggestions[0]);
              }
              if (key === 'ArrowUp') {
                if (
                  Number.isInteger(selection) &&
                  selection < suggestions.length &&
                  selection - 1 >= 0
                ) {
                  console.log('ArrowUp if');
                  setSelection(selection - 1);
                } else {
                  setSelection(0);
                }
                console.log(selection); // After
              }
              if (key === 'ArrowDown') {
                if (
                  Number.isInteger(selection) &&
                  selection >= 0 &&
                  selection + 1 < suggestions.length
                ) {
                  console.log('ArrowDown if');
                  setSelection(selection + 1);
                } else {
                  setSelection(0);
                }
                console.log(selection); // After
              }
            }}
            // On press enter, submit with index 0 (first autocorrect)
          />
          <ul className='suggestions text'>
            {suggestions.map((suggestion, i) => (
              <li
                className='suggestions__suggestion text'
                style={
                  selection === i
                    ? {
                        backgroundColor: 'rgba(0,0,0, 0.55)',
                        color: 'rgba(255, 255, 255, 0.65)',
                      }
                    : null
                }
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
