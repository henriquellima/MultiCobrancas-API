const knex = require('../dbConnection');
const schemaChargesRegister = require('../validations/schemaChargesRegister');
const { isTodayDate, isOverdueAccount } = require("../validations/datesCompare");

const getCharges = async (req, res) => {
  try {
    const charges = await knex('charges')
      .join('clients', 'charges.client_id', 'clients.id')
      .select('charges.*', 'clients.name')
      .orderBy('id', 'desc')
      .returning('*');
    return res.status(200).json(charges);
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

const getClientCharges = async (req, res) => {
  const { client_id } = req.params;

  try {
    const clientExists = await knex('clients')
      .select('*')
      .where({ id: client_id })
      .first();

    if (!clientExists) {
      return res.status(404).json({ mensagem: 'Cliente não encontrado.' });
    }
    const charges = await knex('charges')
      .where({ client_id })
      .join('clients', 'charges.client_id', 'clients.id')
      .select('charges.*', 'clients.name')
      .returning('*');
    return res.status(200).json(charges);
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

const registerCharge = async (req, res) => {
  const { description, maturity_date, amount, paid } = req.body;
  const { client_id } = req.params;

  try {
    await schemaChargesRegister.validate(req.body, { abortEarly: false });

    const clientExists = await knex('clients')
      .select('*')
      .where({ id: client_id })
      .first();

    if (!clientExists) {
      return res.status(404).json({ mensagem: 'Cliente não encontrado.' });
    }

    const charge = await knex('charges')
      .insert({ client_id, description, maturity_date, amount, paid })
      .returning('*');

    if (charge.length === 0) {
      return res
        .status(400)
        .json({ mensagem: 'Não foi possível cadastrar a cobrança.' });
    }

    return res.status(201).json(charge[0]);
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

const editCharge = async (req, res) => {
  const { description, maturity_date, amount, paid } = req.body;
  const { id } = req.params;

  try {
    const chargeExists = await knex('charges')
      .select('*')
      .where({ id })
      .first();

    if (!chargeExists) {
      return res.status(404).json({ mensagem: 'Cobrança não encontrada.' });
    }

    await schemaChargesRegister.validate(req.body, { abortEarly: false });

    const editedCharge = await knex('charges')
      .update({ description, maturity_date, amount, paid })
      .where({ id })
      .returning('*');

    if (!editedCharge) {
      return res
        .status(400)
        .json({ mensagem: 'Não foi possível atualizar a cobrança.' });
    }
    return res.status(201).json(editedCharge[0]);
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

const deleteCharge = async (req, res) => {
  const { id } = req.params;

  try {
    const chargeExists = await knex('charges')
      .select('*')
      .where({ id })
      .first();

    if (!chargeExists) {
      return res.status(404).json({ mensagem: 'Cobrança não encontrada.' });
    }

    if (
      chargeExists.paid === true ||
      !isTodayDate(new Date(chargeExists.maturity_date), new Date()) &&
      isOverdueAccount(new Date(chargeExists.maturity_date), new Date())
    ) {
      return res
        .status(404)
        .json({ mensagem: 'Esta cobrança não pode ser excluída.' });
    }

    const deleteCharge = await knex('charges').del().where({ id });

    if (!deleteCharge) {
      return res
        .status(400)
        .json({ mensagem: 'Não foi possível excluir a cobrança.' });
    }
    return res.status(201).json({ mensagem: 'Cobrança excluída com sucesso.' });
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

module.exports = {
  registerCharge,
  getCharges,
  getClientCharges,
  editCharge,
  deleteCharge,
};
