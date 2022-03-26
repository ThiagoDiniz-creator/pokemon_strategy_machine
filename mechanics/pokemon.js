const list = require("../JSON/pokemonList.json");
const { getNature } = require("../mechanics/nature.js");

const getMovepool = (name) => list.find((d) => d.name === name).moves;

const calcStat = ({ name, iv, ev, level, baseStat, nature }) => {
  if (name !== "hp") {
    const natureMod = getNature(nature);
    const multiplier =
      natureMod.decreasedStat === name
        ? 0.9
        : natureMod.increasedStat === name
        ? 1.1
        : 1;
    return (
      ((Math.floor(2 * baseStat + iv + ev) * level) / 100 + 5) * multiplier
    );
  } else if (name === "hp") {
    return (Math.floor(2 * baseStat + iv + ev) * level) / 100 + level + 10;
  }
};

const generatePokemon = (level = 50, nature = "", heldItem = null) => ({
  ailment: null,
  abilities: null,
  consumedItem: [],
  heldItem,
  level,
  movements: [],
  name: "",
  nature,
  stats: [
    { name: "hp", value: 0, base: 0, iv: 0, ev: 0, statStage: 0  },
    { name: "attack", value: 0, base: 0, iv: 0, ev: 0, statStage: 0 },
    { name: "defense", value: 0, base: 0, iv: 0, ev: 0, statStage: 0 },
    { name: "spAttack", value: 0, base: 0, iv: 0, ev: 0, statStage: 0 },
    { name: "spDefense", value: 0, base: 0, iv: 0, ev: 0, statStage: 0 },
    { name: "speed", value: 0, base: 0, iv: 0, ev: 0, statStage: 0 },
    { name: "evasion", statStage: 0}
  ],
  types: [],
});

const getInfo = (pokemon, name) => {
  const data = list.find((d) => d.name === name);
  const { stats } = data, { stats: pokemonStats } = pokemon;

  pokemon.abilities = data.abilities;
  pokemon.name = data.name;
  pokemon.movements = data.moves;
  pokemon.name = name;
  pokemon.stats = [
    { ...pokemonStats[0], base: stats[0].base, ev: stats[0].effort },
    { ...pokemonStats[1], base: stats[1].base, ev: stats[1].effort },
    { ...pokemonStats[2], base: stats[2].base, ev: stats[2].effort },
    { ...pokemonStats[3], base: stats[3].base, ev: stats[3].effort },
    { ...pokemonStats[4], base: stats[4].base, ev: stats[4].effort },
    { ...pokemonStats[5], base: stats[5].base, ev: stats[5].effort },
    { ...pokemonStats[6]}
  ];
  pokemon.types = data.types;
};

const setStats = (pokemon, statVal, nature) => {
  pokemon.stats.map(
    (s, idx) => (s.value = calcStat({ ...s, ...statVal[idx], nature }))
  );
};

module.exports = {
  generatePokemon,
  getInfo,
  setStats,
  getMovepool,
};
