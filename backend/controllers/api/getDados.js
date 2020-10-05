const router = require("express").Router();
const {
  getNextChamado,
  getProd,
  getPendent,
  getProdWeb,
  getReports,
} = require("../../middleware/getAll");

router.get("/nextCalled", getNextChamado);
router.get("/getprod", getProd);
router.get("/getprodWeb", getProdWeb);
router.get("/getpendente", getPendent);
router.get("/getreports", getReports);

module.exports = router;
