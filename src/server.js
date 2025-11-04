import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import pino from 'pino-http';
import { connectMongoDB } from './db/connectMongoDB.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import studentsRoutes from './routes/notesRoutes.js';
const app = express();
const PORT = process.env.PORT ?? 3000;

//щоб парсити данні
app.use(express.json());

//дозволяє обмін данними з різних джерел
app.use(cors());

//логування запитів
app.use(
  pino({
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname',
        messageFormat:
          '{req.method} {req.url} {res.statusCode} - {responseTime}ms',
        hideObject: true,
      },
    },
  }),
);

app.use(studentsRoutes);

//GET /test-error
app.get('/test-error', () => {
  throw new Error('Simulated server error');
});

// не існуючі маршрути
app.use(notFoundHandler);

//обробка помлок
app.use(errorHandler);

await connectMongoDB();

//запуск серв
app.listen(PORT, () => {
  console.log(`Server runnig ${PORT}`);
});
