import React from 'react';
import symbols from '../images/Icons';

////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
// Controls the border color based on cards color identity  ////////////////////////////////////////////
//^ identity => ['W', 'U', 'B', 'R', 'G']   -   ['G']   -   []
const decorateBorder = (identity) => {
  const colors = {
    W: '#e9e3b1',
    U: '#8ebbd1',
    B: '#9b8e8a',
    R: '#de8166',
    G: '#80b092',
  };
  switch (identity.length) {
    case 1:
      return colors[identity[0]]; // colors property names are the same as the values expected from the identity array //? Ex: colors['W'] = '#e9e3b1'
    case 2:
      return `linear-gradient(90deg, ${colors[identity[0]]} 25%, ${
        colors[identity[1]]
      } 75%)`;
    case 3:
      return `
      linear-gradient(145deg, ${colors[identity[0]]} 0%, ${
        colors[identity[1]]
      } 50%, ${colors[identity[2]]} 100%)`;
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
      return '#e7ce7b'; // WUBRG
    default:
      return '#cac5c0'; // Colorless
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
// Sorts the *arr response from api by matching input *string //////////////////////////////////////////
//^ costString => "{W}{U}{B}{R}{G}{2}"   -   "{G}{G}{X}"   -   "{2}{B/P}{B/P}{B/P}"   -   "{4}{U}{S}"
const decorateCost = (costString) => {
  // Removes the first and last open/closing curly brackets {}, removes all forward slashes /, and splits the rest of the cost symbols into an array by the }{ as a delimiter
  //^ "{2}{B/P}{B/P}{B/P}" ---> "2}{B/P}{B/P}{B/P" ---> "2}{BP}{BP}{BP" ---> ["2","BP","BP","BP"]
  const costArray = costString.slice(1, -1).replaceAll('/', '').split('}{');
  // For each symbol string in the array, map to the correct symbol dynamically using bracket notation to get the img src for the local file
  const cost = costArray.map((symbol) => {
    return <img className='image-container__symbol' src={symbols[symbol]} />;
  });
  return cost;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
// Sorts the *arr response from api by matching input *string //////////////////////////////////////////
const sortAutoComplete = (arr, string) => {
  // Strip the entire array AND the string for comparison purposes
  const strippedArr = arr.map((str) => _stripPunctuation(str));
  const strippedStr = _stripPunctuation(string);
  // Sort based on string first
  return _sortInputFirst(string, arr);
};

// Removes spaces, punctuation and capitalization
const _stripPunctuation = (input) => {
  return input
    .replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~ ]/g, '')
    .toLowerCase();
};

// Taking an input string and an array of strings, sort the array by strings that begin exactly the same as the input first
const _sortInputFirst = (input, data) => {
  var first = []; // Strings in data array that being with the same characters as the input
  var others = []; // Everything else, alphabetized
  for (var i = 0; i < data.length; i++) {
    // If the first characters (index 0) of the data string is the same as the input (both stripped), then it is a match and push it to first
    if (_stripPunctuation(data[i]).indexOf(_stripPunctuation(input)) == 0) {
      first.push(data[i]);
    } else {
      // Otherwise push it to others
      others.push(data[i]);
    }
  }
  return first.concat(others);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
// x ///////////////////////////////////////////////////////////////////////////////

export { decorateBorder, decorateCost, sortAutoComplete };
