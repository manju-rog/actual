// Our App - now with a calendar grid view!
import React, { useState } from "react";
import "./App.css";

function App() {
  // Let's add dates to track absences across days
  const [employees] = useState([
    {
      id: 1,
      name: "John Smith",
      department: "Engineering",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      department: "Marketing",
    },
    {
      id: 3,
      name: "Mike Wilson",
      department: "HR",
    },
  ]);

  // Simple week days for our calendar
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  // Employee status for each day (this is like a mini database!)
  const [employeeStatus, setEmployeeStatus] = useState({
    1: {
      Mon: "Present",
      Tue: "Present",
      Wed: "Absent",
      Thu: "Present",
      Fri: "Vacation",
    },
    2: {
      Mon: "Absent",
      Tue: "Present",
      Wed: "Present",
      Thu: "Vacation",
      Fri: "Present",
    },
    3: {
      Mon: "Present",
      Tue: "Vacation",
      Wed: "Present",
      Thu: "Present",
      Fri: "Absent",
    },
  });

  // Function to change status for a specific employee on a specific day
  const changeStatus = (employeeId, day, newStatus) => {
    setEmployeeStatus((prev) => ({
      ...prev,
      [employeeId]: {
        ...prev[employeeId],
        [day]: newStatus,
      },
    }));
  };

  return (
    <div className="app">
      <h1>My Absence Management Grid</h1>

      <div className="calendar-grid">
        {/* Header row with days */}
        <div className="grid-header">
          <div className="employee-name-header">Employee</div>
          {weekDays.map((day) => (
            <div key={day} className="day-header">
              {day}
            </div>
          ))}
        </div>

        {/* Employee rows */}
        {employees.map((employee) => (
          <div key={employee.id} className="employee-row">
            <div className="employee-info">
              <strong>{employee.name}</strong>
              <br />
              <small>{employee.department}</small>
            </div>

            {/* Status for each day */}
            {weekDays.map((day) => (
              <div key={day} className="day-cell">
                <select
                  value={employeeStatus[employee.id][day]}
                  onChange={(e) =>
                    changeStatus(employee.id, day, e.target.value)
                  }
                  className={`status-select ${employeeStatus[employee.id][
                    day
                  ].toLowerCase()}`}
                >
                  <option value="Present">P</option>
                  <option value="Absent">A</option>
                  <option value="Vacation">V</option>
                </select>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
