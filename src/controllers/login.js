const knex = require('../dbConnection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const schemaLogin = require('../validations/schemaLogin');

const login = async (req, res) => {
    const { email, password } = req.body;

    try {

        await schemaLogin.validate(req.body, { abortEarly: false });

        const user = await knex('users').where({ email }).first();

        if (!user) {
            return res.status(400).json({ mensagem: "O usuario não foi encontrado." });
        }

        const correctPassword = await bcrypt.compare(password, user.password);

        if (!correctPassword) {
            return res.status(400).json({ mensagem: "Email e senha não conferem." });
        }

        const token = jwt.sign({ id: user.id }, process.env.SENHA_JWT, { expiresIn: '8h' });

        return res.status(200).json({ token });

    } catch (error) {
        return res.status(400).json({ mensagem: error.message });
    }
}

module.exports = {
    login
}