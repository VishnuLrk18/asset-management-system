const Employee = require("../models/Employee");

// Display Employee List
exports.getEmployees = async (req, res) => {
    try {
        const employees = await Employee.findAll({
            order: [["id", "ASC"]]
        });

        res.render("employee/list", {
            employees
        });

    } catch (error) {
        console.error(error);
        res.status(500).send("Error Loading Employees");
    }
};

// Show Add Employee Form
exports.showAddForm = (req, res) => {
    res.render("employee/add");
};

// Save Employee
exports.addEmployee = async (req, res) => {
    try {

        await Employee.create({
            employeeCode: req.body.employeeCode,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            department: req.body.department
        });

        res.redirect("/employees");

    } catch (error) {
        console.error(error);
        res.status(500).send("Unable to Save Employee");
    }
};

// Show Edit Employee Form
exports.showEditForm = async (req, res) => {
    try {

        const employee = await Employee.findByPk(req.params.id);

        if (!employee) {
            return res.status(404).send("Employee Not Found");
        }

        res.render("employee/edit", {
            employee
        });

    } catch (error) {
        console.error(error);
        res.status(500).send("Error Loading Employee");
    }
};

// Update Employee
exports.updateEmployee = async (req, res) => {
    try {

        const employee = await Employee.findByPk(req.params.id);

        if (!employee) {
            return res.status(404).send("Employee Not Found");
        }

        await employee.update({
            employeeCode: req.body.employeeCode,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            department: req.body.department
        });

        res.redirect("/employees");

    } catch (error) {
        console.error(error);
        res.status(500).send("Unable to Update Employee");
    }
};

// Delete Employee
exports.deleteEmployee = async (req, res) => {
    try {

        const employee = await Employee.findByPk(req.params.id);

        if (!employee) {
            return res.status(404).send("Employee Not Found");
        }

        await employee.destroy();

        res.redirect("/employees");

    } catch (error) {
        console.error(error);
        res.status(500).send("Unable to Delete Employee");
    }
};