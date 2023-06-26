import React, { useState, useEffect } from "react";
import PageLayout from "./components/PageLayout";
import RolesHeader from "./components/UserRoles/RolesHeader";
import Roles from "./components/UserRoles/Roles";
import RoleFooter from "./components/UserRoles/RoleFooter";
import { useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { updateUser } from "./apis/userApi";
function Role() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [roleCount, setRoleCount] = useState(1);
  const [removedRows, setRemovedRows] = useState([]);
  const [displayUserRole, setdisplayUserRole] = useState(true);
  const [imageOn, setImageOn] = useState(true);
  const [displayBasic, setDisplayBasic] = useState(false);
  const toggleImage = () => {
    setImageOn(!imageOn);
    setdisplayUserRole(!displayUserRole);

    if (imageOn) {
      localStorage.setItem("trainingMode", "on"); // Set local storage value to "on" if image is on
    } else {
      localStorage.setItem("trainingMode", "off"); // Set local storage value to "off" if image is off
    }
  };
  useEffect(() => {
    sessionStorage.removeItem("session");
    updateUser("", "");
  }, []);
  const handleRoleChange = (value) => {
    setSelectedRole(value);
  };
  const addRole = () => {
    setRoleCount((prevCount) => prevCount + 1);
  };
  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const handleRegionChange = (value) => {
    setSelectedRegion(value);
  };

  const handleReset = () => {
    setSelectedRole("");
    setSelectedCategory("");
    setSelectedRegion("");
    setRemovedRows([]);
    localStorage.removeItem("roles");
  };

  const handleSubmit = () => {
    const roles = [];

    for (let i = 0; i < roleCount; i++) {
      if (removedRows.includes(i + 1)) {
        continue; // Skip removed row
      }
      const roleObject = {
        UserID: "chatterjee.pc.2",
        UserBU: selectedCategory[i],
        UserRole: selectedRole[i],
        UserRegion: selectedRegion[i],
      };

      roles.push(roleObject);
    }
    localStorage.setItem("roles", JSON.stringify(roles));
    setDisplayBasic(true);
    // Send POST request
    fetch(
      "https://pegadev.pg.com/prweb/api/ArtworkAgilityFile/v1/updatetraininguserdetails",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ArtworkAgilityTasks: roles,
        }),
      }
    )
      .then((response) => response.json())

      .catch((error) => {
        // Handle any errors that occurred during the request
      });
  };
  const onHide = () => {
    setDisplayBasic(false);
  };
  const onNaviagate = () => {
    setDisplayBasic(false);
    navigate("/myProjects");
  };
  const renderFooter = () => {
    return (
      <div>
        <Button
          label="No"
          onClick={onHide}
          className="button-layout btn btn-secondary"
        />
        <Button
          label="Yes"
          onClick={onNaviagate}
          className="button-layout btn btn-primary"
          autoFocus
        />
      </div>
    );
  };
  const rolesFromLocalStorage = JSON.parse(localStorage.getItem("roles"));
  return (
    <>
      <PageLayout>
        <div className="content-layout" id="tableDiv">
          <div className="tabular-view">
            <div className="roles">
              <div>
                <RolesHeader
                  header="Please Select the Role(s) You Want to Test"
                  addRole={addRole}
                  displayUserRole={displayUserRole}
                  imageOn={imageOn}
                  toggleImage={toggleImage}
                />
                <Roles
                  onRoleChange={handleRoleChange}
                  onCategoryChange={handleCategoryChange}
                  onRegionChange={handleRegionChange}
                  selectedRole={selectedRole}
                  selectedCategory={selectedCategory}
                  selectedRegion={selectedRegion}
                  roleCount={roleCount}
                  removedRows={removedRows}
                  setRemovedRows={setRemovedRows}
                  displayUserRole={displayUserRole}
                />
                <RoleFooter
                  bottomFixed={true}
                  selectedRole={selectedRole}
                  selectedCategory={selectedCategory}
                  selectedRegion={selectedRegion}
                  displayUserRole={displayUserRole}
                  onReset={handleReset}
                  onSubmit={handleSubmit} // Pass the handleReset function as a prop
                />
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
      <Dialog
        header="Switched Roles"
        visible={displayBasic}
        style={{ width: "50vw" }}
        onHide={onHide}
        footer={renderFooter}
      >
        <ul>
          {rolesFromLocalStorage &&
            rolesFromLocalStorage.map((role, index) => (
              <li key={index}>
                <strong>Role:</strong> {role?.UserRole}
                <strong>BU:</strong> {role?.UserBU}
                <strong>Region:</strong> {role?.UserRole}
              </li>
            ))}
        </ul>
        <h6 className="project-title">Click yes to continue</h6>
      </Dialog>
    </>
  );
}

export default Role;
