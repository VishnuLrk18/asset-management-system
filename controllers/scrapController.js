const Asset = require("../models/Asset");

exports.getScrapList = async (req, res) => {

    try {

        const assets = await Asset.findAll({
            order: [["id", "ASC"]]
        });

        res.render("scrap/list", {
            assets
        });

    } catch (err) {

        console.log(err);
        res.send(err.message);

    }

};

exports.scrapAsset = async (req, res) => {

    try {

        await Asset.update({

            status: "Scrapped"

        }, {

            where: {
                id: req.params.id
            }

        });

        res.redirect("/scrap");

    } catch (err) {

        console.log(err);
        res.send(err.message);

    }

};