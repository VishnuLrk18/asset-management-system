const Employee = require("../models/Employee");
const Asset = require("../models/Asset");
const AssetIssue = require("../models/AssetIssue");

// ======================================
// List Issued Assets
// ======================================

exports.getIssues = async (req, res) => {

    try {

        const issues = await AssetIssue.findAll({
            include: [
                {
                    model: Employee
                },
                {
                    model: Asset
                }
            ]
        });

        res.render("issue/list", {
            issues
        });

    } catch (err) {

        console.error(err);
        res.send("Issue Module Error<br><br>" + err.message);

    }

};

// ======================================
// Show Add Issue Form
// ======================================

exports.showAddIssue = async (req, res) => {

    try {

        const employees = await Employee.findAll({
            where: {
                status: true
            }
        });

        const assets = await Asset.findAll({
            where: {
                status: "Available"
            }
        });

        res.render("issue/add", {
            employees,
            assets
        });

    } catch (err) {

        console.error(err);
        res.send("Add Issue Error<br><br>" + err.message);

    }

};

// ======================================
// Save Issue
// ======================================

exports.addIssue = async (req, res) => {

    try {

        await AssetIssue.create({

            employeeId: req.body.employeeId,
            assetId: req.body.assetId,
            issueDate: req.body.issueDate,
            expectedReturnDate: req.body.expectedReturnDate,
            remarks: req.body.remarks,
            status: "Issued"

        });

        // Update Asset Status
        await Asset.update(
            {
                status: "Issued"
            },
            {
                where: {
                    id: req.body.assetId
                }
            }
        );

        res.redirect("/issues");

    } catch (err) {

        console.error(err);
        res.send("Save Issue Error<br><br>" + err.message);

    }

};