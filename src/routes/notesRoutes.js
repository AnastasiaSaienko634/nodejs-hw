import { Router } from 'express';
import { getAllNotes, getNote } from '../controllers/notesController.js';

const router = Router();

// GET /notes
router.get('/notes', getAllNotes);

//GET /notes/:noteId
router.get('/notes/:noteId', getNote);

export default router;
