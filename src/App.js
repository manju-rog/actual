// Our App - now with absence status and buttons!
import React, { useState } from "react";
import "./App.css";

function App() {
  // Our employees now have absence status!
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "John Smith",
      department: "Engineering",
      status: "Present",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      department: "Marketing",
      status: "Absent",
    },
    {
      id: 3,
      name: "Mike Wilson",
      department: "HR",
      status: "Present",
    },
  ]);

  // This function changes an employee's status when button is clicked
  const toggleStatus = (employeeId) => {
    setEmployees(
      employees.map((employee) =>
        employee.id === employeeId
          ? {
              ...employee,
              status: employee.status === "Present" ? "Absent" : "Present",
            }
          : employee
      )
    );
  };

  return (
    <div className="app">
      <h1>My Simple Absence Manager</h1>

      {employees.map((employee) => (
        <div key={employee.id} className="employee-card">
          <h3>{employee.name}</h3>
          <p>Department: {employee.department}</p>
          <p className={`status ${employee.status.toLowerCase()}`}>
            Status: {employee.status}
          </p>
          <button
            onClick={() => toggleStatus(employee.id)}
            className="toggle-btn"
          >
            Mark as {employee.status === "Present" ? "Absent" : "Present"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
