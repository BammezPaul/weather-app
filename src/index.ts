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

  server.get("/weather/:city", async (request, response) => {
    const city = request.params.city as string;
    const weather = new Weather(city);
    await weather.setCurrent();
    return response.json(weather);
  });
  server.get("/locations", async (request, response) => {
    console.log(request.query) 
    const query = request.query
    if (!query.name || Array.isArray(query.name)) {
      return response.status(400).json({ error: "Missing query parameter `name`." });
    }
    //const name = request as string;
    const resp = await Utilitaires.getListCity(query.name.toString());
    
    return response.json(resp);
  });

  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
  });
}

main();
