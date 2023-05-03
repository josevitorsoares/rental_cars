import { DataSource } from "typeorm";
import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { User } from "@modules/accounts/infra/typeorm/entities/User";

const connectionSource = new DataSource({
    migrationsTableName: 'migrations',
    type: 'postgres',
    host: 'database_postgres',
    port: 5432,
    username: 'admin_db',
    password: 'rentalcars',
    database: 'rentalCars_db',
    entities: [Category, Specification, User],
    synchronize: false,
});

connectionSource
    .initialize()
    .then(() => {
        console.log('Data Source has been inicialized');
    })
    .catch((err) => {
        console.error('Data Source initialization', err);
    });

export default connectionSource