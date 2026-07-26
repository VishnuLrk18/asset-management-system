const Asset = require("../models/Asset");
const Category = require("../models/Category");

// Asset List
exports.getAssets = async (req, res) => {

    const assets = await Asset.findAll({
        include: Category,
        order: [["id", "ASC"]]
    });

    res.render("asset/list", {
        assets
    });

};

// Add Form
exports.showAddForm = async (req, res) => {

    const categories = await Category.findAll({
        where: { status: true }
    });

    res.render("asset/add", {
        categories
    });

};

// Save Asset
exports.addAsset = async (req, res) => {

    await Asset.create({

        assetCode: req.body.assetCode,
        assetName: req.body.assetName,
        serialNumber: req.body.serialNumber,
        make: req.body.make,
        model: req.body.model,
        purchaseDate: req.body.purchaseDate,
        purchaseCost: req.body.purchaseCost,
        categoryId: req.body.categoryId

    });

    res.redirect("/assets");

};

// Edit Form
exports.showEditForm = async (req, res) => {

    const asset = await Asset.findByPk(req.params.id);

    const categories = await Category.findAll();

    res.render("asset/edit", {
        asset,
        categories
    });

};

// Update
exports.updateAsset = async (req, res) => {

    const asset = await Asset.findByPk(req.params.id);

    await asset.update({

        assetCode: req.body.assetCode,
        assetName: req.body.assetName,
        serialNumber: req.body.serialNumber,
        make: req.body.make,
        model: req.body.model,
        purchaseDate: req.body.purchaseDate,
        purchaseCost: req.body.purchaseCost,
        categoryId: req.body.categoryId

    });

    res.redirect("/assets");

};

// Delete
exports.deleteAsset = async (req, res) => {

    const asset = await Asset.findByPk(req.params.id);

    await asset.destroy();

    res.redirect("/assets");

};