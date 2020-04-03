const mongoose = require('mongoose');

const WRKTschema = new mongoose.Schema({},{strict:false });

module.exports = mongoose.model('wrkt', WRKTschema);
