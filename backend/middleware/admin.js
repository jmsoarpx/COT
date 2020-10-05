const { connectToCloudant } = require("../helpers/db");

const getClients = (req, resp, next) => {
  const db = connectToCloudant("cot_database");

  db.get("admin:config", (err, doc) => {
    if (err) return resp.json(err);
    else resp.json({ clients: doc.clients });
  });
};

module.exports = {
  getClients
};
