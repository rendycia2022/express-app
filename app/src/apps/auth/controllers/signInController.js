const signsService = require('../services/signsService');
const sessionsService = require('../services/sessionsService');
const { v4: uuidv4 } = require('uuid');
const {timestamp} = require('../../../middlewares/date');
const {checkPassword} = require('../../../middlewares/authentication');
const bcrypt = require('bcryptjs');

exports.getBy = (req, res) => {
    const params = {
        token: req.params.token,
        active: 1
    }
    const item = sessionsService.getBy(params);
    if (!item) return res.status(404).json({ message: 'item not found.' });
    res.json(item);
};

exports.create = async (req, res) => {
    const payload = req.body;

    // cek apakah data ada?
    const getData = await signsService.getBy({ email: payload.email});
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
        const item = sessionsService.create(newItem);

        return res.status(201).json(item);
    }

    res.status(500).json({message: "item not found."});
};

exports.delete = async (req, res) => {
    
    const paramsSession = {
        token: req.params.token
    }
    await deleteToken(paramsSession);

    // Jika dilakukan hard delete
    // const success = signsService.delete(params);
    // if (!success) return res.status(404).json({ message: 'item not found.' });
    
    res.status(204).send({ message: 'item deleted.' });
};

async function deleteToken(paramsSession){
    const existingToken = await sessionsService.getBy(paramsSession);
    if(existingToken){
        const payloadSession = {
            active: 0,
            updated_at: timestamp(),
        };
        sessionsService.update(paramsSession, payloadSession);
    }

    return existingToken;
}