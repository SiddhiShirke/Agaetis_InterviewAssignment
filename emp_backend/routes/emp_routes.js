
const express = require("express");
const emp_Routes = express.Router();
const {getEmployee,createEmployees, updateEmployees,deleteEmployees}= require("../controller/emp_controller");;

emp_Routes.get("/employees",getEmployee);
emp_Routes.post("/employees",createEmployees);
emp_Routes.put("/employees/:id", updateEmployees);
emp_Routes.delete("/employees/:id", deleteEmployees);

module.exports = emp_Routes;