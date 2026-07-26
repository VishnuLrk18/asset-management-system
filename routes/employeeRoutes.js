const express = require("express");
const router = express.Router();

const employeeController = require("../controllers/employeeController");

// Employee List
router.get("/", employeeController.getEmployees);

// Add Employee
router.get("/add", employeeController.showAddForm);
router.post("/add", employeeController.addEmployee);

// Edit Employee
router.get("/edit/:id", employeeController.showEditForm);
router.post("/edit/:id", employeeController.updateEmployee);

// Delete Employee
router.get("/delete/:id", employeeController.deleteEmployee);

module.exports = router;