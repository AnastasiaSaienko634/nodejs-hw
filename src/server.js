import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import pino from 'pino-http';

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

// GET /notes
app.get('/notes', (req, res) => {
  res.status(200).json({
    message: 'Retrieved all notes',
  });
});

//GET /notes/:noteId

app.get('/notes/:noteId', (req, res) => {
  const noteId = req.params;
  res.status(200).json({
    message: `Retrieved note with ID: ${noteId}`,
  });
});

//GET /test-error
app.get('/test-error', () => {
  throw new Error('Simulated server error');
});

// не існуючі маршрути
app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
  });
});

//обробка помлок
app.use((err, req, res, next) => {
  const isProd = process.env.NODE_ENV === 'production';
  res.status(500).json({
    message: isProd
      ? 'Something went wrong. Please try again later.'
      : err.message,
  });
});

//запуск серв
app.listen(PORT, () => {
  console.log(`Server runnig ${PORT}`);
});
