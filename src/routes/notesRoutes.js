import { Router } from 'express';
import {
  getAllNotes,
  getNoteById,
  createNote,
  deleteNote,
  updateNote,
} from '../controllers/notesController.js';

const router = Router();

// GET /notes
router.get('/notes', getAllNotes);

//GET /notes/:noteId
router.get('/notes/:noteId', getNoteById);

//POST /notes
router.post('/notes', createNote);

//DELETE /notes/:noteId
router.delete('/notes/:noteId', deleteNote);
export default router;

//PATCH /notes/:noteId
router.patch('/notes/:noteId', updateNote);
