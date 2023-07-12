import React, { useEffect, useState } from "react";
import { Nav, NavItem } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
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
import { getAccessDetails } from "../../utils";
import { updateMode } from "../../store/actions/ProjectSetupActions";
import { updateUser } from "../../apis/userApi";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { useCookies } from "react-cookie";

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
  const navItems = {
    data: [
      {
        name: "My Projects",
        img: MyProject,
        arrowUp: ArrowDownImg,
        url: "/myProjects",
        items: [{ name: "My Projects", url: "/myProjects" }],
      },
      {
        name: "All Projects",
        img: AllProjects1,
        arrowUp: ArrowDownImg,
        url: "/allProjects",
        items: [{ name: "All Projects", url: "/allProjects" }],
      },
      {
        name: "My Tasks",
        img: MyTaskMP,
        arrowUp: ArrowDownImg,
        url: "/MyTasks",
        items: [{ name: "My Tasks", url: "Mytasks" }],
      },
      {
        name: "All Tasks",
        img: AllTask,
        arrowUp: ArrowDownImg,
        url: "/AllTasks",
        items: [{ name: "All Tasks", url: "AllTasks" }],
      },
    ],
  };
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
                  //single user access
                  // const pageAccess = accessDetails.pages.find(
                  //   (page) => page.path === item.url
                  // );
                  // if (pageAccess && pageAccess.access.length > 0) {
                  //   return (
                  //     <NavItem
                  //       key={index}
                  //       className={
                  //         item.items?.some(
                  //           (subItem) => location.pathname === subItem.url
                  //         ) || expandedItems.includes(index)
                  //           ? "active"
                  //           : ""
                  //       }
                  //     >
                  //       <NavLink
                  //         className={`nav-link ${isToggle && "parent-link"}`}
                  //         to={item.url}
                  //       >
                  //         {isToggle ? (
                  //           <>
                  //             <div>
                  //               <img src={item.img} alt="logos" />
                  //             </div>
                  //             <div>{isToggle ? item.name : ""}</div>
                  //           </>
                  //         ) : (
                  //           <OverlayTrigger
                  //             placement="right"
                  //             overlay={
                  //               <Tooltip className="tooltip">
                  //                 <div className="toolname">{item.name}</div>
                  //               </Tooltip>
                  //             }
                  //           >
                  //             <div>
                  //               <img src={item.img} alt="logos" />
                  //             </div>
                  //           </OverlayTrigger>
                  //         )}
                  //       </NavLink>
                  //     </NavItem>
                  //   );
                  // } else {
                  //   return null; // Hide the link if access is empty
                  // }

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
                              <div>
                                <img src={item.img} alt="logos" />
                              </div>
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
                  >
                    {!isToggle ? (
                      <NavLink
                        to="/projectPlan#ProjectSetup"
                        state={{ mode: "create" }}
                        className="nav-link"
                        onClick={() => {
                          dispatch(updateMode("create"));
                        }}
                      >
                        <OverlayTrigger
                          placement="right"
                          overlay={
                            <Tooltip className="tooltip">
                              <div className="toolname">Create Project</div>
                            </Tooltip>
                          }
                        >
                          <div>
                            <img
                              src={plusCollapseImg}
                              className="collapse-img"
                              alt=""
                            />
                          </div>
                        </OverlayTrigger>
                      </NavLink>
                    ) : (
                      <NavLink
                        to="/projectPlan#ProjectSetup"
                        state={{ mode: "create" }}
                        className="nav-link"
                        onClick={() => {
                          dispatch(updateMode("create"));
                        }}
                      >
                        <img
                          src={plusCollapseImg}
                          className="collapse-img"
                          alt=""
                        />
                        <p className="create"> Create Project </p>
                      </NavLink>
                    )}
                  </NavItem>
                )}
              <NavItem onClick={handleLogout}>
                {!isToggle ? (
                  <NavLink to="/" className="nav-link">
                    <OverlayTrigger
                      placement="right"
                      overlay={
                        <Tooltip className="tooltip">
                          <div className="toolname">Log out</div>
                        </Tooltip>
                      }
                    >
                      <div>
                        <img src={LogoutImg} className="collapse-img" alt="" />
                      </div>
                    </OverlayTrigger>
                  </NavLink>
                ) : (
                  // <img src={LogoutImg} className="collapse-img" alt="" />
                  <NavLink to="/" className="nav-link">
                    {isToggle && (
                      <span className="logout">
                        <img src={LogoutImg} alt="logout" />
                        <p className="create"> Log out </p>
                      </span>
                    )}
                  </NavLink>
                )}
              </NavItem>
            </div>
          </Nav>
        </div>
      </Col>
      {/* <AddProject visible={visible} setVisible={setVisible} /> */}
    </>
  );
};

export default SideBar;
