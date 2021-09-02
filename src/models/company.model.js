const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    company_cnpj: { type: String, unique: true },
    company_name: String,
    company_corporateName: String,
    company_mainActivity: String
},
    {
        timestamps: true
    });


const companies = mongoose.model('Companies', DataSchema);
module.exports = companies;