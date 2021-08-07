import axios from 'axios';

// Replace cards with prints for all versions
const searchQuery = 'https://api.scryfall.com/cards/search/?order=name&q=';

// Get all commanders
const searchCommanders = async (id, string, isValidCommander = true) => {
  const endpoint = `${searchQuery}${string}%2C+id%3D${id}${
    isValidCommander ? '+is%3Acommander' : '+type%3Acreature'
  }`;
  console.log(endpoint);
  const response = await axios.get(endpoint);
  console.log(response);
};

// Get specific commander
const getCommander = async (id, string) => {
  // Not limiting to commanders because user may have requested to allow non-legendaries + banned cards
  const endpoint = `${searchQuery}${string}%2C+id%3D${id}+type%3Acreature`;
  console.log(endpoint);
  const {
    data: {
      data: [
        {
          name,
          color_identity: identity,
          mana_cost: cost,
          image_uris: { art_crop: art },
        },
      ],
    },
  } = await axios.get(endpoint);
  console.log({ name, identity, cost, art });
};

searchCommanders('BGU', 'Leov', false);
getCommander('BGU', encodeURIComponent('Leovold'));
