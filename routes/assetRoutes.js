const express = require("express");
const router = express.Router();

const assetController = require("../controllers/assetController");

router.get("/", assetController.getAssets);

router.get("/add", assetController.showAddForm);
router.post("/add", assetController.addAsset);

router.get("/edit/:id", assetController.showEditForm);
router.post("/edit/:id", assetController.updateAsset);

router.get("/delete/:id", assetController.deleteAsset);

module.exports = router;