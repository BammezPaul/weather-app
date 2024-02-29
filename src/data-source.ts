import "reflect-metadata"
import { DataSource } from "typeorm"
import { LocationEntity } from "./entity/LocationEntity"
import { FavoriteEntity } from "./entity/FavoriteEntity"


export const AppDataSource = new DataSource({
    type: "mongodb",
    host: "localhost",
    port: 27017,
    database: "test",
    synchronize: true,
    logging: false,
    entities: [LocationEntity, FavoriteEntity],
    migrations: [],
    subscribers: [],
})
