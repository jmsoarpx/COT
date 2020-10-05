const express = require("express");
const router = express.Router();
const passport = require("passport");
const session = require("express-session");
const config = require("../config").get(process.env.NODE_ENV);
const appID = require("ibmcloud-appid");

const WebAppStrategy = appID.WebAppStrategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

let webAppStrategy = new WebAppStrategy(config.w3id);

passport.use("w3id", webAppStrategy);

router.get("/w3id", passport.authenticate("w3id", {}));

router.get("/sso/callback", (req, resp, next) => {
  //console.log(req.user);
  let redirect_url = req.session.originalUrl || "/";
  console.log("redirect url:" + redirect_url);
  passport.authenticate("w3id", {
    successRedirect: redirect_url,
    failureRedirect: "/failure"
  })(req, resp, next);
});

router.get("/logout", (req, resp) => {
  console.log("logout");
  resp.clearCookie("login-cookie");
  resp.clearCookie("auth");
  resp.clearCookie("connect.sid");
  req.logout();
  req.logOut();
  req.session = null;
  return resp.redirect(
    "https://myibm.ibm.com/pkmslogout?filename=accountRedir.html"
  );

  //return resp.redirect('/');
});

module.exports = router;
