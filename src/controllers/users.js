const knex = require("../dbConnection");
const bcrypt = require("bcrypt");
const schemaUserRegister = require("../validations/schemaUserRegister");
const schemaRegisterPassword = require("../validations/schemaRegisterPassword");
const schemaEditProfile = require("../validations/schemaEditProfile");

const newUser = { name: "", email: "" };

const registerUser = async (req, res) => {
  const { name, email } = req.body;

  try {
    await schemaUserRegister.validate(req.body);

    const emailExists = await knex("users")
      .select("*")
      .where({ email: email.toLowerCase() })
      .first();

    if (emailExists) {
      return res.status(400).json({ mensagem: "Email já cadastrado." });
    }

    newUser.name = name;
    newUser.email = email.toLowerCase();
    return res.status(200).json({ newUser, mensagem: "Prossiga e digite sua senha" });
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

const verifyPassword = async (req, res) => {
  const { password } = req.body;

  try {
    await schemaRegisterPassword.validate(req.body);

    const encryptedPassword = await bcrypt.hash(password, 10);

    const insertUser = await knex("users")
      .insert({
        name: newUser.name,
        email: newUser.email,
        password: encryptedPassword,
      });

    if (insertUser.length === 0) {
      return res
        .status(400)
        .json({ mensagem: "Não foi possível cadastrar o usuário." });
    }

    return res
      .status(201)
      .json({ mensagem: "Cadastro realizado com sucesso!" });
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

const getProfile = async (req, res) => {
  const { user } = req;
  try {
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

const editProfile = async (req, res) => {
  const { name, email, password, cpf, telephone } = req.body;
  const { id } = req.user;

  if (!telephone) { delete req.body.telephone };
  if (!cpf) { delete req.body.cpf };
  if (!password) { delete req.body.password };

  try {
    await schemaEditProfile.validate(req.body, { abortEarly: false });

    if (name) {
      req.body.name = name;
    }

    if (email) {
      if (email !== req.user.email) {
        const emailExists = await knex("users").where({ email: email.toLowerCase() }).first();

        if (emailExists) {
          return res
            .status(400)
            .json({ mensagem: "E-mail já cadastrado!" });
        }
      }
      req.body.email = email;
    }

    let newPassword = "";

    if (!password || password === "") {
      const user = await knex("users").where({ id }).first();
      newPassword = user.password;
    }

    if (password) {
      if (password.length < 6) {
        return res
          .status(400)
          .json({ mensagem: "A senha precisa ter no mínimo 6 caracteres!" });
      }
      newPassword = await bcrypt.hash(password, 10);
    }

    if (cpf) {
      if (cpf !== req.user.cpf) {
        const cpfExists = await knex("users").where({ cpf }).first();
        if (cpfExists) {
          return res
            .status(400)
            .json({ mensagem: "CPF já cadastrado!" });
        }
      }
      if (cpf.length !== 11) {
        return res
          .status(400)
          .json({ mensagem: "O CPF deve ter 11 caracteres!" });
      }
      req.body.cpf = cpf;
    }

    if (telephone) {
      if (telephone.length < 10 || telephone.length > 11) {
        return res
          .status(400)
          .json({ mensagem: "O telefone deve ter entre 10 e 11 caracteres!" });
      }
      req.body.telephone = telephone;
    }

    const editedProfile = await knex("users")
      .update({ name, email: email.toLowerCase(), password: newPassword, cpf, telephone })
      .where({ id }).returning('*');

    if (!editedProfile) {
      return res.status(400).json({ mensagem: "O usuario não foi atualizado" });
    }

    delete editedProfile[0].password;

    return res
      .status(201)
      .json(editedProfile[0]);
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

module.exports = {
  registerUser,
  verifyPassword,
  getProfile,
  editProfile,
};
