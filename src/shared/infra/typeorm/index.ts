import { DataSource } from "typeorm";

const connectionLocalSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'admin_db',
    password: 'rentalcars',
    database: 'rentalCars_db',
    name: 'default',
    migrations: ['./src/shared/infra/typeorm/migrations/**/*.ts']
});

connectionLocalSource
    .initialize()
    .then(() => {
        console.log('Data Source has been inicialized');
    })
    .catch((err) => {
        console.error('Data Source initialization', err)
    });

export default connectionLocalSource;