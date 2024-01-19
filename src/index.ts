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

  server.get("/locations/:id/forecast", async (request, response) => {
    const id = request.params.id as string;
    const weather = new Weather(id);
    await weather.setCurrent();
    return response.json(weather);
  });
  server.get("/locations", async (request, response) => {
    console.log(request.query) 
    const query = request.query
    if (!query.name || Array.isArray(query.name)) {
      return response.status(400).json({ error: "Missing query parameter `name`." });
    }
    const resp = await Utilitaires.getListCity(query.name.toString());
    return response.json(resp);
  });

  server.get("/forecast", async (request, response) => {
    console.log(request.query) 
    const query = request.query
    if (!query.latitude || Array.isArray(query.latitude)) {
      return response.status(400).json({ error: "Missing query parameter `latitude`." });
    }
    if (!query.longitude || Array.isArray(query.longitude)) {
      return response.status(400).json({ error: "Missing query parameter `longitude`." });
    }
    Utilitaires.getWeather(Number(query.latitude), Number(query.longitude));
    
    return response.json();
  });



  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
  });
}

main();
