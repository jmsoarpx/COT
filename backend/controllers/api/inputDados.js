const router = require("express").Router();
const {
  saveEcmg,
  saveWeb,
  getSelect,
  inputDispatcher,
  includeTorres,
} = require("../../middleware/inputDados");

router.post("/inputecmg", saveEcmg);
router.post("/inputWeb", saveWeb);
router.get("/getselec", getSelect);
router.post("/inputDispatcher", inputDispatcher);
router.get("/includetorres", includeTorres);

module.exports = router;
