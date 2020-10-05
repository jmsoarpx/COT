const router = require("express").Router();
const { getuser, getUserProfile } = require("../../middleware/user");

router.get("/users", getuser);

module.exports = router;
