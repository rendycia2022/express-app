const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../models/users.json');

function readData() {
  const data = fs.readFileSync(dataPath);
  return JSON.parse(data);
}

function writeData(newItem) {
    fs.writeFileSync(dataPath, JSON.stringify(newItem, null, 2));
}

exports.getAll = () => {
    return readData();
};

exports.getById = (id) => {
    const items = readData();
    return items.find(u => u.id === parseInt(id));
};

exports.create = (data) => {
    const items = readData(); // baca file json yang sudah ada
    items.push(data); // push data baru ke data json
    writeData(items); // tulis ulang file json dengan data baru
    return data;
};

exports.update = (id, data) => {
    const items = readData();
    const index = items.findIndex(u => u.id === parseInt(id));
    if (index === -1) return null;
    if(data.voucher){
        let credit = 0;
        if(items[index].credit){
            credit = items[index].credit;
        }
        data.credit = credit + data.voucher;
        delete data['voucher'];
    }
    items[index] = { ...items[index], ...data };
    writeData(items);
    return items[index];
};

exports.delete = (id) => {
    let items = readData();
    const index = items.findIndex(u => u.id === parseInt(id));
    if (index === -1) return false;
    items.splice(index, 1);
    writeData(items);
    return true;
};
