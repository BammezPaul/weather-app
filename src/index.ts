import { Weather } from "./Weather";
import { Utilitaires } from "./Utilitaires";
import express from "express";

const PORT = 3500;
async function main() {
  const server = express();

  server.get("/", (_request, response) => {
    return response.json({ message: "Hello world!" });
  });

  server.get("/weather", async (_request, response) => {
    const weather = new Weather("Lille");
    await weather.setCurrent();
    return response.json(weather);
  });



  // same function but with city name as parameter
  server.get("/city/:name", async (request, response) => {
    const name = request.params.name as string;
    const resp = await Utilitaires.getListCity(name);
    return response.json(resp);
  });

  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
  });
}

main();
