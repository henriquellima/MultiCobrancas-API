const knex = require('../dbConnection');
const schemaClientRegister = require('../validations/schemaClientRegister');

const getClients = async (req, res) => {
  const { id } = req.user;

  if (!id) {
    return res.status(400).json({ mensagem: 'Usuário não encontrado.' });
  }

  try {
    const clients = await knex('clients').orderBy('id', 'desc').returning('*');
    const debts = await knex('charges')
      .where({ paid: false })
      .andWhere('maturity_date', '<', new Date())
      .distinct('client_id')
      .returning('*');

    const clientsWithStatus = clients.map((client) => {
      for (debt of debts) {
        if (client.id === debt.client_id) {
          return { ...client, status: 'inadimplente' };
        }
      }
      return { ...client, status: 'em dia' };
    });

    return res.status(201).json(clientsWithStatus);
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

const getClient = async (req, res) => {
  const { client_id } = req.params;

  try {
    const client = await knex('clients')
      .where({ id: client_id })
      .returning('*');
    return res.status(201).json(client);
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

const registerClient = async (req, res) => {
  const {
    name,
    email,
    cpf,
    telephone,
    zip_code,
    address,
    address_2,
    district,
    city,
    uf,
  } = req.body;
  const { id } = req.user;

  if (!zip_code) {
    delete req.body.zip_code;
  }
  if (!address) {
    delete req.body.address;
  }
  if (!address_2) {
    delete req.body.address_2;
  }
  if (!district) {
    delete req.body.district;
  }
  if (!city) {
    delete req.body.city;
  }
  if (!uf) {
    delete req.body.uf;
  }

  try {
    await schemaClientRegister.validate(req.body, { abortEarly: false });

    const emailExists = await knex('clients')
      .select('*')
      .where({ email: email.toLowerCase() })
      .first();

    if (emailExists) {
      return res.status(400).json({ mensagem: 'E-mail já cadastrado.' });
    }

    const cpfExists = await knex('clients').select('*').where({ cpf }).first();

    if (cpfExists) {
      return res.status(400).json({ mensagem: 'CPF já cadastrado.' });
    }

    const client = await knex('clients')
      .insert({
        user_id: id,
        name,
        email: email.toLowerCase(),
        cpf,
        telephone,
        zip_code,
        address,
        address_2,
        district,
        city,
        uf,
      })
      .returning('*');

    if (client.length === 0) {
      return res
        .status(400)
        .json({ mensagem: 'Não foi possível cadastrar o cliente.' });
    }

    return res.status(201).json(client[0]);
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

const editClient = async (req, res) => {
  const {
    name,
    email,
    cpf,
    telephone,
    zip_code,
    address,
    address_2,
    district,
    city,
    uf,
  } = req.body;
  const { id } = req.params;

  if (!zip_code) {
    delete req.body.zip_code;
  }
  if (!address) {
    delete req.body.address;
  }
  if (!address_2) {
    delete req.body.address_2;
  }
  if (!district) {
    delete req.body.district;
  }
  if (!city) {
    delete req.body.city;
  }
  if (!uf) {
    delete req.body.uf;
  }

  try {
    const clientExists = await knex('clients')
      .select('*')
      .where({ id })
      .first();

    if (!clientExists) {
      return res.status(404).json({ mensagem: 'Cliente não encontrado.' });
    }

    await schemaClientRegister.validate(req.body);

    const emailExists = await knex('clients')
      .where({ email: email.toLowerCase() })
      .whereNot({ id })
      .first();

    if (emailExists) {
      return res
        .status(400)
        .json({ mensagem: 'E-mail já cadastrado para outro cliente!' });
    }

    const cpfExists = await knex('clients')
      .where({ cpf })
      .whereNot({ id })
      .first();

    if (cpfExists) {
      return res
        .status(400)
        .json({ mensagem: 'CPF já cadastrado para outro cliente!' });
    }

    const editedClient = await knex('clients')
      .update({
        name,
        email: email.toLowerCase(),
        cpf,
        telephone,
        zip_code,
        address,
        address_2,
        district,
        city,
        uf,
      })
      .where({ id })
      .returning('*');

    if (!editedClient) {
      return res
        .status(400)
        .json({ mensagem: 'Não foi possível atualizar o cliente.' });
    }
    return res.status(201).json(editedClient[0]);
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

module.exports = {
  getClients,
  registerClient,
  getClients,
  getClient,
  editClient,
};
