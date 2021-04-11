import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import userRouter from './routes/userRouter.js';
import noteRouter from './routes/noteRouter.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/mehul-save-note', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then(() => console.log('MongoBD is connected sucessfully!'))
  .catch((error) => console.log(error.reason));;

app.use('/api/users', userRouter);
app.use('/api/notes', noteRouter);

app.get('/', (req, res) => {
  res.send('Hello word')
})
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is connected on http://localhost:${PORT}`);
});