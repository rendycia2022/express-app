const service = require('../services/signUpService');

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
    const item = service.create(req.body);
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
