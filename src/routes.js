const express = require("express");
const { login } = require("./controllers/login");
const { registerUser, verifyPassword, getProfile, editProfile } = require("./controllers/users");
const loginCheck = require("./middleware/loginCheck");
const { registerClient, getClients, getClient, editClient } = require("./controllers/clients");
const { getCharges, registerCharge, getClientCharges, editCharge, deleteCharge, searchCharge } = require("./controllers/charges");

const routes = express();

routes.post("/user", registerUser);
routes.post("/password", verifyPassword);
routes.post("/login", login);

routes.use(loginCheck);
routes.get("/user", getProfile);
routes.put("/user", editProfile);

routes.get("/clients", getClients);
routes.get("/client/:client_id", getClient);
routes.post("/client", registerClient);
routes.put("/client/:id", editClient);

routes.get("/charges", getCharges);
routes.get("/charges/:client_id", getClientCharges);
routes.post("/charge/:client_id", registerCharge);
routes.put("/charge/:id", editCharge);
routes.delete("/charge/:id", deleteCharge);

module.exports = routes;