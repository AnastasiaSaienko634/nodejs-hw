import { Note } from '../models/note.js';

export const getAllNotes = async (req, res) => {
  const notes = await Note.find();
  res.status(200).json({
    notes: notes,
    message: 'Retrieved all notes',
  });
};

export const getNote = async (req, res) => {
  const noteId = req.params.noteId;
  const note = await Note.findById(noteId);

  if (!note) {
    return res.status(404).json({ message: 'Student not found' });
  }
  res.status(200).json({
    note: note,
    message: `Retrieved note with ID: ${noteId}`,
  });
};
