import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  getAllNotes,
  getNoteById,
  createNote,
  deleteNote,
  updateNote,
} from '../controllers/notesController.js';
import {
  getAllNotesSchema,
  createNoteSchema,
  updateNoteSchema,
  noteIdSchema,
} from '../validations/notesValidation.js';

const router = Router();

// GET /notes + validation(getAllNotesSchema)
router.get('/notes', celebrate(getAllNotesSchema), getAllNotes);

//GET /notes/:noteId + validation(noteIdSchema)
router.get('/notes/:noteId', celebrate(noteIdSchema), getNoteById);

//POST /notes + validation(createNoteSchema)
router.post('/notes', celebrate(createNoteSchema), createNote);

//DELETE /notes/:noteId + validation(noteIdSchema)
router.delete('/notes/:noteId', celebrate(noteIdSchema), deleteNote);

//PATCH /notes/:noteId + validation(updateNoteSchema)
router.patch('/notes/:noteId', celebrate(updateNoteSchema), updateNote);

export default router;
