import { DataSource } from "typeorm";

const MigrationsSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'admin_db',
    password: 'rentalcars',
    database: 'rentalCars_db',
    name: 'default',
    migrations: ['./src/database/migrations/**/*.ts']
});

MigrationsSource
    .initialize()
    .then(() => {
        console.log('Data Source has been inicialized');
    })
    .catch((err) => {
        console.error('Data Source initialization', err)
    });

export default MigrationsSource;