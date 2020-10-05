const { connectToCloudant, attCall } = require("../helpers/db");
const moment = require("moment");
const timezone = require("moment-timezone");

moment.tz.setDefault("America/Sao_Paulo");

const getNextChamado = async (req, res) => {
  const db = connectToCloudant("cot_dados");
  const io = req.app.locals.io;
  let query = {
    selector: {
      type: "incidentsEcmg",
      tratado: false,
      analistaAtual: req.query.analista,
    },
    sort: [
      {
        ultimaModificacao: "desc",
      },
      {
        prioridade: "desc",
      },
    ],
    limit: 1,
  };
  console.log(query);

  await db.find(query, async (err, result) => {
    if (err) return console.error(err.message);
    if (result.docs.length > 0) {
      let doc = result.docs[0];
      doc.tratamento = true;
      await db.insert(doc);
      const getfilter = await attCall("cot_dados");
      io.emit("tratativa", getfilter);
      res.json(result.docs);
    } else {
      res.json({ msg: "Sem chamados" });
    }
  });
};

const getProd = async (req, res) => {
  const db = connectToCloudant("cot_dados");
  let query = {
    selector: {
      $or: [
        {
          type: "incidentsEcmg",
          tratado: true,
          analistaAtual: req.query.analista,
          fimTratamento: {
            $regex: req.query.date,
          },
        },
        {
          type: "incidentsEcmg",
          tratado: true,
          analista: req.query.analista,
          fimTratamento: {
            $regex: req.query.date,
          },
        },
      ],
    },
    sort: [
      {
        fimTratamento: "asc",
      },
    ],
  };
  await db.find(query, (err, result) => {
    if (err) return console.error(err.message);
    res.json(result.docs);
  });
};

const getReports = async (req, res) => {
  const db = connectToCloudant("cot_dados");
  console.log("getReports");
  let query = {
    selector: {
      $or: [
        {
          type: "incidentsEcmg",
          tratado: true,
        },
      ],
    },
    sort: [
      {
        _id: "asc",
      },
    ],
  };
  await db.find(query, (err, result) => {
    if (err) return console.error(err.message);
    res.json(result.docs);
  });
};

const getProdWeb = async (req, res) => {
  const db = connectToCloudant("cot_dados");
  let query = {
    selector: {
      type: "incidentsWeb",
      tratado: true,
      analista: req.query.analista,
      fimTratamento: {
        $regex: req.query.date,
      },
    },
    sort: [
      {
        fimTratamento: "asc",
      },
    ],
  };
  await db.find(query, (err, result) => {
    if (err) return console.error(err.message);
    res.json(result.docs);
  });
};

const getPendent = async (req, res) => {
  const db = connectToCloudant("cot_dados");
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
  await db.find(query, (err, result) => {
    if (err) return console.error(err.message);
    console.log(result.docs.length);
    res.json(result.docs);
  });
};

module.exports = {
  getNextChamado,
  getProd,
  getPendent,
  getProdWeb,
  getReports,
};
