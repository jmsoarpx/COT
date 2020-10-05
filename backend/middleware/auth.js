const config = require("../config").get(process.env.NODE_ENV);
const cookieParser = require("cookie-parser");
const session = require("express-session");
const CloudantStore = require("connect-cloudant-store")(session);
const { connectToCloudant } = require("../helpers/db");

const store = new CloudantStore({
  ttl: 43200000,
  disableTTLRefresh: true,
  database: config.session_db,
  url: config.DATABASE.url,
});
store.on("connect", () => {
  setInterval(() => {
    store.cleanupExpired();
  }, 3600 * 1000);
});

store.on("disconnect", function () {
  console.log(
    "failed to connect to cloudant db - by default falls back to MemoryStore"
  );
  // failed to connect to cloudant db - by default falls back to MemoryStore
});

store.on("error", function (err) {
  console.log(err);
  // You can log the store errors to your app log
});

const ensureAuthenticated = (req, resp, next) => {
  /* console.log("Req is Authenticated: "+ req.isAuthenticated());
	console.log(req.session); */
  if (!req.isAuthenticated()) {
    if (
      req.originalUrl.startsWith("/scripts") ||
      req.originalUrl.startsWith("/css")
    )
      req.session.originalUrl = "/";
    else req.session.originalUrl = req.originalUrl;

    return resp.redirect("/auth/w3id");
    /* if (req.cookies['auth']) {
			return resp.redirect(`/auth/${req.cookies['auth']}`);
		} else {
			return resp.render('login.ejs');
		} */
  } else {
    return next();
  }
};

const ensureIsLeader = (req, resp, next) => {
  console.log(req.obj.user.profileType);

  if (
    req.obj.user.profileType !== "leader" &&
    req.obj.user.profileType !== "admin"
  )
    return resp.status(401).send({ error: "not_authorized" });
  else return next();
};

const ensureIsAdmin = (req, resp, next) => {
  if (req.obj.user.profileType !== "admin")
    return resp.status(401).send({ error: "not_authorized" });
  else return next();
};

module.exports = {
  store,
  ensureAuthenticated,
  ensureIsLeader,
  ensureIsAdmin,
};
