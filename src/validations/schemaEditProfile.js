const yup = require('./settings');

const schemaEditProfile = yup.object().shape({

    name: yup
        .string()
        .required('O campo nome é obrigatório.'),

    email: yup
        .string()
        .email('Informe um email válido')
        .required('O campo e-mail é obrigatório.'),

    password: yup
        .string()
        .nullable(),

    cpf: yup
        .string()
        .nullable(),

    telephone: yup
        .string()
        .nullable(),
});

module.exports = schemaEditProfile;
