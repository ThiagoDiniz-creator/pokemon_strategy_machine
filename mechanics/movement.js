const moveList = require("../JSON/movementList.json");
const { randomCheck } = require("../utils/random");
const { inflictDamage } = require("./engine");
const {
  checkConsumedItem,
  countConsumedItem,
  checkAbility,
  checkSTAB,
} = require("../utils/validation");
const {
  getTypeMatrixId,
  generateTypeRelation,
  getTypeMatrix,
} = require("./type.js");

const getMove = (name) => moveList.find((m) => m.name === name);

const calcMoveDamage = (
  { damageClass, type, baseDamage, critRate },
  attacker,
  defender
) => {
  let attackerTypeIdx, defenderTypeMatrix;
  let typeOfMove = damageClass === "attack" ? 1 : 3;
  attackerTypeIdx = getTypeMatrixId(type);
  if (defender.types[1] !== null) {
    defenderTypeMatrix = generateTypeRelation(
      defender.types[0].type,
      defender.types[1].type
    );
  } else {
    defenderTypeMatrix = getTypeMatrix(defender.types[0].type);
  }
  const typeModifier = defenderTypeMatrix.relation[attackerTypeIdx];
  const isCrit = critCalc(pokemon, { critRate });
  const STAB = checkSTAB([...pokemon.types], type);
  const burn =
    attacker.ailment.name === "burning" && damageClass === "normal" ? 0.5 : 1;

  //Implementação do dano foi simplificado, alguns dos elementos que estão fora do cálculo e que poderiam o tornar mais fidedigno com os jogos são
  // Weather, badges, random, other
  const part1 = (2 * attacker.level) / 5 + 2;
  const part2 =
    part1 *
    baseDamage *
    (attacker.stats[typeOfMove].value / defender.stats[typeOfMove].value);
  const part3 = part2 / 50 + 2;
  const finalDamage = part3 * isCrit * typeModifier * STAB * burn;
  return finalDamage;
};

const generateMovement = (movement, attacker, defender) => {
  const {
    accuracy,
    pp,
    power,
    priority,
    statChanges,
    meta: {
      ailment,
      category: { name: categoryName },
      crit_rate: critRate,
      drain,
      flich_chance: flinchChance,
      healing,
      max_hits: maxHits,
      max_turns: maxTurns,
      min_hits: minHits,
      min_turns: minTurns,
    },
    target: { name: targetName },
    type: { name: typeName },
    damageClass: { name: damageClass },
  } = movement;
  const target = targetSelector(targetName);
  switch (damageClass) {
    case "damage":
      if (target === "opponent") {
        const damage = calcMoveDamage(
          { damageClass, type: typeName, baseDamage: power, critRate },
          attacker,
          defender
        );
        inflictDamage(damage, defender);
      }
      break;
    case "ailment":
      break;
    case "net-good-stats":
      break;
    case "heal":
      break;
    case "damage+ailment":
      break;
    case "swagger":
      break;
    case "damager+lower":
      break;
    case "damage+raise":
      break;
    case "damage+heal":
      break;
    case "ohko":
      break;
    case "whole-field-effect":
      break;
    case "field-effect":
      break;
    case "force-switch":
      break;
    case "unique":
      break;
  }
};

const setMoveSet = (
  movements = undefined,
  { move1 = undefined, move2 = undefined, move3 = undefined, move4 = undefined }
) => {
  if (movements === undefined) {
    return console.log(
      "The movements of the Pokemon should be different not be Undefined"
    );
  }

  return {
    move1:
      move1 === undefined
        ? getMove(movements[movements.length - 11].move.name)
        : getMove(move1),
    move2:
      move2 === undefined
        ? getMove(movements[movements.length - 12].move.name)
        : getMove(move2),
    move3:
      move3 === undefined
        ? getMove(movements[movements.length - 13].move.name)
        : getMove(move3),
    move4:
      move4 === undefined
        ? getMove(movements[movements.length - 14].move.name)
        : getMove(move4),
  };
};

const targetSelector = (t) => {
  if (
    t === "specific-move" ||
    t === "select-pokemon-me-first" ||
    t === "random-opponent" ||
    t === "opponent" ||
    t === "all-opopnents" ||
    t === "selected-pokemon"
  ) {
    return "opponent";
  } else if (
    t === "ally" ||
    t === "all-allies" ||
    t === "user-and-allies" ||
    t === "user" ||
    t === "user-or-ally"
  ) {
    return "attacker";
  } else {
    return t;
  }
  //"users-field"
  //"opponents-field"
  //"entire-field"
  //"all-pokemon"
};

module.exports = {
  getMove,
  setMoveSet,
  generateMovement,
};
