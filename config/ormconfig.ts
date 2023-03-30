import { DataSource } from "typeorm";

const connectionSource = new DataSource({
    migrationsTableName: 'migrations',
    type: 'postgres',
    host: 'database_postgres',
    port: 5432,
    username: 'admin_db',
    password: 'rentalcars',
    database: 'rentalCars_db',
});

connectionSource
    .initialize()
    .then(() => {
        console.log('Data Source has been inicialized');
    })
    .catch((err) => {
        console.error('Data Source initialization', err)
    });

export default connectionSource