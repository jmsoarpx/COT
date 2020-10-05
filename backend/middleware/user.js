const { connectToCloudant } = require("../helpers/db");
const moment = require("moment");
const timezone = require("moment-timezone");
moment.tz.setDefault("America/Sao_Paulo");

const getUserProfile = (req, resp, next) => {
  const db = connectToCloudant("cot_database");
  req.db = db;
  db.get(`${req.user.id || req.user.email}:profile`, (err, user) => {
    if (err) {
      return resp.json({ error: err });
    }

    user.profilePic = user._attachments
      ? "/api/user/profile_pic"
      : "profile_pic.jpg";
    req.obj = { user };
    return next();
  });
};

const generateID = () => {
  const letters = "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ";
  let plat_id =
    letters.charAt(Math.floor(Math.random() * letters.length)) +
    (Math.random() + 1).toString(36).substr(2, 24);
  return moment().format("MMYY") + plat_id;
};

/* Traz as views padrões que um usuário tem acesso */
const getUserConfig = (req, resp, next) => {
  const db = req.db;
  const io = req.app.locals.io;
  const myId = generateID();
  console.log(myId);
  console.log("valor de io: " + io);
  db.get("user:config", (err, userConfig) => {
    if (err) return resp.json({ error: err });
    if (req.obj.user.profileType === "user") {
      io.emit("logou", {
        id: myId,
        email: req.obj.user.email,
        nome: req.obj.user.displayName,
      });
      req.obj.userConfig = userConfig.user;
    }
    if (req.obj.user.profileType === "leader")
      req.obj.userConfig = userConfig.leader;
    if (req.obj.user.profileType === "admin")
      req.obj.userConfig = userConfig.leader;
    console.log(req.obj.user.profileType);
    return next();
  });
};

/* Traz a foto de perfil do usuário */
const getUserProfilePic = (req, resp, next) => {
  const db = connectToCloudant("cot_database");

  const userId = req.query.id || req.user.id || req.user.email;

  db.attachment.getAsStream(`${userId}:profile`, "profile_pic.jpg").pipe(resp);
};

const getuser = (req, resp, next) => {
  const db = connectToCloudant("cot_database");
  const query = {
    selector: {
      type: "user",
      profileType: {
        $in: ["user", "leader", "admin"],
      },
      clients: {
        $in: [req.query.team],
      },
    },
    fields: [
      "email",
      "displayName",
      "profileType",
      "clients",
      "team",
      "_attachments",
      "_id",
    ],
  };
  db.find(query, (err, result) => {
    if (err) return resp.json({ error: err });
    return resp.json(result);
  });
};

const createNewUser = async (req, resp, next) => {
  const db = connectToCloudant("cot_database");

  if (req.body.email === undefined || req.body.email === "")
    return resp
      .status(400)
      .json({ msg: "O email do usuário não pode estar em branco" });

  const doc = {
    _id: req.body.email + ":profile",
    type: "user",
    displayName: req.body.displayName,
    profileType: req.body.profileType,
    email: req.body.email,
    status: "enabled",
    team: req.body.team,
    clients: [req.body.clients],
  };
  if (req.file !== undefined) {
    db.multipart.insert(
      doc,
      [
        {
          name: "profile_pic.jpg",
          data: req.file.buffer,
          content_type: "image/jpg",
        },
      ],
      doc._id,
      (err) => {
        if (err) return resp.json(err);
        else return resp.json({ msg: "USER REGISTERED" });
      }
    );
  } else {
    await db.insert(doc, (err, result) => {
      if (err) return resp.status(err.statusCode).json({ error: err.message });
      return resp.json({ msg: "USER REGISTERED" });
    });
  }
};

module.exports = {
  getUserProfile,
  getUserConfig,
  getUserProfilePic,
  getuser,
  createNewUser,
};
