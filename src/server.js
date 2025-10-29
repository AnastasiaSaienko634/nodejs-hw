import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// GET /notes

app.get('/notes', (req, res) => {
  res.status(200).json({
    message: 'Retrieved all notes',
  });
});

app.listen(PORT, () => {
  console.log(`Server runnig ${PORT}`);
});

//GET /notes/:noteId

app.get('/notes/:noteId', (req, res) => {
  const noteId = req.params;
  res.status(200).json({
    message: `Retrieved note with ID: ${noteId}`,
  });
});

// не існуючі маршрути
app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
  });
});

//GET /test-error
app.get('/test-error', () => {
  throw new Error('Simulated server error');
});
