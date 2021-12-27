const yup = require("./settings");

const schemaClientRegister = yup.object().shape({

    name: yup
        .string()
        .min(3)
        .required('O campo nome é obrigatório.'),

    email: yup
        .string()
        .email('Informe um email válido')
        .required('O campo email é obrigatório.'),

    cpf: yup
        .string()
        .min(11)
        .max(11)
        .required('O campo cpf é obrigatório.'),

    telephone: yup
        .string()
        .min(10)
        .max(11)
        .required('O campo telefone é obrigatório.'),

    zip_code: yup
        .string()
        .min(8)
        .max(8)
        .nullable(),

    address: yup
        .string()
        .min(4)
        .nullable(),

    address_2: yup
        .string()
        .nullable(),

    district: yup
        .string()
        .nullable(),

    city: yup
        .string()
        .min(3)
        .nullable(),

    uf: yup
        .string()
        .min(2)
        .max(2)
        .nullable(),
});

module.exports = schemaClientRegister;