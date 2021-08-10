import axios from 'axios';
import { sortAutoComplete } from './scripts';

// Replace cards with prints for all versions
const searchQuery = 'https://api.scryfall.com/cards/search/?q=';

////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
// GET ALL MATCHING COMMANDERS /////////////////////////////////////////////////////////////////////////
const searchCommanders = async (input, id, isValidCommander = true) => {
  // Limited to cards that match the search string and are of exactly a specific color identity.
  // regex is because & and # caused strange results...
  const endpoint = `${searchQuery}${input.replace(/[&#]/g, '')}%2C+id%3D${id}${
    // If isValidCommander is false, non-commander, non-legendaries, banned, and silver-bordered cards will be allowed in the search.
    isValidCommander ? '+is%3Acommander+legal%3Acommander' : '+type%3Acreature'
  }`;
  try {
    const response = await axios.get(endpoint);
    const {
      data: { data },
    } = response;
    const names = data.map(({ name }, i) => name);

    console.log(sortAutoComplete(names, input)); //!Remove
    return sortAutoComplete(names, input);
  } catch (err) {
    console.log('No results...');
    return ['No results...'];
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
// GET SPECIFIC COMMANDER //////////////////////////////////////////////////////////////////////////////
const getCommander = async (input, id) => {
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

    console.log(response); //!Remove
    // If there are card faces, then it is either a flip or double-faced card
    if (card.card_faces) {
      name = card.card_faces.map(({ name }) => name);
      if (card.image_uris) {
        // Single-faced flip cards
        cost = card.mana_cost;
        art = card.image_uris.art_crop;
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
    console.log({ name, identity, cost, art }); //!Remove
    return { name, identity, cost, art };
  } catch (err) {
    console.log('Something went wrong...');
    return null;
  }
};

//searchCommanders('a', 'BUG', false);
//getCommander('Tib', 'BR');
//getCommander('BGU', 'Jorn');

export { searchCommanders, getCommander };
