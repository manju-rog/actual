// Our App - now showing just P, A, V letters like your original!
import React, { useState } from "react";
import "./App.css";

function App() {
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

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri"];

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

  const changeStatus = (employeeId, day, newStatus) => {
    setEmployeeStatus((prev) => ({
      ...prev,
      [employeeId]: {
        ...prev[employeeId],
        [day]: newStatus,
      },
    }));
  };

  // Function to get just the letter (like your original!)
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
      <h1>My Absence Management Grid</h1>

      <div className="calendar-container">
        <div className="calendar-grid">
          {/* Header row */}
          <div className="grid-header">
            <div className="employee-header">Employee</div>
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
                <div className="employee-name">{employee.name}</div>
                <div className="employee-dept">{employee.department}</div>
              </div>

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
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Vacation">Vacation</option>
                  </select>
                  {/* This shows just the letter like your original! */}
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
