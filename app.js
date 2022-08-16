const express = require("express");
const port = 3000;
const app = express();
const jsonDisney = require("./disney.json");
app.use(express.json()); //

//function pour choper les characters par name.
app.get("/characters", (req, res) => {
  //res.send(jsonDisney).
  const name = req.query.name;
  if (name) {
    const result = jsonDisney.filter((oneCharacter) => {
      return oneCharacter.name.includes(name);
    });
    return res.json({
      message: `Found ${result.length} characters(s)`,
      result,
    });
  }
  res.json(jsonDisney); // renvoie tout le fichier si pas de query.
});

app.get("/characters/:_id", (req, res) => {
  const { _id } = req.params; // params est comme query mais permet de recuperer les trucs dans l url precedes par ':' il renvoie en objet la clef _id et la valeur sera le numero dans l url.
  const uniqueCharacter = jsonDisney.find((character) => {
    return character._id === Number(_id); // attention a convertir la string en number.
  });
  return res.json({
    message: ` We found ${uniqueCharacter.name} !`,
    uniqueCharacter,
  });
});

app.post("/characters", (req, res) => {
  let { name, films } = req.body; // take what they give
  let _id = jsonDisney.at(-1)._id;
  _id++;
  const characterToCreate = { name, films, _id };
  jsonDisney.push(characterToCreate); // push in database
  return res.json({
    message: `new character added : `,
    characterToCreate,
  });
});

app.listen(port, () => {
  console.log("I am listening http://localhost:3000");
});
