// Our App - now with MONTHLY calendar like your original design!
import React, { useState } from "react";
import "./App.css";

function App() {
  const [employees] = useState([
    { id: 1, name: "Manju", department: "Administrator" },
    { id: 2, name: "Shreyas", department: "Development" },
    { id: 3, name: "Ganesh", department: "Development" },
    { id: 4, name: "Suhas", department: "Development" },
    { id: 5, name: "Anushri", department: "Quality Assurance" },
  ]);

  // Days of the month (like your original!)
  const monthDays = Array.from({ length: 31 }, (_, i) => i + 1);

  // Monthly status data (August 2025 like your screenshot)
  const [employeeStatus, setEmployeeStatus] = useState({
    1: Object.fromEntries(
      monthDays.map((day) => [day, day === 8 ? "Absent" : "Present"])
    ),
    2: Object.fromEntries(
      monthDays.map((day) => [day, day === 15 ? "Vacation" : "Present"])
    ),
    3: Object.fromEntries(monthDays.map((day) => [day, "Present"])),
    4: Object.fromEntries(monthDays.map((day) => [day, "Present"])),
    5: Object.fromEntries(monthDays.map((day) => [day, "Present"])),
  });

  const changeStatus = (employeeId, day, newStatus) => {
    setEmployeeStatus((prev) => ({
      ...prev,
      [employeeId]: {
        ...prev[employeeId],
        [day]: newStatus,
      },
    }));
  };

  const getStatusLetter = (status) => {
    switch (status) {
      case "Present":
        return "P";
      case "Absent":
        return "A";
      case "Vacation":
        return "V";
      default:
        return "P";
    }
  };

  return (
    <div className="app">
      <h1>🗓️ Absence Management Grid</h1>
      <p>
        Track employee attendance for August 2025 - Click cells to edit, then
        Save Changes
      </p>

      <div className="calendar-container">
        <div className="monthly-grid">
          {/* Header row with all month days */}
          <div className="grid-header">
            <div className="employee-header">Employee</div>
            {monthDays.map((day) => (
              <div key={day} className="day-header">
                {day}
              </div>
            ))}
          </div>

          {/* Employee rows */}
          {employees.map((employee) => (
            <div key={employee.id} className="employee-row">
              <div className="employee-info">
                <div className="employee-name">{employee.name}</div>
                <div className="employee-dept">{employee.department}</div>
              </div>

              {monthDays.map((day) => (
                <div key={day} className="day-cell">
                  <select
                    value={employeeStatus[employee.id][day]}
                    onChange={(e) =>
                      changeStatus(employee.id, day, e.target.value)
                    }
                    className="status-select"
                  >
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Vacation">Vacation</option>
                  </select>
                  <div
                    className={`status-badge ${employeeStatus[employee.id][
                      day
                    ].toLowerCase()}`}
                  >
                    {getStatusLetter(employeeStatus[employee.id][day])}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
