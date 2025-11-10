import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';
import tags from '../constants/tags.js';

//Валідатор для ObjectId
const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

//GET /notes
export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    tag: Joi.string()
      .valid(...tags)
      .optional(),
    search: Joi.string().allow('').optional(),
  }),
};

//GET /notes/:noteId
export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),
};

//POST /notes
export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).required(),
    content: Joi.string().allow('').optional(),
    tag: Joi.string().valid('male', 'female', 'other').optional(),
  }),
};

//PATCH /notes/:noteId
export const updateNoteSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required,
  }),
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).optional(),
    content: Joi.string().allow('').optional(),
    tag: Joi.string()
      .valid(...tags)
      .optional(),
  }).min(1),
};

//Segments.BODY → тіло запиту (req.body);
// Segments.PARAMS → параметри маршруту (req.params);
// Segments.QUERY → рядок запиту (req.query);
// Segments.HEADERS → заголовки (req.headers);
// Segments.COOKIES → кукі (req.cookies).
