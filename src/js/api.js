import axios from 'axios';

const queryString = 'https://api.scryfall.com/cards/search/?order=name&q=';

// Get all commanders
const searchCommander = async (identity, string, isValidCommander = true) => {
  const endpoint = `${queryString}${string}%2C+id%3D${identity}${
    isValidCommander ? '+is%3Acommander' : '+type%3Acreature'
  }`;
  console.log(endpoint);
  const response = await axios.get(endpoint);
  console.log(response);
};

searchCommander('br', 'a', false);
