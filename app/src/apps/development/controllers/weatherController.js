// models
const path = require('path');
const devModel = path.join(__dirname, '../models/dev.json');
const modelService = require('../services/modelsService');

// services
const devService = new modelService(devModel);

exports.get = (req, res) => {
    const items = "hallo this is weather controller"
    res.json(items);
};

exports.getBy = (req, res) => {
    const params = {
        id: Number(req.params.id)
    }
    const item = devService.getBy(params);
    if (!item) return res.status(404).json({ message: 'item not found' });
    res.json(item);
};

exports.create = (req, res) => {
    const item = devService.create(req.body);
    res.status(201).json(item);
};

exports.update = (req, res) => {
    const params = {
        id: Number(req.params.id)
    }
    const payload = {
        ...req.body
    };

    const item = devService.update(params, payload);
    if (!item) return res.status(404).json({ message: 'item not found' });
    res.json(item);
};

exports.delete = (req, res) => {
    const params = {
        id: Number(req.params.id)
    }
    const success = devService.delete(params);
    if (!success) return res.status(404).json({ message: 'item not found' });
    res.status(204).send();
};
