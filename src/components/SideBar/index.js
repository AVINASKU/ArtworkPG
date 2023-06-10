import React, { useEffect, useState } from "react";
import { Nav, NavItem, Button, FormLabel } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import PgLogo from "../../assets/images/logo.svg";
import ReportsImg from "../../assets/images/projects.svg";
import LogoutImg from "../../assets/images/logout.svg";
import PlusImg from "../../assets/images/plus.svg";
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
import { fetchAccessMatrix } from "../../store/actions/RoleBasedActions";
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
  const User = useSelector((state) => state.UserReducer);
  const userInformation = User.userInformation;
  const [isToggle, setIsToggle] = useState(
    JSON.parse(sessionStorage.getItem("sideBarOpen"))
  );
  const [expandedItems, setExpandedItems] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies();

  useEffect(() => {
    dispatch(fetchAccessMatrix());
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
    window.location.href = "https://awflowdev.pg.com";
  };
  // Replace with the actual location path
  const accessDetails = getAccessDetails(userInformation.role, accessMatrix);

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
            {navItems?.data?.map((item, index) => {
              if (item.items) {
                const pageAccess = accessDetails.pages.find(
                  (page) => page.path === item.url
                );
                if (pageAccess && pageAccess.access.length > 0) {
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
                  return null; // Hide the link if access is empty
                }
              }
            })}

            <div className={!isToggle ? "add-project" : "addProjectExpand"}>
              {projectPlanPage && projectPlanPage.access.length > 0 && (
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
                      <img
                        src={plusCollapseImg}
                        className="collapse-img"
                        alt=""
                      />
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
                  <img src={LogoutImg} className="collapse-img" alt="" />
                ) : (
                  <NavLink to="/" className="nav-link">
                    {isToggle && (
                      <span className="logout">
                        <img src={LogoutImg} alt="logout" />
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
