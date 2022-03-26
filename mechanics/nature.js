const natureList = require("../JSON/nature.json");
const getNature = (nature) => natureList.find((n) => n.name === nature);

module.exports = {
  getNature,
};
