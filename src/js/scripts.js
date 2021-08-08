// []
// [G]
// [R, G]
// [B, R, G]
// [U, B, R, G]
// [W, U, B, R, G] = identity
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
      return colors[identity[0]]; // colors property names are the same as the values expected from the identity array //? Ex: colors['W'] = '#e9e3b1'
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
      return '#e7ce7b'; // WUBRG
    default:
      return '#cac5c0'; // Colorless
  }
};

// Removes spaces, punctuation and capitalization
const _stripPunctuation = (input) => {
  return input
    .replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~ ]/g, '')
    .toLowerCase();
};

const _sortInputFirst = (input, data) => {
  var first = [];
  var others = [];
  for (var i = 0; i < data.length; i++) {
    if (_stripPunctuation(data[i]).indexOf(_stripPunctuation(input)) == 0) {
      first.push(data[i]);
    } else {
      others.push(data[i]);
    }
  }
  first.sort();
  others.sort();
  return first.concat(others);
};

const sortAutoComplete = (arr, string) => {
  // Strip the entire array AND the string for comparison purposes
  const strippedArr = arr.map((str) => _stripPunctuation(str));
  const strippedStr = _stripPunctuation(string);
  // Sort based on string first
  console.log(_sortInputFirst(string, arr));
};

export { border, sortAutoComplete };
