const usersService = require('../services/usersService');
const sessionsService = require('../services/sessionsService');
const { v4: uuidv4 } = require('uuid');
const {timestamp} = require('../../../middlewares/date');
const bcrypt = require('bcryptjs');

exports.get = (req, res) => {
    const items = usersService.getAll();
    res.json(items);
};

exports.getById = (req, res) => {
    const item = usersService.getBy({ id: req.params.id});
    if (!item) return res.status(404).json({ message: 'item not found.' });
    res.json(item);
};

exports.create = async (req, res) => {
    const payload = req.body;

    // cek apakah data ada?
    const getData = usersService.getBy({ email: payload.email});
    if (getData) {
        // jika data ada, maka proses

        // compare password
        const matchingPassword = await checkPassword(payload.password, getData.password);
        if(!matchingPassword){
            return res.status(200).json({message: "Incorrect password."});
        }

        // delete existing token.

        newItem = {
            token: uuidv4(),
            created_at: timestamp(), 
            updated_at: timestamp(), 
            active: 1,
            ...payload
        }
        const item = sessionsService.create(newItem);
        return res.status(201).json(item);
    }

    res.status(500).json({message: "item not found."});
};

exports.update = async (req, res) => {
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

    const item = usersService.update(params, payload);
    if (!item) return res.status(404).json({ message: 'item not found.' });
    res.json(item);
};

exports.delete = (req, res) => {
    const params = {
        id: req.params.id
    }
    const payload = {
        active: 0,
        updated_at: timestamp(), 
        ...req.body
    };
    const item = usersService.update(params, payload);

    // Jika dilakukan hard delete
    // const success = usersService.delete(params);
    if (!success) return res.status(404).json({ message: 'item not found.' });
    res.status(204).send();
};

function getSession(userId){
    const session = usersService.getBy({ id: userId});
    return session;
}

async function hashPassword(plainPassword) {
    const saltRounds = 10; // Semakin besar, semakin aman, tapi lebih lambat
    const hashed = await bcrypt.hash(plainPassword, saltRounds);
    return hashed;
}

async function checkPassword(plainPassword, hashedPassword) {
  const match = await bcrypt.compare(plainPassword, hashedPassword);
  return match;
}