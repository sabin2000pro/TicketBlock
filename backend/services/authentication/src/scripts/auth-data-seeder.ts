import { User } from '../models/user-model';
import dotenv from 'dotenv';
dotenv.config({path: '/Users/sabin2000/Documents/ticketblock/backend/services/nfts/.env'})
import connectAuthSchema from '../database/auth-schema';
import fs from 'fs'
import path from 'path';

connectAuthSchema();

const users =  JSON.parse(fs.readFileSync(path.join(__dirname, '../data/users.json')).toString()) as unknown as string;
