import React, { useEffect, useState } from "react";
import { Nav, NavItem } from "react-bootstrap";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import PgLogo from "../../assets/images/logo.svg";
import LogoutImg from "../../assets/images/logout.svg";
import plusCollapseImg from "../../assets/images/plusCollapse.svg";
import ExpandImg from "../../assets/images/expand.svg";
import ArrowDownImg from "../../assets/images/sort.svg";
import AllProjects1 from "../../assets/images/AllProjects1.svg";
import AllTask from "../../assets/images/AllTask.svg";
import MyTaskMP from "../../assets/images/MyTaskMP.svg";
import MyProject from "../../assets/images/MyProject.svg";
import "./index.scss";
import { Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAccessMatrix,
  fetchAccessRoles,
} from "../../store/actions/RoleBasedActions";
import { getAccessDetails, hasAllAccess } from "../../utils";
import { updateMode } from "../../store/actions/ProjectSetupActions";
import { updateUser } from "../../apis/userApi";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { navItems } from "./NavItems";


const SideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { accessMatrix } = useSelector((state) => state?.accessMatrixReducer);
  const { accessRoles } = useSelector((state) => state?.accessMatrixReducer);
  const User = useSelector((state) => state.UserReducer);
  const userInformation = User.userInformation;
  const Role = User?.userProfile;
  const roles = Role?.role || [];
  const [isToggle, setIsToggle] = useState(
    JSON.parse(sessionStorage.getItem("sideBarOpen"))
  );
  const [expandedItems, setExpandedItems] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies();

  const isNoAccess = hasAllAccess();

  useEffect(() => {
    dispatch(fetchAccessMatrix());
    dispatch(fetchAccessRoles());
  }, [dispatch]);
  const toggleSidebar = () => {
    sessionStorage.setItem("sideBarOpen", JSON.stringify(!isToggle));
    setIsToggle(!isToggle);

    // if (expandedIndex) {
    //   setExpandedIndex(null);
    // }
  };
  const sidebarWidth = isToggle ? "100px" : "68px";
  function toggleSubMenu(index) {
    setIsToggle(true);

    setExpandedIndex((prevIndex) => {
      // Collapse the currently expanded sub-menu (if any)
      if (index === prevIndex) {
        return null;
      } else {
        setExpandedItems([index]);
        return index;
      }
    });

    setExpandedItems((prevExpandedItems) => {
      // Toggle the expanded state of the clicked sub-menu
      const isExpanded = prevExpandedItems.includes(index);

      if (isExpanded) {
        return [];
      } else {
        return [index];
      }
    });
  }
  const handleLogout = () => {
    sessionStorage.removeItem("session");
    sessionStorage.removeItem("sideBarOpen");
    updateUser("", "");
    removeCookie("tokenNumber");
    removeCookie("initials");
    removeCookie("userName");
    removeCookie("userInfo");
    removeCookie("LastName");
    removeCookie("region");
    removeCookie("initials");
    removeCookie("FirstName");
    navigate("/");
  };
  // Replace with the actual location path
  const accessDetails = getAccessDetails(userInformation.role, accessMatrix);

  const rolesWithAccess = Array.isArray(accessRoles)
    ? accessRoles.filter((accessRole) => {
        const roleNames = accessRole?.roles?.map((role) => role.name);
        return roleNames?.some((roleName) => roles?.includes(roleName));
      })
    : [];
  // console.log(hasEmptyAccessForMyProjects);
  
  const projectPlanPage = accessDetails.pages.find(
    (page) => page.path === "/projectPlan"
  );
  const pathName = window.location.pathname;

  return (
    <>
      <Col
        sm={4}
        className="left-grid"
        style={{
          width: sidebarWidth,
          padding: 0,
          transition: "width 0.3s ease-in-out",
        }}
      >
        <div className="sidebar">
          <img
            src={ExpandImg}
            alt="logos"
            onClick={toggleSidebar}
            className={!isToggle ? "toggle-collapsed" : "toggle-expanded"}
          />
          <div className="logo">
            <img
              src={PgLogo}
              alt="PG LOGO"
              className={`pg-logo ${!isToggle && "toggle-logo"}`}
            />
            <p className={!isToggle ? "titleCollapse" : "titleExpand"}>
              Artwork Agility Suite
            </p>
          </div>
          <Nav
            style={{
              paddingTop: !isToggle && "15px",
            }}
          >
            {pathName !== "/roles" &&
              navItems?.data?.map((item, index) => {
                if (item.items) {
                  

                  const hasAccess = rolesWithAccess?.some((roleWithAccess) => {
                    return (
                      roleWithAccess.path === item.url &&
                      roleWithAccess.roles.some((role) => {
                        return (
                          roles.includes(role.name) && role.access.length > 0
                        );
                      })
                    );
                  });
                  if (hasAccess) {
                    return (
                      <NavItem
                        key={index}
                        className={
                          item.items?.some(
                            (subItem) => location.pathname === subItem.url
                          ) || expandedItems.includes(index)
                            ? "active"
                            : ""
                        }
                      >
                        <NavLink
                          className={`nav-link ${isToggle && "parent-link"}`}
                          to={item.url}
                        >
                          {isToggle ? (
                            <>
                              <img src={item.img} alt="logos" />
                              <div>{isToggle ? item.name : ""}</div>
                            </>
                          ) : (
                            <OverlayTrigger
                              placement="right"
                              overlay={
                                <Tooltip className="tooltip">
                                  <div className="toolname">{item.name}</div>
                                </Tooltip>
                              }
                            >
                              <div>
                                <img src={item.img} alt="logos" />
                              </div>
                            </OverlayTrigger>
                          )}
                        </NavLink>
                      </NavItem>
                    );
                  } else {
                    return null; // Hide the link if user doesn't have access
                  }
                }
              })}

            <div className={!isToggle ? "add-project" : "addProjectExpand"}>
              {pathName !== "/roles" &&
                rolesWithAccess?.some((roleWithAccess) => {
                  return (
                    roleWithAccess.path === "/projectPlan#ProjectSetup" &&
                    roleWithAccess.roles.some((role) => {
                      return (
                        roles.includes(role.name) && role.access.length > 0
                      );
                    })
                  );
                }) && (
                  <NavItem
                    to="/projectPlan"
                    state={{ mode: "create" }}
                    onClick={() => {
                      dispatch(updateMode("create"));
                    }}
                    className={
                      location.pathname === "projectSetup" ? "active" : ""
                    }
                  >
                    {!isToggle ? (
                      <NavLink
                        to="/projectSetup"
                        state={{ mode: "create" }}
                        className={`nav-link ${isToggle && "parent-link"}`}
                        onClick={() => {
                          dispatch(updateMode("create"));
                        }}
                      >
                        <OverlayTrigger
                          placement="right"
                          overlay={
                            <Tooltip
                              className="tooltip"
                              style={{ marginLeft: "-0.5%" }}
                            >
                              <div className="toolname">Create Project</div>
                            </Tooltip>
                          }
                        >
                          <div>
                            <img src={plusCollapseImg} alt="" />
                          </div>
                        </OverlayTrigger>
                      </NavLink>
                    ) : (
                      <NavLink
                        to="/projectSetup"
                        state={{ mode: "create" }}
                        className={`nav-link ${isToggle && "parent-link"}`}
                        onClick={() => {
                          dispatch(updateMode("create"));
                        }}
                      >
                        <img src={plusCollapseImg} alt="" />
                        <div> Create Project </div>
                      </NavLink>
                    )}
                  </NavItem>
                )}
              <NavItem
                onClick={handleLogout}
                className={location.pathname === "" ? "active" : ""}
              >
                {!isToggle ? (
                  <NavLink
                    to="/"
                    className={`nav-link ${isToggle && "parent-link"}`}
                  >
                    <OverlayTrigger
                      placement="right"
                      overlay={
                        <Tooltip
                          className="tooltip"
                          style={{ marginLeft: "-0.5%" }}
                        >
                          <div className="toolname">Log Out</div>
                        </Tooltip>
                      }
                    >
                      <div>
                        <img src={LogoutImg} alt="" />
                      </div>
                    </OverlayTrigger>
                  </NavLink>
                ) : (
                  <NavLink
                    to="/"
                    className={`nav-link ${isToggle && "parent-link"}`}
                  >
                    {isToggle && (
                      <>
                        <img src={LogoutImg} alt="logout" />
                        <div className={`${!isNoAccess ? "logoutColor" : ""}`}>
                          {" "}
                          Log Out{" "}
                        </div>
                      </>
                    )}
                  </NavLink>
                )}
              </NavItem>
            </div>
          </Nav>
        </div>
      </Col>
      <Outlet context={<><h1>adsfagfdg</h1></>}/>
    </>
  );
};

export default SideBar;
