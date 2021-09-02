const Company = require('../models/company.model');


module.exports = {
    async index(req, res) {
        const company = await Company.find();
        res.json(company);
    },
    async create(req, res) {
        const {
            company_cnpj,
            company_name,
            company_corporateName,
            company_mainActivity,
        } = req.body;

        let data = {};
        let company = await Company.findOne({ company_cnpj });

        if (!company) {
            data = {
                company_cnpj,
                company_name,
                company_corporateName,
                company_mainActivity,
            };

            company = await Company.create(data);
            return res.status(200).json(company);
        } else {
            return res.status(500).json(company);
        }
    },
    async details(req, res) {
        const { _id } = req.params;
        const company = await Company.findOne({ _id });
        res.json(company);
    }

}