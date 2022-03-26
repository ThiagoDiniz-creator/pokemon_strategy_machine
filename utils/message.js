const prompts = require("prompts");

const getOption = async (pokemon, roster) => {
  console.log(pokemon);
    const { move1, move2, move3, move4 } = pokemon.movements;
    let option;
    console.clear();
    await prompts({
      type: "select",
      name: "choice",
      message: "What's your choice?: \n",
      choices: ["Attack!", "Items", "Change Pokemon", "Surrender"],
    }).then(async ({ choice }) => {
      console.clear();
      switch (choice) {
        case 0:
          await prompts({
            type: "select",
            name: "move",
            message: "What's your choice?: \n",
            choices: [move1.name, move2.name, move3.name, move4.name],
          }).then(({ move }) => {
            option = {
              type: "movement",
              data: {
                pokemon: pokemon,
                movement: pokemon.movements["move" + (move + 1)],
              },
            };
          });
          break;
        case 1:
          //Create items, and the functionalities.
          break;
        case 2:
          let position;
          const filteredArray = roster
            .filter((r, idx) => {
              if (r.key !== pokemon.key) {
                return true;
              } else {
                position = idx;
                return false;
              }
            })
            .map(({ name }) => name);
  
          if (filteredArray.length < 1) {
            console.log(
              "The selected option isn't valid, as the team doesn't have any other Pokemon"
            );
            option = await getOption(pokemon, roster);
          } else {
            await prompts({
              type: "select",
              name: "swap",
              message: "Select the desired Pokemon",
              choices: filteredArray,
            }).then(({ swap }) => {
              option = {
                type: "switching",
                data: { target: swap >= position ? swap + 1 : swap },
              };
            });
          }
  
          break;
        case 3:
          await prompts({
            type: "confirm",
            name: "surrender",
            message: "Are you sure?",
            initial: false,
          }).then(() => {
            option = { type: "surrender" };
          });
          break;
        default:
          break;
      }
    });
    return option;
  };


module.exports = {
    getOption,
}