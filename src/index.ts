
import { Utilitaires } from "./Utilitaires";
import express from "express";
import "reflect-metadata";
import { MongoRepository, createConnection } from "typeorm";
import { LocationEntity } from "./entity/LocationEntity"; // Import your TypeORM entity
import { FavoriteEntity } from "./entity/FavoriteEntity";
let favoriteRepository: MongoRepository<FavoriteEntity>;
const PORT = 3500;
createConnection().then(async _connection => {
  const server = express();
  const locationRepository = _connection.getMongoRepository(LocationEntity);
  favoriteRepository = _connection.getMongoRepository(FavoriteEntity);
  server.get("/", (_request, response) => {
    return response.json({ message: "Hello world!" });
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

  server.post("/places", async (req, res) => {
    const { name, longitude, latitude } = req.body;
    if (!name || longitude === undefined || latitude === undefined) {
      return res.status(400).json({ message: "Missing parameters" });
    }

    try {
      // Vérifier si l'emplacement existe déjà
      const existingFavorite = await favoriteRepository.findOne({
        where: {
            name: name,
            longitude: longitude,
            latitude: latitude
        }
    });
    
      if (existingFavorite) {
        return res.status(409).json({ message: "This location is already saved" });
      }

      const favorite = favoriteRepository.create({ name, longitude, latitude });
      await favoriteRepository.save(favorite);

      return res.status(201).json(favorite);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "An error occured" });
    }
  });
  server.delete("/places/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deleteResult = await favoriteRepository.delete(id);
        // Utiliser `affected` pour les bases de données SQL
        if (deleteResult.affected === 0) {
            return res.status(404).json({ message: "Favourite not found" });
        }
        return res.status(200).json({ message: "Favourite deleted." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occured" });
    }
});
server.get("/places/:id/forecast", async (req, res) => {
  const { id } = req.params;

  try {
    const location = await locationRepository.findOne({ where: { _id: id } });
    if (!location) {
          return res.status(404).json({ message: "Emplacement non trouvé." });
      }

      Utilitaires.getWeather(Number(location.latitude), Number(location.longitude));


  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erreur lors de la récupération des prévisions météorologiques." });
  }
});

  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
  });
}).catch(error => console.log("TypeORM connection error: ", error));



