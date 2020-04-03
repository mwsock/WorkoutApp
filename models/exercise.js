const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    dtype: {type:String},
    User :{type:String}
});


module.exports = mongoose.model('exercice', exerciseSchema);

  