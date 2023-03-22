import express from 'express';
import { router } from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../src/swagger.json';

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve ,swaggerUi.setup(swaggerFile));

app.use(router);

app.listen(3333, () => {
    console.log('🚀 Server Runing!');
});