const service = require('../services/signUpService');
const { v4: uuidv4 } = require('uuid');
const {timestamp} = require('../../../middlewares/date');

exports.get = (req, res) => {
    const items = service.getAll();
    res.json(items);
};

exports.getById = (req, res) => {
    const item = service.getBy({ id: req.params.id});
    if (!item) return res.status(404).json({ message: 'item not found' });
    res.json(item);
};

exports.create = (req, res) => {
    const payload = req.body;

    // cek apakah data sudah pernah ada?
    const getData = service.getBy({ email: payload.email});
    if (!getData) {
        // jika data kosong maka buat data baru
        newItem = {
            id: uuidv4(),
            created_at: timestamp(), 
            updated_at: timestamp(), 
            ...payload
        }
        const item = service.create(newItem);
        return res.status(201).json(item);
    }

    res.status(500).json({message: "item exist"});
};

exports.update = (req, res) => {
    // data dari url
    const params = {
        id: req.params.id
    }

    // data dari body
    const payload = {
        updated_at: timestamp(), 
        ...req.body
    };
    const item = service.update(params, payload);
    if (!item) return res.status(404).json({ message: 'item not found' });
    res.json(item);
};

exports.delete = (req, res) => {
    const params = {
        id: req.params.id
    }
    const success = service.delete(params);
    if (!success) return res.status(404).json({ message: 'item not found' });
    res.status(204).send();
};
