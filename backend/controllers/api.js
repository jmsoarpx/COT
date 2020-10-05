const router = require("express").Router();

router.use("/user", require("./api/user"));
router.use("/input", require("./api/inputDados"));
router.use("/getdados", require("./api/getDados"));
router.use("/team", require("./api/team"));

module.exports = router;
