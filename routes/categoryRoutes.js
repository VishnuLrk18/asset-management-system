const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/categoryController");

router.get("/", categoryController.getCategories);

router.get("/add", categoryController.showAddForm);
router.post("/add", categoryController.addCategory);

router.get("/edit/:id", categoryController.showEditForm);
router.post("/edit/:id", categoryController.updateCategory);

router.get("/delete/:id", categoryController.deleteCategory);

module.exports = router;