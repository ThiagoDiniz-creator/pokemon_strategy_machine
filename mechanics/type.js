const typeData = require("../JSON/typeData.json");

const generateTypeRelation = (type1, type2) => {
  const { defenseAttack, attackDefense } = typeData;
  const defAtt1 = defenseAttack.find((d) => d.name === type1.name),
    defAtt2 = defenseAttack.find((d) => d.name === type2.name),
    attDef1 = attackDefense.find((d) => d.name === type1.name),
    attDef2 = attackDefense.find((d) => d.name === type2.name);

  const customAttackDefense = { name: `${type1}-${type2}`, relation: [] },
    customDefenseAttack = { name: `${type1}-${type2}`, relation: [] };
  for (let i = 0; i < 18; i++) {
    customDefenseAttack.relation.push(
      defAtt1.relation[i] * defAtt2.relation[i]
    );
    customAttackDefense.relation.push(
      attDef1.relation[i] * attDef2.relation[i]
    );
  }
  return {
    attackDefense: customAttackDefense,
    defenseAttack: customDefenseAttack,
  };
};

const getTypeMatrixId = (type = "normal") =>
  typeData.attackDefense.findIndex(({name}) => name === type);

const getTypeMatrix = (type = "normal") => typeData.defenseAttack.find(({name}) => name === type);


/*
const getOffensiveRating = (type1, type2 = undefined) => {
  if (type2 === undefined) {
    return {
      score: typeData.classification.find((c) => c.name === type1)
      .ofRating,
      matrix: (typeData.attackDefense.find((c) => c.name === type1)).relation
    };
  } else {
    const { typeDistribution } = typeData;
    const customRelation = generateTypeRelation(
      type1,
      type2
    ).attackDefenseMatrix;
    let score = 10;

    customRelation.relation.map((r, idx) => {
      if (r !== 1) {
        if (r > 1) {
          score += (typeDistribution[idx] / 1426) * 10;
        } else if (r > 0.5) {
          score -= (typeDistribution[idx] / 1426) * 10;
        } else {
          score -= (typeDistribution[idx] / 1426) * 15;
        }
      }
    });

    return {score: Math.round(score), matrix: customRelation.relation};
  }
};

const getDefensiveRating = (type1, type2 = undefined) => {
  if (type2 === undefined) {
    return {score: typeData.classification.find((c) => c.name === type1)
      .defRating,
    matrix: (typeData.defenseAttack.find((c) => c.name === type1)).relation
    }
  } else {
    const customRelation = generateTypeRelation(
      type1,
      type2
    ).defenseAttackMatrix;
    let score = 10;
    const { typeDistribution } = typeData;

    customRelation.relation.map((r, idx) => {
      if (r !== 1) {
        if (r > 1) {
          score -= (typeDistribution[idx] / 1426) * 10;
        } else if (r > 0.5) {
          score += (typeDistribution[idx] / 1426) * 10;
        } else {
          score += (typeDistribution[idx] / 1426) * 15;
        }
      }
    });

    return {score: Math.round(score), matrix: customRelation.relation};
  }
};

const getTypeRating = (typeObject) => {
  if (typeObject.quantity === 1) {
    return {
      type: typeObject.type1,
      offense: getOffensiveRating(typeObject.type1),
      defense: getDefensiveRating(typeObject.type1),
    };
  } else {
    return {
      type: typeObject.type1 + "-" + typeObject.type2,
      offense: getOffensiveRating(typeObject.type1, typeObject.type2),
      defense: getDefensiveRating(typeObject.type1, typeObject.type2),
    };
  }
};
*/
module.exports = {
  generateTypeRelation,
  getTypeMatrix,
  getTypeMatrixId,
};
