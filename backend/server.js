import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import socketIO from 'socket.io';
import mongoose from 'mongoose';
import { DATABASE_CONNECTION } from './db/config/config';
import AuthController from './controllers/AuthController';
import UserController from './controllers/UserController';

const app = express();
const server = http.Server(app);
const io = socketIO(server);

/* Middleware */
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* DB */
mongoose.Promise = global.Promise;
mongoose.connect(
  DATABASE_CONNECTION,
  { useNewUrlParser: true },
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log(':::Connected to DB:::'));

/* Endpoints */
app.get('/', (req, res) => {
  res.status(200).send(JSON.stringify({ res: 'Nodebot Backend says hello!' }));
});

app.use('/auth', AuthController);
app.use('/users', UserController);

/* Socket */
io.on('connection', (socket) => {
  console.log('User connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('command', (cmd) => {
    console.log(`command: ${cmd}`);
  });
});

/* Init */
const port = process.env.PORT || 8000;
server.listen(port, () => console.log(`App listening on port ${port}`));

module.exports = server;
