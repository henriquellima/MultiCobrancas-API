const yup = require('./settings');


const schemaLogin = yup.object().shape({
    email: yup
        .string()
        .email('Informe um email válido')
        .required('O campo e-mail é obrigatório.'),

    password: yup
        .string()
        .required('O campo senha é obrigatório.'),
});

module.exports = schemaLogin;