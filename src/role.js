import React, { useState } from "react";
import PageLayout from "./components/PageLayout";
import RolesHeader from "./components/UserRoles/RolesHeader";
import Roles from "./components/UserRoles/Roles";
import RoleFooter from "./components/UserRoles/RoleFooter";

function Role() {
  const [selectedRole, setSelectedRole] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState([]);
  const [roleCount, setRoleCount] = useState(1);

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
    setSelectedRole([]);
    setSelectedCategory([]);
    setSelectedRegion([]);
  };
  const handleSubmit = (r) => {
    const role = {
      name: selectedRole,
      bu: selectedCategory,
      region: selectedRegion,
    };

    const roles = role.name ? [role] : []; // Check if selectedRole is not empty before creating the roles array

    console.log(roles);
  };
  return (
    <PageLayout>
      <div className="content-layout" id="tableDiv">
        <div className="tabular-view">
          <div className="roles">
            <div>
              <RolesHeader
                header="Please Select the Role(s) You Want to Test"
                addRole={addRole}
              />
              <Roles
                onRoleChange={handleRoleChange}
                onCategoryChange={handleCategoryChange}
                onRegionChange={handleRegionChange}
                selectedRole={selectedRole}
                selectedCategory={selectedCategory}
                selectedRegion={selectedRegion}
                roleCount={roleCount}
              />
              <RoleFooter
                bottomFixed={true}
                selectedRole={selectedRole}
                selectedCategory={selectedCategory}
                selectedRegion={selectedRegion}
                onReset={handleReset}
                onSubmit={handleSubmit} // Pass the handleReset function as a prop
              />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default Role;
