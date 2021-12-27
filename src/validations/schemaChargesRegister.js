const yup = require('./settings');


const schemaChargeRegister = yup.object().shape({

    description: yup
        .string()
        .required('O campo descrição é obrigatório.'),

    maturity_date: yup
        .date()
        .required('O campo vencimento é obrigatório.'),

    amount: yup
        .string()
        .required('O campo valor é obrigatório.'),

    status: yup
        .boolean()
});

module.exports = schemaChargeRegister;