const express = require("express");

const { authUser } = require("../middlewares/auth");
const { reactPost, getReacts } = require("../controllers/reactController");

const router = express.Router();
router.put("/reactpost", authUser, reactPost);
router.get("/getreacts/:id", authUser, getReacts);
module.exports = router;
