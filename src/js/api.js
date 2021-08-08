import axios from 'axios';
import { sortAutoComplete } from './scripts';

// Replace cards with prints for all versions
const searchQuery = 'https://api.scryfall.com/cards/search/?q=';

// GET ALL MATCHING COMMANDERS
const searchCommanders = async (id, input, isValidCommander = true) => {
  // Limited to cards that match the search string and are of exactly a specific color identity.
  // regex is because & and # caused strange results...
  const endpoint = `${searchQuery}${input.replace(/[&#]/g, '')}%2C+id%3D${id}${
    isValidCommander ? '+is%3Acommander' : '+type%3Acreature'
  }`;
  try {
    const response = await axios.get(endpoint);
    const {
      data: { data },
    } = response;
    const names = data.map(({ name }) => name);

    sortAutoComplete(names, input);

    console.log(names);
    console.log(input);
  } catch (err) {
    console.log('No results...');
  }
};

// GET SPECIFIC COMMANDER
const getCommander = async (id, input) => {
  // Not limiting to commanders because user may have requested to allow non-legendaries + banned cards
  const endpoint = `${searchQuery}${encodeURIComponent(
    input
  )}%2C+id%3D${id}+type%3Acreature`;

  try {
    const response = await axios.get(endpoint);
    const {
      data: {
        data: [{ ...card }],
      },
    } = response;
    let name, identity, cost, art; // Data needed for card component

    identity = card.color_identity;

    console.log(response);

    if (card.card_faces) {
      name = card.card_faces.map(({ name }) => name);
      if (card.image_uris) {
        // Single-faced flip cards
        cost = card.mana_cost;
        art = card.image_uris.art_crop;
        console.log(cost);
        console.log(name);
      } else {
        // Modal double-faced cards (Kaldheim Gods / Zendikar Rising)
        cost = card.card_faces.map(({ mana_cost }) => mana_cost);
        art = card.card_faces.map(({ image_uris: { art_crop } }) => art_crop);
      }
    } else {
      // Normal cards
      name = card.name;
      identity = card.color_identity;
      cost = card.mana_cost;
      art = card.image_uris.art_crop;
    }

    /*     const {
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
    } = response; */
    //console.log({ name, identity, cost, art });
    //return { name, identity, cost, art };

    console.log({ name, identity, cost, art });
  } catch (err) {
    console.log('Something went wrong...');
  }
};

searchCommanders('BGU', 'Jorn', false);
getCommander('W', 'rune-tail');
//getCommander('BGU', 'Jorn');
