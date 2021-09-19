import path from 'path';
import { nanoid } from 'nanoid';
import { Router } from 'express';
import multer from 'multer';
import fs from 'fs-extra';
import Agent, { AgentType } from '../models/agent';
import { uploadFileToS3 } from '../utils/s3';
import { verifyAgent } from '../utils/auth';
import fs from 'fs'
fs.
const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.resolve('uploads')),
  filename: (req, file, cb) =>
    cb(null, `${nanoid()}${file.mimetype.replace('/', '.')}`),
});

const upload = multer({ storage });

router.post('/login/:pass', async (req, res) => {
  try {
    const { phone, password } = req.body;
    req.params.pass

    const agent = await Agent.findOne({ phone }).populate('trips');

    res.json(agent);
  } catch (err) {
    console.error(err);
  }
});

router.post('/register', upload.single('avatar'), async (req, res) => {
  try {
    const { phone, name } = req.body;
    const avatar = req.file;

    const agent = await Agent.findOne({ phone });

    if (agent) {
      res.status(409).json('Agent already exists');
      fs.emptyDir(path.resolve('uploads'));
      return;
    }

    const newAgent = new Agent({
      phone,
      name,
    });
    res.sendStatus()

    if (avatar) {
      const result = await uploadFileToS3(avatar, 'agent');
      newAgent.avatar = result.Key;
      fs.emptyDir(path.resolve('uploads'));
    }
    const doc = await newAgent.save();

    res.json(doc);
  } catch (err) {
    console.error(err);
  }
});

router.patch('/editDetails', verifyAgent, async (req, res) => {
  try {
    const user = res.locals.user;

    const agent = await Agent.findById(user._id);

    res.json(agent);
  } catch (err) {
    console.error(err);
  }
});

export default router;
