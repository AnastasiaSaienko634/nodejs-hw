import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: false },
    tag: { type: String, required: false },
  },
  { timestamps: true },
);

//щоб спілкуватися з базою данних
export const Note = mongoose.model('Note', noteSchema, 'notes');
