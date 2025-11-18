import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { User } from '../models/user.js';
import { createSession } from '../services/auth.js';
import { Session } from '../models/session.js';
import { setSessionCookies } from '../services/auth.js';

//POST /auth/register
export const registerUser = async (req, res, next) => {
  //we take email and password from request bd.
  const { email, password } = req.body;

  //we check email, have we or no alredy this email in base.
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(createHttpError(400, 'Email in use'));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    email,
    password: hashedPassword,
  });

  //we create newSession
  const newSesssion = await createSession(newUser._id);

  //Викликаємо та передаємо обєкт відповіді та сесію
  setSessionCookies(res, newSesssion);

  res.status(201).json(newUser);
};

//POST auth/login

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return next(createHttpError(401, 'Invaild credentials'));
  }

  const isVaildPassword = await bcrypt.compare(password, user.password);
  if (!isVaildPassword) {
    return next(createHttpError(401, 'Invaild credentials'));
  }

  //delete older Session
  await Session.deleteOne({ userId: user._id });

  //create a new one Session
  const newSession = await createSession(user._id);

  //Викликаємо та передаємо обєкт відповіді та сесію
  setSessionCookies(res, newSession);

  res.status(200).json(user);
};

//POST auth/logout
export const logOutUser = async (req, res) => {
  const { sessionId } = req.cookies;

  if (sessionId) {
    await Session.deleteOne({ id: sessionId });
  }

  res.clearCookie('sessionId');
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');

  res.status(204).send();
};
