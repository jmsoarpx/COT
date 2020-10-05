const config = require("../config").get(process.env.NODE_ENV);
const moment = require("moment");
const Cloudant = require("@cloudant/cloudant");

const connectToCloudant = (db) => {
  const cloudant = Cloudant(config.DATABASE);
  const database = cloudant.db.use(db);
  return database;
};

const attCall = async (banco) => {
  const db = connectToCloudant(banco);
  const data = moment().subtract(1, "days").format("DD/MM/YYYY");
  let query = {
    selector: {
      type: "incidentsEcmg",
      tratado: false,
      ultimaModificacao: {
        $gt: data,
      },
    },
    sort: [
      {
        ultimaModificacao: "asc",
      },
    ],
  };
  console.log(query);
  let result = await db.find(query);
  let emtratamento = result.docs.filter((e) => e.tratamento === true);
  let emEspera = result.docs.filter((e) => e.tratamento === false);
  return { emEspera: emEspera.length, emtratamento: emtratamento.length };
};

module.exports = { connectToCloudant, attCall };
