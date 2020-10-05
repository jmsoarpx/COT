const router = require("express").Router();
const { ensureIsLeader } = require("../../middleware/auth");
const multer = require("multer");
let storage = multer.memoryStorage();
let upload = multer({ storage });
const {
  getUserProfile,
  getUserConfig,
  getUserProfilePic,
  createNewUser,
} = require("../../middleware/user");

router.get(
  "/profile",
  getUserProfile,
  (req, res, next) => {
    console.log(req.query.full);
    if (req.query.full === "true") {
      return getUserConfig(req, res, next);
    } else {
      return res.json(req.obj);
    }
  },
  (req, resp, next) => {
    return resp.json(req.obj);
  }
);

router.get("/profile_pic", getUserProfilePic);
router.post("/new", upload.single("profile_pic"), createNewUser);

module.exports = router;
