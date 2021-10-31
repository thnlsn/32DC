//* Dependencies
import React, { useState, useEffect, useRef } from 'react';

//* Scripts
import { searchCommanders, getCommander } from '../js/api';
import {
  decorateBorder,
  decorateBackground,
  decorateCost,
  decorateIndicators,
} from '../js/scripts';
import Delete from './Icons/Delete';

// In the case of modal double-faced cards, name, cost and art will be arrays with the main side data first //~ HANDLE THIS CASE!
// In the case of single-faced flip cards, name and art will be arrays with main side data first //~ HANDLE THIS CASE!
//~ Make button to view the full card image / both sides if array of data.
//~ Make button to view flip-side if array of data.
//~ Don't allow search when "No Results..." - and don't let there be hover effect on it either.
//~ Make it so autocompletes scroll down when you press down and it is in the overflowed portion.
//~ IDEA: Make any possible second art under the main art so that there can be a fade in/out between the 2 rather than instant transition
const Card = ({ identity }) => {
  const [flipped, setFlipped] = useState(false); // Flip this if option is clicked and successful response
  const [suggestions, setSuggestions] = useState([]); //
  const [selection, setSelection] = useState(null); // For up/down key press on input to cycle options
  const [name, setName] = useState([]);
  const [cost, setCost] = useState([]);
  const [art, setArt] = useState([]);
  const [front, setFront] = useState(true); // Front as in front/main face/side of the actual real-life card
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
  // Handle key downs in autocomplete suggesstions  //////////////////////////////////////////////////////
  const handleOnKeyDown = ({ key }) => {
    if (key === 'Enter' && suggestions.length > 0) {
      if (Number.isInteger(selection)) {
        setName(suggestions[selection].split('//'));
      } else {
        setSelection(0);
        setName(suggestions[0].split('//'));
      }
    }
    if (key === 'ArrowUp' && suggestions.length > 0) {
      if (
        Number.isInteger(selection) &&
        selection < suggestions.length &&
        selection - 1 >= 0
      ) {
        setSelection(selection - 1);
      } else {
        setSelection(0);
      }
    }
    if (key === 'ArrowDown' && suggestions.length > 0) {
      if (
        Number.isInteger(selection) &&
        selection >= 0 &&
        selection + 1 < suggestions.length
      ) {
        setSelection(selection + 1);
      } else {
        setSelection(0);
      }
    }
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Handle switch faces  ////////////////////////////////////////////////////////////////////////////////
  const handleSwitchFace = () => {
    // If there are 2 names and only 1 art, then switch the name and rotate the image 180 degrees //*-- it is a single face flip card
    if (name.length === 2 && art.length === 1) {
      setFront(!front); //~ Set front but we dont want the art or cost to change... Fix this
    }
    // If there are 2 names and 2 arts, then switch the name and art  //*-- it is a multi-face card
    if (name.length === 2 && art.length === 2) {
      setFront(!front);
    }
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Handle delete selection  ////////////////////////////////////////////////////////////////////////////
  const handleDelete = () => {
    // Set all state back to initial state
    setFlipped(false);
    setName([]);
    setCost([]);
    setArt([]);
    setSuggestions([]);
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
        console.log(name);
        const commander = await getCommander(name, identity);
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
    if (name.length > 0 && cost.length > 0 && art.length > 0) {
      console.log('flipped');
      setFlipped(true);
    }
  }, [name, art, cost]);

  //~ Add useEffect to fetch for DB when there is one, and set name field of card

  console.log(identity);

  return (
    <div className='card' style={{ background: `${decorateBorder(identity)}` }}>
      {flipped ? (
        ////////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Back-side of card component /////////////////////////////////////////////////////////////////////////
        <div
          className='image-container'
          style={decorateBackground(front && art.length > 0 ? art[0] : art[1])}
        >
          <Delete handleDelete={handleDelete} />

          <div className='symbols-container'>
            {/* Cost handler */}
            {decorateCost(front && cost.length ? cost[0] : cost[1])}
          </div>
          {identity !== 'C' && (
            <div className='symbols-container symbols-container--small symbols-container--vertical'>
              {/* Identity colors handler */}
              {decorateIndicators(identity)}
            </div>
          )}
          <div className='image-container__options'>
            <div className='image-container__option' onClick={handleSwitchFace}>
              FACESWAP
            </div>
          </div>
          <div className='image-container__name card-name'>
            {name[front ? 0 : 1]}
          </div>
        </div>
      ) : (
        ////////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Front-side of card component ////////////////////////////////////////////////////////////////////////
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
            onKeyDown={handleOnKeyDown}
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
                onClick={({ target: { textContent } }) =>
                  setName(textContent.split('//'))
                }
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
