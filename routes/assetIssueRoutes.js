const express = require("express");

const router = express.Router();

const assetIssueController = require("../controllers/assetIssueController");

// Display all issued assets
router.get("/", assetIssueController.getIssues);

// Show Add Issue form
router.get("/add", assetIssueController.showAddIssue);

// Save issued asset
router.post("/add", assetIssueController.addIssue);

module.exports = router;