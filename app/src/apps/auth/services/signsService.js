const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../models/signs.json');

function readData() {
  const data = fs.readFileSync(dataPath);
  return JSON.parse(data);
}

function writeData(newItem) {
    fs.writeFileSync(dataPath, JSON.stringify(newItem, null, 2));
}

exports.getAll = () => {
    return readData(); // baca file json
};

exports.getBy = (params) => {
    const items = readData();

    // cari data pada json parameter
    return items.find(item =>
        Object.entries(params).every(([key, val]) => item[key] === val)
    );
};

exports.create = (data) => {
    const items = readData();
    items.push(data); // push data baru ke data json
    writeData(items); // tulis ulang file json dengan data baru
    return data;
};

exports.update = (params, data) => {
    const items = readData();
    const index = items.findIndex(item =>
        Object.entries(params).every(([key, val]) => item[key] === val)
    );
    if (index === -1) return null;
    items[index] = { ...items[index], ...data }; // update data baru pada index yang ditemukan
    writeData(items);
    return items[index];
};

exports.delete = (params) => {
    let items = readData();
    const index = items.findIndex(item =>
        Object.entries(params).every(([key, val]) => item[key] === val)
    );
    if (index === -1) return false;
    items.splice(index, 1); // delete data pada index yang ditemukan
    writeData(items);
    return true;
};
