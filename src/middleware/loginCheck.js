const knex = require('../dbConnection');
const jwt = require('jsonwebtoken');


const loginCheck = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ mensagem: 'Não autorizado' });
    }

    try {
        const token = authorization.replace('Bearer ', '').trim();

        const { id } = jwt.verify(token, process.env.SENHA_JWT);

        const findUser = await knex('users').where({ id }).first();

        if (!findUser) {
            return res.status(404).json({ mensagem: 'Usuario não encontrado' });
        }

        const { password, ...user } = findUser;

        req.user = user;

        next();
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = loginCheck;