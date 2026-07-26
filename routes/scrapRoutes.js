const express = require("express");

const router = express.Router();

const scrapController = require("../controllers/scrapController");

router.get("/", scrapController.getScrapList);

router.post("/:id", scrapController.scrapAsset);

module.exports = router;