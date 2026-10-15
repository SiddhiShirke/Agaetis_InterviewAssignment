const pool = require("../config/db");

exports.getEmployee = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM employee");

        console.log("DONE");

        res.status(200).json({
            message: "Employees fetched successfully",
            employees: result.rows
        });

    } catch (error) {
        console.error("Failed to fetch employees:", error.message);

        res.status(500).json({
            message: "Failed to fetch employees"
        });
    }
};

exports.createEmployees = async(req,res)=>{
    try{
        const {name,email,role} = req.body;
        const result = await pool.query(`insert into employee (name,email,role) values($1,$2,$3)`,  [name, email, role])
    
        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        res.status(200).json({
            message: "Employee created successfully",
            employee: result.rows[0]
        });

    }
    catch(error){
        console.log("Employee was not saved");
    }
}

exports.updateEmployees = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, role } = req.body;

        const result = await pool.query(
            `UPDATE employee
             SET name = $1, email = $2, role = $3
             WHERE id = $4
             RETURNING *`,
            [name, email, role, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        res.status(200).json({
            message: "Employee updated successfully",
            employee: result.rows[0]
        });

    } catch (error) {
        console.error("Failed to update employee:", error.message);

        res.status(500).json({
            message: "Failed to update employee"
        });
    }
};


// DELETE EMPLOYEE
exports.deleteEmployees = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            `DELETE FROM employee
             WHERE id = $1
             RETURNING *`,
            [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        res.status(200).json({
            message: "Employee deleted successfully",
            employee: result.rows[0]
        });

    } catch (error) {
        console.error("Failed to delete employee:", error.message);

        res.status(500).json({
            message: "Failed to delete employee"
        });
    }
};



