// process.env.NODE_ENV = 'development'; //DEV
const http = require("http");
const config = require("./config").get(process.env.NODE_ENV);
const express = require("express");
const cors = require("cors");
const app = express();
const socketio = require("socket.io");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const { connectToCloudant } = require("./helpers/db");
const moment = require("moment");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const { ensureAuthenticated, store } = require("./middleware/auth");

/* Middleware para forçar o uso do https */
app.use((req, resp, next) => {
  if (req.headers && req.headers.$wssc === "https") {
    // Request via https

    return next();
  } else {
    // Todos os requests via http serão redirecionados para https
    console.log("Blocked unsecured request, redirecting");
    resp.redirect("https://" + req.headers.host + req.url);
  }
});
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(morgan("tiny")); // Middleware para adicionar logs de ajax requests no console.
app.use(cookieParser());
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    store,
    secret: config.w3id.secret,
    /* maxAge: 43200000 */
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", require("./controllers/auth"));
app.use(ensureAuthenticated);
app.use(
  express.static("assets", {
    maxAge: "1000",
  })
);

app.use("/api", require("./controllers/api"));

app.use("/", (req, resp) => {
  const path = require("path");
  console.log(req.user);
  resp.sendFile("index.html", { root: path.join(__dirname, "assets/") });
});
const server = http.createServer(app);

//http.globalAgent.options.rejectUnauthorized = false;

if (config.REJECT_UNAUTHORIZED) process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const io = socketio(server);

app.use(function (req, res, next) {
  req.io = io;
  next();
});

function findWithAttr(array, attr, value) {
  for (var i = 0; i < array.length; i += 1) {
    if (array[i][attr] === value) {
      return i;
    }
  }
  return -1;
}

let chamados = 0;
let analista = [];
app.use("/api", require("./controllers/api"));

server.listen(config.PORT);

app.locals.io = io;

io.on("connection", (socket) => {
  console.log(`Uma nova conexão ${socket.id}`);
  socket.on("consultCall", async (dataParams) => {
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
    const result = await db.find(query);
    socket.emit("receive", {
      qtdChamado: result.docs.length,
      analista: analista,
    });
  });

  socket.on("login", (data) => {
    var index = findWithAttr(analista, "email", data.email);
    if (index < 0) {
      data.idSocket = socket.id;
      analista.push(data);
    } else {
      console.log("possui o analista no array true");
      analista[index].idSocket = socket.id;
    }
    socket.emit("logar", analista);
  });

  socket.on("disconnect", () => {
    var index = findWithAttr(analista, "idSocket", socket.id);
    if (index >= 0) {
      analista.splice(index, 1);
    }
  });

  socket.emit("previusCalls", { chamados: chamados, analista: analista });

  socket.on("chamadosTrat", (data) => {
    chamados = data;
    socket.emit("receivedCalls", chamados);
  });
});
