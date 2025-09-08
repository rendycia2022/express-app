import { readFileSync, writeFileSync } from 'fs';

function readData(model) {
  const data = readFileSync(model);
  return JSON.parse(data);
}

function writeData(newItem, model) {
    writeFileSync(model, JSON.stringify(newItem, null, 2));
}

class modelServices{
    constructor(models) {
        this.model = models;
    }

    getAll = () => {
        return readData(this.model); // baca file json
    };

    getBy = (params) => {
        const items = readData(this.model);

        // cari data pada json parameter
        return items.find(item =>
            Object.entries(params).every(([key, val]) => item[key] === val)
        );
    };

    create = (data) => {
        const items = readData(this.model);
        items.push(data); // push data baru ke data json
        writeData(items, this.model); // tulis ulang file json dengan data baru
        return data;
    };

    update = (params, data) => {
        const items = readData(this.model);
        const index = items.findIndex(item =>
            Object.entries(params).every(([key, val]) => item[key] === val)
        );
        if (index === -1) return null;
        items[index] = { ...items[index], ...data }; // update data baru pada index yang ditemukan
        writeData(items, this.model);
        return items[index];
    };

    delete = (params) => {
        let items = readData(this.model);
        const index = items.findIndex(item =>
            Object.entries(params).every(([key, val]) => item[key] === val)
        );
        if (index === -1) return false;
        items.splice(index, 1); // delete data pada index yang ditemukan
        writeData(items, this.model);
        return true;
    };
}

export default modelServices;