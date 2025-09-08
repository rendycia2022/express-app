// models
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const signsModel = join(__dirname, '../models/signs.json');
import modelService from '../services/modelsService.js';

// services
const signService = new modelService(signsModel);

import { v4 as uuidv4 } from 'uuid';
import { timestamp } from '../../../middlewares/date.js';
import { hashPassword } from '../../../middlewares/password.js';

export function get(req, res) {
    const items = signService.getAll();
    res.json(items);
}

export function getById(req, res) {
    const item = signService.getBy({ id: req.params.id});
    if (!item) return res.status(404).json({ message: 'item not found.' });
    res.json(item);
}

export async function create(req, res) {
    const payload = req.body;

    // cek apakah data sudah pernah ada?
    const getData = signService.getBy({ email: payload.email});
    if (!getData) {
        // jika data kosong maka buat data baru

        // hashing password
        if(payload.password){
            payload.password = await hashPassword(payload.password);
        }

        newItem = {
            id: uuidv4(),
            created_at: timestamp(), 
            updated_at: timestamp(), 
            active: 1,
            ...payload
        }
        const item = signService.create(newItem);
        return res.status(201).json(item);
    }

    res.status(500).json({message: "item exist."});
}

export async function update(req, res) {
    // data dari url
    const params = {
        id: req.params.id
    }

    // data dari body
    const payload = {
        updated_at: timestamp(), 
        active: 1,
        ...req.body
    };

    // hashing password
    if(payload.password){
        payload.password = await hashPassword(payload.password);
    }

    const item = signService.update(params, payload);
    if (!item) return res.status(404).json({ message: 'item not found.' });
    res.json(item);
}

export async function remove(req, res) {
    
    const params = {
        id: req.params.id
    };
    const payload = {
        active: 0,
        updated_at: timestamp(),
        ...req.body
    };
    const item = signService.update(params, payload);

    // Jika dilakukan hard delete
    // const success = signService.delete(params);
    // if (!success) return res.status(404).json({ message: 'item not found.' });
    res.status(204).send({ message: 'item deleted.' });
}