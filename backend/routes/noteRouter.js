import express from 'express';
import expressAsyncHandler from 'express-async-handler';

import Note from '../models/noteModel.js';
import { isAuth } from '../utils.js';

const noteRouter = express.Router();

noteRouter.post('/', isAuth, expressAsyncHandler(async (req, res) => {
  const { title, description } = req.body
  const newNote = new Note({ title, description, user: req.user._id });
  try {
    const note = await newNote.save();
    res.status(200).send(note);
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: 'Error in Creating New Note.' })
  }
}))

noteRouter.get('/', isAuth, expressAsyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user._id }).populate('user').sort({ createdAt: 'desc' }).exec()
  res.status(200).send(notes);
}));

noteRouter.get('/:id', isAuth, expressAsyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id)
  res.status(200).send(note);
}));

noteRouter.delete("/:_id", isAuth, async (req, res) => {
  try {
    const deleteNote = await Note.findById(req.params._id);
    await deleteNote.remove();
    res.send({ message: 'Delete successfully' })
  } catch (error) {
    res.status(404).send('Note not found')
  }
});

export default noteRouter
