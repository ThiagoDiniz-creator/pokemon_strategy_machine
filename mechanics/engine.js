const { exportField } = require("./field.js");
const { getOption } = require("../utils/message.js");
const { generateMovement } = require("./movement.js");
const { speedCheck } = require("../utils/validation.js");
let left, right;

const updateReference = () => {
  (left = { ...exportField().left });
  ((right = { ...exportField().right }));
};

const actionMatcher = ({ type, data }, sideAttack, sideDefense) => {
  switch (type) {
    case "switching":
      side.active.position = data.target;
      side.active.pokemon = sideAttack.roster[position];
      break;

    case "item":
      //To do - Item usage
      break;

    case "movement":
      generateMovement(
        data.movement,
        sideAttack.active.pokemon,
        sideDefense.active.pokemon
      );
      break;

    case "surrender":
      sideAttack.active.position = null;
      sideAttack.active.pokemon = null;
      break;

    default:
      return console.log(
        "Type Mismatch: No valid action with that type was found."
      );
      break;
  }
};

const checkAlive = (roster) => {
  return roster.filter((r) => r.stats.hp.value > 0);
}

const forceNewActive = (pokemon) => {
  const side = (left.roster.find((r) => r.key === pokemon.key)).length > 0 ? left : right;
  const alive = checkAlive(side.roster);

  if(alive.length > 0){
    side.active.position = side.roster.findIndex((r) => r.key === alive[0].key);
    side.active.pokemon = side.roster[side.active.position];
  }else{
    side.active.position === null;
    side.active.pokemon === null;
  }
}

const inflictDamage = (damage, target) => {
  target.stats.hp.value -= damage;
  if(target.stats.hp.value <= 0){
    forceNewActive(target);
  }
}
const start = async () => {
  updateReference();
  if (left.numberOfPokemons === 0 || right.numberOfPokemons === 0) {
    return console.log("One of the teams doesn't have any Pokemon");
  } else if (left.active.pokemon === null || right.active.pokemon === null) {
    return console.log("The active pokemon can't be null");
  }

  // while (
  //   checkLive(left.roster).length > 0 ||
  //   checkLive(right.roster).length > 0 ||
  //   left.active.pokemon !== null ||
  //   right.active.pokemon !== null
  // )
  {
    let optionLeft = await getOption(left.active.pokemon, left.roster);
    let optionRight = await getOption(right.active.pokemon, right.roster);

    if (speedCheck(optionLeft, optionRight)) {
      actionMatcher(optionRight, right, left);
      actionMatcher(optionLeft, left, right);
    } else {
      actionMatcher(optionLeft, left, right);
      actionMatcher(optionRight, right, left);
    }
  }
};

module.exports = {
  start,
  inflictDamage
};
