const yup = require('./settings');


const schemaRegister = yup.object().shape({

    name: yup
        .string()
        .required('O campo nome é obrigatório.'),

    email: yup
        .string()
        .email('Informe um email válido')
        .required('O campo e-mail é obrigatório.')   
});

module.exports = schemaRegister;