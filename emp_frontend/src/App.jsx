
import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://127.0.0.1:5000/employees";

function App() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
  });
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");

  // READ
  const fetchEmployees = async () => {
    try {
      const res = await axios.get(API);
      setEmployees(res.data.employees);
    } catch (error) {
      setMessage("Failed to fetch employees");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // INPUT CHANGE
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // CREATE AND UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId !== null) {
        await axios.put(`${API}/${editId}`, form);
        setMessage("Employee updated successfully");
      } else {
        await axios.post(API, form);
        setMessage("Employee created successfully");
        
      }
      await fetchEmployees();
      setForm({ name: "", email: "", role: "" });
      setEditId(null);
      
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Operation failed"
      );
      console.error(error);
    }
  };

  // EDIT
  const handleEdit = (employee) => {
    setEditId(employee.id);
    setForm({
      name: employee.name,
      email: employee.email,
      role: employee.role,
    });
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this employee?")) return;

    try {
      await axios.delete(`${API}/${id}`);
      setMessage("Employee deleted successfully");
      fetchEmployees();
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Delete failed"
      );
      console.error(error);
    }
  };

  // CANCEL EDIT
  const handleCancel = () => {
    setEditId(null);
    setForm({ name: "", email: "", role: "" });
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>Employees</h1>

      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="role"
          placeholder="Role"
          value={form.role}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editId !== null ? "Update Employee" : "Add Employee"}
        </button>

        {editId !== null && (
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        )}
      </form>

      <h2>Employee List</h2>

      <table
        border="1"
        cellPadding="10"
        style={{ borderCollapse: "collapse", width: "100%" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
              <td>
                <button
                  type="button"
                  onClick={() => handleEdit(employee)}
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(employee.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;