import { Note } from '../models/note.js';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';

//GET All notes
export const getAllNotes = async (req, res) => {
  const notes = await Note.find();
  res.status(200).json(notes);
};

//GET note by Id

export const getNoteById = async (req, res, next) => {
  const noteId = req.params.noteId;

  if (!mongoose.isValidObjectId(noteId)) {
    return next(createHttpError(404, 'Note is not found!'));
  }

  const note = await Note.findById(noteId);

  if (!note) {
    next(createHttpError(404, 'Note is not found!'));
    return;
  }
  res.status(200).json(note);
};

//POST /notes/:noteId
export const createNote = async (req, res) => {
  const note = await Note.create(req.body);
  res.status(201).json(note);
};

//DELETE /notes/:noteId
export const deleteNote = async (req, res, next) => {
  const noteId = req.params.noteId;
  const note = await Note.findOneAndDelete({ _id: noteId });

  if (!note) {
    next(createHttpError(404, 'Note is not found!'));
    return;
  }
  res.status(200).json(note);
};

//PATCH /notes/:noteId
export const updateNote = async (req, res, next) => {
  const noteId = req.params.noteId;
  const note = await Note.findOneAndUpdate({ _id: noteId }, req.body, {
    new: true,
  });

  if (!note) {
    next(createHttpError(404, 'Note is not found!'));
    return;
  }
  res.status(200).json(note);
};
