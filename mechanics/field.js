const { getRandomNumber } = require("../utils/random.js");

let config = {
  pokemonLimit: 6,
};

let field = {
  left: {
    roster: [],
    active: {
      position: null,
      pokemon: null,
    },
    effect: null,
    weather: "normal",
    numberOfPokemons: 0,
  },
  right: {
    roster: [],
    active: {
      position: null,
      pokemon: null,
    },
    effect: null,
    weather: "normal",
    numberOfPokemons: 0,
  },
};

const addToField = (pokemon, side = "left", isActive = false) => {
  if (field[side].numberOfPokemons === config.pokemonLimit) {
    return console.log(
      `Error: You can't add more than ${config.pokemonLimit} pokemon in each team`
    );
  } else {
    pokemon.key = getRandomNumber();
    field[side].roster.push(pokemon);

    if (isActive) {
      field[side].active.position = field[side].numberOfPokemons;
      field[side].active.pokemon =
        field[side].roster[field[side].numberOfPokemons];
    } else if (field[side].numberOfPokemons === 0) {
      field[side].active.position = 0;
      field[side].active.pokemon = field[side].roster[0];
    }

    field[side].numberOfPokemons++;
  }
};

const swapPokemon = (side = "left", pokemon1 = {}, pokemon2 = {}) => {
  const idx = ["side" + side].roster.findIndex(
    ({ key }) => key === pokemon1.key
  );
  side.roster.splice(idx, 0, pokemon2);
};

const removePokemon = (side) => {
  const idx = ["side" + side].roster.findIndex(
    ({ key }) => key === pokemon1.key
  );
  side.roster.splice(idx, 0);
};

const changeActive = (side, pokemon) => {
  let { roster, active } = field[side];
  roster.find((r, idx) => {
    if (r.name === pokemon.name) {
      active = idx;
      return true;
    } else {
      return false;
    }
  });
};

const exportField = () => field;

module.exports = {
  addToField,
  changeActive,
  removePokemon,
  swapPokemon,
  exportField,
};
