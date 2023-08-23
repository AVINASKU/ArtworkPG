import React, { useState, useEffect } from "react";
import PageLayout from "./components/PageLayout";
import RolesHeader from "./components/UserRoles/RolesHeader";
import Roles from "./components/UserRoles/Roles";
import RoleFooter from "./components/UserRoles/RoleFooter";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { updateUser, updateUserProfile } from "./apis/userApi";

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
  const [userInfo, setUserInfo] = useState();
  const [userGroups, setUserGroups] = useState([]); // Declare userGroups outside of useEffect
  const User = useSelector((state) => state.UserReducer);
  const userInformation = User.userInformation;

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
    updateUserProfile("", "", "");
    setUserInfo();
    localStorage.removeItem("roles");
  };
  useEffect(() => {
    if (userInfo) {
      const roles = userInfo?.ArtworkAgilityPage?.UserGroup?.map((selection) =>
        selection?.UserRole?.map((role) => role?.Name)
      ).flat();

      const BusinessUnit = userInfo?.ArtworkAgilityPage?.UserGroup?.map(
        (selection) => selection?.UserBU?.map((role) => role?.BU_Name)
      ).flat();

      const Regions = userInfo?.ArtworkAgilityPage?.UserGroup?.map(
        (selection) => selection?.UserRegion?.map((role) => role?.Region_Name)
      ).flat();

      if (roles && BusinessUnit && Regions) {
        updateUserProfile(roles, BusinessUnit, Regions);
      }
    }
  }, [userInfo]);
  const handleSubmit = async () => {
    setUserInfo();
    const userGroup = {
      GroupName: "Default",
      UserRegion: selectedRegion.map((region) => ({ Region_Name: region })),
      UserRole: selectedRole.map((role) => ({ Name: role })),
      UserBU: selectedCategory.map((category) => ({ BU_Name: category })),
    };
    // const operatorId = userInformation?.userid?.split("@")[0];
    const data = {
      ArtworkAgilityPage: {
        PM: userInformation?.userid,
        UserGroup: [userGroup],
      },
    };
    setUserInfo(data);
    setDisplayBasic(true);
  };

  const onHide = () => {
    setDisplayBasic(false);
  };
  const onNaviagate = () => {
    setDisplayBasic(false);
    const roles = userInfo?.ArtworkAgilityPage?.UserGroup?.map((selection) =>
      selection?.UserRole?.map((role) => role?.Name)
    ).flat();

    if (roles && roles.includes("project manager")) {
      navigate("/myProjects");
    } else {
      navigate("/allProjects");
    }
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
  useEffect(() => {
    const userGroupsData = userInfo?.ArtworkAgilityPage?.UserGroup;
    setUserGroups(userGroupsData); // Update userGroups state with the retrieved data
  }, [userInfo]);

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
        {userGroups &&
          userGroups.map((group, index) => (
            <ol className="list-roles" key={index}>
              {group.UserRole &&
                group.UserRole.map(
                  (role, roleIndex) =>
                    group.UserBU &&
                    group.UserBU.map(
                      (bu, buIndex) =>
                        group.UserRegion &&
                        group.UserRegion.map(
                          (region, regionIndex) =>
                            roleIndex === buIndex &&
                            buIndex === regionIndex && (
                              <li
                                key={`${roleIndex}-${buIndex}-${regionIndex}`}
                              >
                                <div>
                                  {role.Name},{bu.BU_Name},{region.Region_Name}
                                </div>
                              </li>
                            )
                        )
                    )
                )}
            </ol>
          ))}

        <h6 className="roles-title">Click yes to continue</h6>
      </Dialog>
    </>
  );
}

export default Role;
