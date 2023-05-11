import connectionLocalSource from "../index"
import { hash } from "bcrypt";
import { DataSource } from "typeorm";
import { v4 as uuidV4 } from "uuid";

async function create(connection: DataSource) {

    const id = uuidV4();
    const password = await hash("admin", 8);

    await connection.query(
        `INSERT INTO USERS("id", "name", "username", "password", "email", "driver_license", "admin", "created_at") 
        values('${id}', 'admin', 'admin_api', '${password}', 'admin@rentalcars.com', '123ABC', 'true', 'now()')`
    )

    console.log("User admin created!");

    connection.destroy();
}

connectionLocalSource.initialize().then(() => create(connectionLocalSource));
