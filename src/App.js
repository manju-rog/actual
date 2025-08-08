// Our App - now with professional action buttons like your original!
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

  const monthDays = Array.from({ length: 31 }, (_, i) => i + 1);

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

  // NEW: Track if there are unsaved changes
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const changeStatus = (employeeId, day, newStatus) => {
    setEmployeeStatus((prev) => ({
      ...prev,
      [employeeId]: {
        ...prev[employeeId],
        [day]: newStatus,
      },
    }));
    setHasUnsavedChanges(true); // Mark as having unsaved changes
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

  // NEW: Action button functions
  const handleSaveChanges = () => {
    // Simulate saving to database
    console.log("Saving attendance data...", employeeStatus);
    setHasUnsavedChanges(false);
    alert("✅ Changes saved successfully!");
  };

  const handleExportExcel = () => {
    // Simulate Excel export
    console.log("Exporting to Excel...", employeeStatus);
    alert("📊 Excel file exported successfully!");
  };

  const handleSendEmail = () => {
    // Simulate email sending
    console.log("Sending email summary...");
    alert("📧 Email summary sent successfully!");
  };

  return (
    <div className="app">
      {/* Header Section */}
      <div className="header-section">
        <div className="title-area">
          <h1>🗓️ Absence Management Grid</h1>
          <p>
            Track employee attendance for August 2025 - Click cells to edit,
            then Save Changes
          </p>
        </div>

        {/* NEW: Action Buttons (like your original!) */}
        <div className="action-buttons">
          {hasUnsavedChanges && (
            <div className="unsaved-indicator">⚠️ Unsaved changes</div>
          )}
          <button onClick={handleSendEmail} className="action-btn email-btn">
            📧 Send Email
          </button>
          <button onClick={handleExportExcel} className="action-btn export-btn">
            📊 Export Excel
          </button>
          <button
            onClick={handleSaveChanges}
            className={`action-btn save-btn ${
              hasUnsavedChanges ? "has-changes" : ""
            }`}
          >
            💾 Save Changes
          </button>
        </div>
      </div>

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
