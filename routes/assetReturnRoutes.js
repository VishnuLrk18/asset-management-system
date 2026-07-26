const express = require("express");

const router = express.Router();

const returnController = require("../controllers/assetReturnController");

router.get("/", returnController.getReturns);

router.get("/add", returnController.showReturnForm);

router.post("/add", returnController.saveReturn);

module.exports = router;