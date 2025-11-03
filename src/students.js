import express from 'express';

const app = express();
const PORT = 3000;

//Get students

app.get('/students', (req, res) => {
  res.status(200).json({ message: 'Here all students' });
});

//GET students/:studentId

app.get('/student/:studentId', (req, res) => {
  const studentId = req.params.studentId;
  res.status(200).json({ message: `Student id: ${studentId}` });
});

//startet den Server
app.listen(PORT, () => {
  console.log(`Server Starting: ${PORT}`);
});

//TEST ERROR

app.get('/test-error', (req, res) => {
  throw new Error('Something went wrong!');
});

//catch errors with middleware
app.use((err, res, req, next) => {
  console.log(err.message);
  res.status(500).json({ message: err.message });
});
