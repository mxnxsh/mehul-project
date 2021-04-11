import express from 'express';
import expressAsyncHandler from 'express-async-handler';

import Note from '../models/noteModel.js';
import { isAuth } from '../utils.js';

const noteRouter = express.Router();

noteRouter.post('/', isAuth, expressAsyncHandler(async (req, res) => {
  const { title, description, user } = req.body
  const newNote = new Note({ title, description, user });
  try {
    const note = await newNote.save();
    res.status(200).send(note);
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: 'Error in Creating New Note.' })
  }
}))
noteRouter.get('/', expressAsyncHandler(async (req, res) => {
  const notes = await Note.find().populate('user')
  res.status(200).send(notes);
}))

export default noteRouter
