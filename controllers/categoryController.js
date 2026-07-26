const Category = require("../models/Category");

// List
exports.getCategories = async (req, res) => {

    const categories = await Category.findAll({
        order: [["id", "ASC"]]
    });

    res.render("category/list", {
        categories
    });

};

// Add Form
exports.showAddForm = (req, res) => {

    res.render("category/add");

};

// Save
exports.addCategory = async (req, res) => {

    await Category.create({

        categoryName: req.body.categoryName,
        description: req.body.description

    });

    res.redirect("/categories");

};

// Edit Form
exports.showEditForm = async (req, res) => {

    const category = await Category.findByPk(req.params.id);

    res.render("category/edit", {
        category
    });

};

// Update
exports.updateCategory = async (req, res) => {

    const category = await Category.findByPk(req.params.id);

    await category.update({

        categoryName: req.body.categoryName,
        description: req.body.description

    });

    res.redirect("/categories");

};

// Delete
exports.deleteCategory = async (req, res) => {

    const category = await Category.findByPk(req.params.id);

    await category.destroy();

    res.redirect("/categories");

};