import React, { useState, useEffect } from "react";
import "./Roles.scss";
import Accordion from "react-bootstrap/Accordion";

const Roles = ({
  onRoleChange,
  onCategoryChange,
  onRegionChange,
  selectedRole,
  selectedCategory,
  selectedRegion,
  roleCount,
  removedRows,
  displayUserRole,
  setRemovedRows,
}) => {
  const [selectedRoles, setSelectedRoles] = useState(selectedRole);
  const [selectedCategories, setSelectedCategories] =
    useState(selectedCategory);
  const [selectedRegions, setSelectedRegions] = useState(selectedRegion);
  useEffect(() => {
    setSelectedRoles(selectedRole);
    setSelectedCategories(selectedCategory);
    setSelectedRegions(selectedRegion);
  }, [selectedRole, selectedCategory, selectedRegion]);
  const handleRoleChange = (e, rowIndex) => {
    const newSelectedRoles = [...selectedRoles];
    newSelectedRoles[rowIndex - 1] = e.target.value;
    setSelectedRoles(newSelectedRoles);
    onRoleChange(newSelectedRoles); // Pass the updated state value
  };

  const handleCategoryChange = (e, rowIndex) => {
    const newSelectedCategories = [...selectedCategories];
    newSelectedCategories[rowIndex - 1] = e.target.value;
    setSelectedCategories(newSelectedCategories);
    onCategoryChange(newSelectedCategories); // Pass the updated state value
  };

  const handleRegionChange = (e, rowIndex) => {
    const newSelectedRegions = [...selectedRegions];
    newSelectedRegions[rowIndex - 1] = e.target.value;
    setSelectedRegions(newSelectedRegions);
    onRegionChange(newSelectedRegions); // Pass the updated state value
  };
  const handleRemove = (rowIndex) => {
    setRemovedRows((prevRemovedRows) => [...prevRemovedRows, rowIndex]);
  };

  const renderRoles = () => {
    const roles = [];

    for (let i = 1; i <= roleCount; i++) {
      if (removedRows.includes(i)) {
        continue; // Skip rendering the removed row
      }

      roles.push(
        <Accordion.Item eventKey={i.toString()} key={`role${i}`}>
          <Accordion.Header>
            {`Role${i}`}
            {i > 1 && ( // Condition to show the "Remove Row" button from the second row onwards
              <button onClick={() => handleRemove(i)}>Remove Row</button>
            )}
          </Accordion.Header>
          <Accordion.Body>
            <div className="p-datatable-wrapper">
              <table className="p-datatable-table p-datatable-scrollable-table p-datatable-resizable-table">
                <thead>
                  <tr>
                    <th>Role Name</th>
                    <th>Category</th>
                    <th>Region</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="role-details">
                        <h4>Project Manager</h4>
                        <input
                          type="radio"
                          name={`roleButton${i}`}
                          value="ProjectManager"
                          checked={selectedRoles[i - 1] === "ProjectManager"}
                          onChange={(e) => handleRoleChange(e, i)}
                          disabled={displayUserRole}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="role-details">
                        <h4>Baby Care</h4>
                        <input
                          type="radio"
                          name={`categoryButton${i}`}
                          value="Baby Care"
                          checked={selectedCategories[i - 1] === "Baby Care"}
                          onChange={(e) => handleCategoryChange(e, i)}
                          disabled={displayUserRole}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="role-details">
                        <h4>Europe</h4>
                        <input
                          type="radio"
                          name={`regionButton${i}`}
                          value="Europe"
                          checked={selectedRegions[i - 1] === "Europe"}
                          onChange={(e) => handleRegionChange(e, i)}
                          disabled={displayUserRole}
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="role-details">
                        <h4>Task Owner</h4>
                        <input
                          type="radio"
                          name={`roleButton${i}`}
                          value="TaskOwner"
                          checked={selectedRoles[i - 1] === "TaskOwner"}
                          onChange={(e) => handleRoleChange(e, i)}
                          disabled={displayUserRole}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="role-details">
                        <h4>Home Care</h4>
                        <input
                          type="radio"
                          name={`categoryButton${i}`}
                          value="Home Care"
                          checked={selectedCategories[i - 1] === "Home Care"}
                          onChange={(e) => handleCategoryChange(e, i)}
                          disabled={displayUserRole}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="role-details">
                        <h4>North America</h4>
                        <input
                          type="radio"
                          name={`regionButton${i}`}
                          value="North America"
                          checked={selectedRegions[i - 1] === "North America"}
                          onChange={(e) => handleRegionChange(e, i)}
                          disabled={displayUserRole}
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="role-details">
                        <h4>External Task Owner</h4>
                        <input
                          type="radio"
                          name={`roleButton${i}`}
                          value="ExternalTaskOwner"
                          checked={selectedRoles[i - 1] === "ExternalTaskOwner"}
                          onChange={(e) => handleRoleChange(e, i)}
                          disabled={displayUserRole}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="role-details">
                        <h4>Oral Care</h4>
                        <input
                          type="radio"
                          name={`categoryButton${i}`}
                          value="Oral Care"
                          checked={selectedCategories[i - 1] === "Oral Care"}
                          onChange={(e) => handleCategoryChange(e, i)}
                          disabled={displayUserRole}
                        />
                      </div>
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>
                      <div className="role-details">
                        <h4>Capacity Manager</h4>
                        <input
                          type="radio"
                          name={`roleButton${i}`}
                          value="CapacityManager"
                          checked={selectedRoles[i - 1] === "CapacityManager"}
                          onChange={(e) => handleRoleChange(e, i)}
                          disabled={displayUserRole}
                        />
                      </div>
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      );
    }

    return roles;
  };

  return (
    <Accordion defaultActiveKey={["1"]} alwaysOpen={true}>
      {renderRoles()}
    </Accordion>
  );
};

export default Roles;
