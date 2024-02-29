import { Entity, PrimaryGeneratedColumn , Column } from 'typeorm';

@Entity() // This decorator marks the class as a TypeORM entity
export class LocationEntity{
    @PrimaryGeneratedColumn()// This decorator is used for the primary column (id) with MongoDB
    id!: number;

    @Column("text") // This decorator marks a property as a column in the database
    name: string;

    @Column('double') // Specifying the column type is optional, but recommended for clarity
    longitude: number;

    @Column('double')
    latitude: number;
     
    constructor(name: string, longitude: number, latitude: number) {
        this.name = name;
        this.longitude = longitude;
        this.latitude = latitude;
    }

   
}
