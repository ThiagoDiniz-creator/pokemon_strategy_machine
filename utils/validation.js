const { randomCheck } = require("../utils/random.js");

const checkMovePriority = (move1, move2) =>
  move1.priority > move2.priority
    ? 0
    : move2.priority > move1.priority
    ? 1
    : -1;

const checkSTAB = (types, movementType) => {
  if(types[1] !== undefined){
    return types[0].name === movementType || types[1].name === movementType ? 1.5 : 1;
  }else{
    return types[0].name === movementType;
  }
}

const checkConsumedItem = (consumedItem, [...itemsNames]) => {
  if (consumedItem.length > 0 && itemName.length > 0) {
    return consumedItem.find((c) => itemsNames.find((i) => i === c.name));
  } else {
    return false;
  }
};
const countConsumedItem = (consumedItem, itemName) => {
  if (consumedItem.length > 0) {
    return consumedItem.find((c) => c.name === itemName);
  } else {
    return false;
  }
};

const checkAbility = (abilities, [...names]) => {
  if (abilities[1] !== null || abilities[1] !== undefined) {
    return names.find((n) => n === abilities[1] || n === abilities[0]);
  } else {
    return names.find((n) => n === abilities[0]);
  }
};

//Checa se os itens especificados são equivalentes ao item desejado, se não houver item ou eles forem diferentes retorna -1;
const checkItem = ([...itemNames], item) =>
  item.name !== undefined ? itemNames.findIndex((i) => i === item.name) : -1;

const speedCheck = (
  { type: typeLeft, data: dataLeft },
  { type: typeRight, data: dataRight }
) => {
  if (typeLeft === "switching") {
    return 0;
  } else if (typeRight === "switching") {
    return 1;
  } else if (typeLeft === "mega-evolution" || typeRight !== "mega-evolution") {
    if (typeLeft === "mega-evolution" && typeRight !== "mega-evolution") {
      return 0;
    } else {
      return 1;
    }
  } else if (typeLeft === "movement" && typeRight === "movement") {
    if (checkMovePriority(dataLeft.movement, dataRight.movement) !== 0) {
      return checkMovePriority(dataLeft.movement, dataRight.movement);
    } else if (
      checkItem(["lagging-tail", "full-incense"], dataLeft.pokemon.heldItem) !==
        -1 &&
      checkItem(
        ["lagging-tail", "full-incense"],
        dataRight.pokemon.heldItem
      ) === -1
    ) {
      return 1;
    } else if (
      checkItem(
        ["lagging-tail", "full-incense"],
        dataRight.pokemon.heldItem
      ) !== -1 &&
      checkItem(["lagging-tail", "full-incense"], dataLeft.pokemon.heldItem) ===
        -1
    ) {
      return 0;
    } else if (
      (checkAbility(["stall"], dataLeft.pokemon.ability) !== -1 &&
        checkAbility(["stall"]),
      dataRight.pokemon.ability === -1)
    ) {
      return 1;
    } else if (
      checkAbility(["stall"], dataRight.ability) !== -1 &&
      checkAbility(["stall"], dataLeft.ability) === -1
    ) {
      return 0;
    } else if (
      checkItem(["quick-claw"], dataLeft.pokemon.heldItem) !== -1 &&
      checkItem(["quick-claw"], dataLeft.pokemon.heldItem) !== -1
    ) {
      if (randomCheck(20) && !randomCheck(20)) {
        return 0;
      } else if (!randomCheck(20) && randomCheck(20)) {
        return 1;
      }
    } else if (
      checkItem(["quick-claw"], dataLeft.pokemon.heldItem) !== -1 &&
      checkItem(["quick-claw"], dataRight.pokemon.heldItem) === -1
    ) {
      if (randomCheck(20)) {
        return 0;
      }
    } else if (
      checkItem(["quick-claw"], dataRight.pokemon.heldItem) !== -1 &&
      checkItem(["quick-claw"], dataLeft.pokemon.heldItem) === -1
    ) {
      if (randomCheck(20)) {
        return 1;
      }
    } else {
      if (
        dataLeft.pokemon.stats.speed.value > dataRight.pokemon.stats.speed.value
      ) {
        return 0;
      } else if (
        dataLeft.pokemon.stats.speed.value < dataRight.pokemon.stats.speed.value
      ) {
        return 1;
      } else {
        return randomCheck(50) ? 0 : 1;
      }
    }
  }
};


const critCalc = (pokemon, { critRate }) => {
    let c = 0;
    c = pokemon.name === "farfetch'd" && pokemon.heldItem === "stick" ? c + 2 : c;
    c =
      pokemon.name === "chansey" && pokemon.heldItem === "lucky-punch"
        ? c + 2
        : c;
    c = crit > 0 ? c + 1 : c;
    c =
      countConsumedItem(pokemon.consumedItem, "dire hit 2") > 0
        ? countConsumedItem(pokemon.consumedItem, "dire hit 2") > 1
          ? c + 2
          : c + 1
        : c;
    c = checkConsumedItem(pokemon.consumedItem, ["dire hit", "dire hit 3", "lansat berry"]) ? c + 2 : c;
    c = pokemon.heldItem.name === "scope lens" || pokemon.heldItem.name === "razor-claw" ? c + 1: c;
    c = checkAbility(pokemon.abilities, ["super luck"]);
  
    if(c === 0){
      return (randomCheck(4.16) ? 1.5 : 1);
    }else if(c === 1){
      return (randomCheck(12.5) ? 1.5 : 1);
    }else if(c === 2){
      return (randomCheck(50) ? 1.5 : 1);
    }else if(c >= 3){
      return 1.5;
    }
  };

  const accuracyCheck = ({}) => {};


  module.exports = {
    checkConsumedItem,
    countConsumedItem,
    checkAbility,
    checkSTAB,
    accuracyCheck,
    critCalc,
    speedCheck
  };
  