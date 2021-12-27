const yup = require('./settings');


const schemaRegister = yup.object().shape({
    password: yup
        .string()
        .min(6)
        .required('O campo senha é obrigatório.')
});

module.exports = schemaRegister