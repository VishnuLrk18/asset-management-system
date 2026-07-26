const AssetIssue = require("../models/AssetIssue");
const AssetReturn = require("../models/AssetReturn");
const Employee = require("../models/Employee");
const Asset = require("../models/Asset");

exports.getHistory = async (req, res) => {

    try {

        const history = await AssetIssue.findAll({

            include: [
                Employee,
                Asset,
                AssetReturn
            ],

            order: [["id", "DESC"]]

        });

        res.render("history/list", {
            history
        });

    } catch (err) {

        console.log(err);
        res.send(err.message);

    }

};