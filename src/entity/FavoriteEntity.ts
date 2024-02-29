import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class FavoriteEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name: string;

    @Column()
    longitude: number;

    @Column()
    latitude: number;
    constructor(name: string, longitude: number, latitude: number) {
        this.name = name;
        this.longitude = longitude;
        this.latitude = latitude;
    }
}
