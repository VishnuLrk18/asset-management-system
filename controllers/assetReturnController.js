const AssetIssue = require("../models/AssetIssue");
const AssetReturn = require("../models/AssetReturn");
const Employee = require("../models/Employee");
const Asset = require("../models/Asset");

// =======================================
// List Returned Assets
// =======================================

exports.getReturns = async (req, res) => {

    try {

        const returns = await AssetReturn.findAll({

            include: [
                {
                    model: AssetIssue,
                    include: [
                        Employee,
                        Asset
                    ]
                }
            ]

        });

        res.render("return/list", {
            returns
        });

    } catch (err) {

        console.log(err);
        res.send(err.message);

    }

};

// =======================================
// Show Return Form
// =======================================

exports.showReturnForm = async (req, res) => {

    try {

        const issues = await AssetIssue.findAll({

            where: {
                status: "Issued"
            },

            include: [
                Employee,
                Asset
            ]

        });

        res.render("return/add", {
            issues
        });

    } catch (err) {

        console.log(err);
        res.send(err.message);

    }

};

// =======================================
// Save Return
// =======================================

exports.saveReturn = async (req, res) => {

    try {

        await AssetReturn.create({

            issueId: req.body.issueId,
            returnDate: req.body.returnDate,
            remarks: req.body.remarks

        });

        const issue = await AssetIssue.findByPk(req.body.issueId);

        await AssetIssue.update({

            status: "Returned"

        }, {

            where: {
                id: req.body.issueId
            }

        });

        await Asset.update({

            status: "Available"

        }, {

            where: {
                id: issue.assetId
            }

        });

        res.redirect("/returns");

    } catch (err) {

        console.log(err);
        res.send(err.message);

    }

};