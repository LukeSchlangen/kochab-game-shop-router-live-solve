const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    name: { type: String, required: true }
});

module.exports = mongoose.model('employee', EmployeeSchema);