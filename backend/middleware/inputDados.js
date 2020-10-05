const { connectToCloudant, attCall } = require("../helpers/db");
const moment = require("moment");
const timezone = require("moment-timezone");
moment.tz.setDefault("America/Sao_Paulo");
const path = require("path");

const includeTorres = async (req, res) => {
  const db = connectToCloudant("cot_database");
  const csvFilePath = path.resolve(__dirname, "..", "assets", "torres.csv");
  const csv = require("csvtojson");
  csv({ delimiter: ";" })
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      let obj = {
        _id: "torresSantander:cot",
        type: "torres",
        ultimaAtualizacao: moment().format("DD/MM/YYYY HH:mm:ss"),
        torres: jsonObj,
      };
      // res.json(obj);
      console.log(obj);
      db.insert(obj);
    });
};

const saveEcmg = async (req, res) => {
  const db = connectToCloudant("cot_dados");
  const timestamp = moment().format("x");
  const io = req.app.locals.io;
  let chamado;
  let salvo = false;
  const id = req.body.id;
  console.log(req.body);
  if (typeof id !== "undefined" && id !== "") {
    console.log("valor do id " + req.body.id);
    console.log(id !== "");
    chamado = await db.get(req.body.id);
    chamado.inicioTratamento = req.body.inicioTratamento;
    chamado.fimTratamento = req.body.fimTratamento;
    chamado.origem = req.body.origem;
    chamado.numeroChamado = req.body.numeroChamado;
    chamado.fcr = req.body.fcr;
    chamado.tmo = req.body.tmo;
    chamado.vencimento = req.body.vencimento;
    chamado.dataAbertura = req.body.dataAbertura;
    chamado.tipoAtuacao = req.body.tipoAtuacao;
    chamado.qtdchamados = req.body.qtdchamados;
    chamado.categoria = req.body.categoria;
    chamado.subCategoria = req.body.subCategoria;
    chamado.direcionamento = req.body.direcionamento;
    chamado.creationDate = timezone()
      .tz("America/Sao_Paulo")
      .format("DD/MM/YYYY HH:mm:ss");
    chamado.team = "ECMG";
    chamado.analista = req.body.email;
    chamado.tratado = true;
    chamado.tratamento = false;
    console.log(chamado);
    await db.insert(chamado, async (err, result) => {
      if (err) res.status(err.statusCode).json({ error: err.message });
      salvo = true;
    });
    let esp = setInterval(async () => {
      if (salvo === true) {
        clearInterval(esp);
        const getfilter = await attCall("cot_dados");
        io.emit("tratativa", getfilter);
        return res.json({ msg: "Chamado cadastrado" });
      }
    }, 500);
  } else {
    const chamado = {
      type: "incidentsEcmg",
      notificacao: req.body.notificacao,
      ultimaModificacao: "",
      dataAbertura: req.body.dataAbertura,
      numeroChamado: req.body.numeroChamado,
      categoria: req.body.categoria,
      tmo: req.body.tmo,
      descricao: "",
      tempo: "",
      reaberto: "",
      tratado: true,
      tratamento: false,
      inicioTratamento: req.body.inicioTratamento,
      fimTratamento: req.body.fimTratamento,
      origem: req.body.origem,
      fcr: req.body.fcr,
      vencimento: req.body.vencimento,
      tipoAtuacao: req.body.tipoAtuacao,
      qtdchamados: req.body.qtdchamados,
      subCategoria: req.body.subCategoria,
      direcionamento: req.body.direcionamento,
      creationDate: timezone()
        .tz("America/Sao_Paulo")
        .format("DD/MM/YYYY HH:mm:ss"),
      team: "ECMG",
      analista: req.body.email,
    };
    console.log(chamado);
    await db.insert(chamado, async (err, result) => {
      if (err) res.status(err.statusCode).json({ error: err.message });
      salvo = true;
    });
    let esp = setInterval(async () => {
      if (salvo === true) {
        clearInterval(esp);
        const getfilter = await attCall("cot_dados");
        io.emit("tratativa", getfilter);
        return res.json({ msg: "Chamado Cadastrado" });
      }
    }, 500);
  }
};

