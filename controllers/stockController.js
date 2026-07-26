const Asset = require("../models/Asset");
const Category = require("../models/Category");

exports.getStock = async (req, res) => {

    try {

        const assets = await Asset.findAll({

            include: [
                {
                    model: Category
                }
            ],

            order: [["id", "ASC"]]

        });

        const totalAssets = await Asset.count();

        const availableAssets = await Asset.count({
            where: {
                status: "Available"
            }
        });

        const issuedAssets = await Asset.count({
            where: {
                status: "Issued"
            }
        });

        const returnedAssets = await Asset.count({
            where: {
                status: "Returned"
            }
        });

        const scrappedAssets = await Asset.count({
            where: {
                status: "Scrapped"
            }
        });

        res.render("stock/list", {
            assets,
            totalAssets,
            availableAssets,
            issuedAssets,
            returnedAssets,
            scrappedAssets
        });

    } catch (err) {

        console.log(err);
        res.send(err.message);

    }

};