import React, { useEffect, useState } from "react";
import { Nav, NavItem, Button } from "react-bootstrap";
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
import { useDispatch } from "react-redux";
import { updateMode } from "../../store/actions/ProjectSetupActions";
import { updateUser } from "../../apis/userApi";

const SideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isToggle, setIsToggle] = useState(
    JSON.parse(sessionStorage.getItem("sideBarOpen"))
  );
  const [expandedItems, setExpandedItems] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleSidebar = () => {
    sessionStorage.setItem("sideBarOpen", JSON.stringify(!isToggle));
    setIsToggle(!isToggle);

    // if (expandedIndex) {
    //   setExpandedIndex(null);
    // }
  };
  const sidebarWidth = isToggle ? "112px" : "68px";
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
    navigate("/");
  };
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
  return (
    <>
      <Col
        sm={4}
        className="left-grid"
        style={{
          width: sidebarWidth,
          transition: "width 0.3s ease-in-out",
        }}
      >
        <div className="sidebar">
          <img
            src={!isToggle ? ExpandImg : ExpandImg}
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
                return (
                  <NavItem
                    key={index}
                    className={
                      location.pathname === item.url ||
                      item.items?.some(
                        (subItem) => location.pathname === subItem.url
                      ) ||
                      expandedItems.includes(index)
                        ? "active"
                        : ""
                    }
                  >
                    <NavLink
                      // onClick={() => toggleSubMenu(index)}
                      className={`nav-link ${isToggle && "parent-link"}`}
                      to={item.url}
                    >
                      <div>
                        <img src={item.img} alt="logos" />
                      </div>
                      <div>{isToggle ? item.name : ""}</div>
                    </NavLink>
                    {expandedIndex === index && isToggle && (
                      <ul>
                        {item.items.map((subItem, subIndex) => (
                          <NavItem
                            key={subIndex}
                            className={
                              location.pathname === subItem.url
                                ? "active subactive"
                                : ""
                            }
                          >
                            <NavLink to={subItem.url} className="nav-link">
                              {subItem.name}
                            </NavLink>
                          </NavItem>
                        ))}
                      </ul>
                    )}
                  </NavItem>
                );
              }
            })}
            <div className="add-project">
              <NavItem
                to="/projectPlan"
                state={{ mode: "create" }}
                onClick={() => {
                  dispatch(updateMode("create"));
                }}
              >
                {!isToggle ? (
                  <NavLink
                    to="/projectPlan"
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
                    to="/projectPlan"
                    state={{ mode: "create" }}
                    className="nav-link"
                    onClick={() => {
                      dispatch(updateMode("create"));
                    }}
                  >
                    {/* <Button className="button-layout">
                      <img src={PlusImg} alt={PlusImg} />
                      Create Project
                    </Button> */}
                  </NavLink>
                )}
              </NavItem>
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