const saveWeb = async (req, res) => {
  const db = connectToCloudant("cot_dados");
  console.log("Salvar Web");
  console.log(req.body.email);
  const doc = {
    data: req.body.data,
    type: "incidentsWeb",
    numeroChamado: req.body.numeroChamado,
    quantidadeChamados: req.body.quantidadeChamados,
    produto: req.body.produto,
    inicioTratamento: req.body.inicioTratamento,
    fimTratamento: req.body.fimTratamento,
    vencimento: req.body.vencimento,
    dataAbertura: req.body.dataAbertura,
    analista: req.body.email,
    tipoAtuacao: req.body.tipoAtuacao,
    tratado: true,
    creationDate: timezone()
      .tz("America/Sao_Paulo")
      .format("DD/MM/YYYY HH:mm:ss"),
    team: "WEB",
  };
  console.log(doc);
  await db.insert(doc, (err, result) => {
    if (err) res.status(err.statusCode).json({ error: err.message });
    else return res.json({ msg: "Chamado cadastrado" });
  });
};

let qtdChamado = 0;

const inputDispatcher = async (req, res) => {
  const io = req.app.locals.io;
  const db = connectToCloudant("cot_dados");
  let form = req.body;
  const timestamp = moment().format("DDMMYYYYHHmmss");
  const t = timezone().tz("America/Sao_Paulo").format("DD/MM/YYYY HH:mm:ss");
  console.log(timestamp);
  let chamado = [];
  let fluxo = {
    find: false,
    map: false,
    bulk: false,
  };

  // io.on("connection", () => console.log(`[IO] server => New Conection`));
  let docs = { docs: [] };
  await db.find(
    {
      selector: {
        tratado: false,
      },
    },
    (err, data) => {
      // console.log("Error:", err);
      // console.log("Data:", data);
      chamado.push(data.docs);
      fluxo.find = true;
    }
  );

  let find = setInterval(() => {
    if (fluxo.find === true) {
      form.map(async (e, index) => {
        let procurar = [];
        // eslint-disable-next-line no-unused-expressions
        procurar = chamado[0].find(
          (elemento) => elemento.notificacao === e.notificacao
        );
        // eslint-disable-next-line no-unused-expressions
        typeof procurar === "undefined" || procurar.length === 0
          ? docs.docs.push({
              type: "incidentsEcmg",
              notificacao: e.notificacao,
              ultimaModificacao: timezone()
                .tz("America/Sao_Paulo")
                .format("DD/MM/YYYY HH:mm:ss"),
              tratamento: false,
              ...e,
            })
          : "";
        if (index === form.length - 1) {
          fluxo.map = true;
          clearInterval(find);
        }
      });
    }
  }, 500);

  let bulk = setInterval(() => {
    if (fluxo.map === true) {
      db.bulk(docs, (err, data) => {
        if (err) res.json({ status: "error" });
        fluxo.bulk = true;
        qtdChamado = docs.docs.length;
        clearInterval(bulk);
      });
    }
  }, 500);

  let intervel = setInterval(() => {
    if (fluxo.bulk === true) {
      console.log(qtdChamado);
      clearInterval(intervel);
      io.emit("socketToMe", qtdChamado);
      res.json({ status: "sucess" });
    }
  }, 100);
};

const getSelect = async (req, res) => {
  const db = connectToCloudant("cot_database");

  try {
    const direcionamento = await db.get("direcionamento:cot");
    const produtos = await db.get("produtos:cot");
    const subprodutos = await db.get("subprodutos:cot");
    const tipoAtuacao = await db.get("tipoAtuacao:cot");
    const recategorizacao = await db.get("recategorizacao:cot");
    const origem = await db.get("origem:cot");
    const torres = await db.get("torresSantander:cot");
    const dados = {
      direcionamento,
      produtos,
      subprodutos,
      tipoAtuacao,
      recategorizacao,
      origem,
      torres,
    };
    console.log(dados);
    res.json({ dados });
  } catch (error) {
    return res.send(error);
  }
};

module.exports = {
  saveEcmg,
  saveWeb,
  getSelect,
  inputDispatcher,
  includeTorres,
};
