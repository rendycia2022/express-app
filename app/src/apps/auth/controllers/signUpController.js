const service = require('../services/signUpService');
const { v4: uuidv4 } = require('uuid');
const {timestamp} = require('../../../middlewares/date');

exports.get = (req, res) => {
    const items = service.getAll();
    res.json(items);
};

exports.getById = (req, res) => {
    const item = service.getById(req.params.id);
    if (!item) return res.status(404).json({ message: 'item not found' });
    res.json(item);
};

exports.create = (req, res) => {
    const payload = req.body;
    // Entry ID to new data
    newItem = {
        id: uuidv4(),
        created_at: timestamp(), 
        updated_at: timestamp(), 
        ...payload
    }
    const item = service.create(newItem);
    res.status(201).json(item);
};

exports.update = (req, res) => {
    const item = service.update(req.params.id, req.body);
    if (!item) return res.status(404).json({ message: 'item not found' });
    res.json(item);
};

exports.delete = (req, res) => {
    const success = service.delete(req.params.id);
    if (!success) return res.status(404).json({ message: 'item not found' });
    res.status(204).send();
};
