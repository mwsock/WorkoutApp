const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
    WrktNameId: {type:String},
    WrktDay: {type:Number}, 
    exerciseId: [{}],
    User :{type:String}
  });
module.exports = mongoose.model('template', templateSchema);