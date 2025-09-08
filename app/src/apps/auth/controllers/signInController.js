// models
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sessionsModel = join(__dirname, '../models/sessions.json');
const signsModel = join(__dirname, '../models/signs.json');
import modelService from '../services/modelsService.js';

// services
const sessionService = new modelService(sessionsModel);
const signService = new modelService(signsModel);

import { v4 as uuidv4 } from 'uuid';
import { timestamp } from '../../../middlewares/date.js';
import { checkPassword } from '../../../middlewares/password.js';


export function getBy(req, res) {
    const params = {
        token: req.params.token,
        active: 1
    }
    const item = sessionService.getBy(params);
    if (!item) return res.status(404).json({ message: 'item not found.' });
    res.json(item);
}

export async function create(req, res) {
    const payload = req.body;

    // cek apakah data ada?
    const getData = await signService.getBy({ email: payload.email});
    if (getData) {
        // jika data ada, maka proses

        // compare password
        const matchingPassword = await checkPassword(payload.password, getData.password);
        if(!matchingPassword){
            return res.status(200).json({message: "Incorrect password."});
        }

        // delete existing token.
        const paramsSession = {
            signId: getData.id
        }
        await deleteToken(paramsSession);
        
        newItem = {
            token: uuidv4(),
            signId: getData.id,
            created_at: timestamp(), 
            updated_at: timestamp(), 
            active: 1
        }
        const item = sessionService.create(newItem);

        return res.status(201).json(item);
    }

    res.status(500).json({message: "item not found."});
}

export async function remove(req, res) {
    
    const paramsSession = {
        token: req.params.token
    }
    await deleteToken(paramsSession);

    // Jika dilakukan hard delete
    // const success = signService.delete(params);
    // if (!success) return res.status(404).json({ message: 'item not found.' });
    
    res.status(204).send({ message: 'item deleted.' });
}

async function deleteToken(paramsSession){
    const existingToken = await sessionService.getBy(paramsSession);
    if(existingToken){
        const payloadSession = {
            active: 0,
            updated_at: timestamp(),
        };
        sessionService.update(paramsSession, payloadSession);
    }

    return existingToken;
}