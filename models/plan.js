const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
    _id: {type:String},
    wrktPlan: {type:String},
    cDATE: {type: Date},
    User :{type:String}
  });
  
module.exports = mongoose.model('plan', planSchema);