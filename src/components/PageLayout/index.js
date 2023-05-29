import React, { useState } from "react";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import { Container, Row, Col } from "react-bootstrap";
import "./index.scss";
import SideBar from "../SideBar";
import Header from "../Headers";
import AddProject from "../Projects/CreateProject";
import ProjectPlanCompo from "../Projects/ProjectPlan/ProjectPlanCompo";
import { useSelector } from "react-redux";
import TabsComponent from "./tabsComponent";

const PageLayout = (props) => {
  const [tabName, setTabName] = useState("ProjectSetup");
  const [tabNameForPP, setTabNameForPP] = useState("Design");
  console.log("tabName:", tabName);

  // Project Setup Start
  const projectSetup = useSelector((state) => state.ProjectSetupReducer);
  const selectedProjectDetails = projectSetup.selectedProject;
  const { mode, rootBreadCrumb } = projectSetup;
  // Project Setup End

  const items = [
    {
      name: "ProjectSetup",
      tabNameForDisplay: "Project Setup",
      component: <AddProject {...props} setTabName={setTabName} />,
    },
    {
      name: "Project Plan",
      tabNameForDisplay: "Project Plan",
      component: (
        <>
          <div className="mt-3">
            <nav>
              <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <button
                  className={`nav-link ${
                    tabNameForPP === "Design" ? "active" : ""
                  }`}
                  onClick={() => setTabNameForPP("Design")}
                  id="nav-design-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-design"
                  type="button"
                  role="tab"
                  aria-controls="nav-design"
                  aria-selected="true"
                >
                  Design
                </button>
                <button
                  className={`nav-link ${
                    tabNameForPP === "Input" ? "active" : ""
                  }`}
                  onClick={() => setTabNameForPP("Input")}
                  id="nav-input-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-input"
                  type="button"
                  role="tab"
                  aria-controls="nav-input"
                  aria-selected="true"
                >
                  Input
                </button>
                <button
                  className={`nav-link ${
                    tabNameForPP === "FAAssembly" ? "active" : ""
                  }`}
                  onClick={() => setTabNameForPP("FAAssembly")}
                  id="nav-fAAssembly-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-fAAssembly"
                  type="button"
                  role="tab"
                  aria-controls="nav-fAAssembly"
                  aria-selected="false"
                >
                  FA Assembly
                </button>
              </div>
            </nav>
          </div>
          <div className="tab-content" id="nav-tabContent">
            <div
              className={`tab-pane fade ${
                tabNameForPP === "Design" ? "show active" : ""
              }`}
              id="nav-design"
              role="tabpanel"
              aria-labelledby="nav-design-tab"
            >
              <ProjectPlanCompo />
            </div>
            <div
              className={`tab-pane fade ${
                tabNameForPP === "Input" ? "show active" : ""
              }`}
              id="nav-input"
              role="tabpanel"
              aria-labelledby="nav-input-tab"
            >
              Input Data
            </div>
            <div
              className={`tab-pane fade ${
                tabNameForPP === "FAAssembly" ? "show active" : ""
              }`}
              id="nav-fAAssembly"
              role="tabpanel"
              aria-labelledby="nav-fAAssembly-tab"
            >
              FA Assembly Data
            </div>
          </div>
        </>
      ),
    },
    {
      name: "ArtworkAlignment",
      tabNameForDisplay: "Artwork Alignment",
      component: <>Artwork Alignment Data</>,
    },
    {
      name: "Mapping",
      tabNameForDisplay: "Mapping",
      component: <>Mapping Data</>,
    },
    {
      name: "ReadinessPerPMP",
      tabNameForDisplay: "Readiness Per PMP",
      component: <>Readiness Per PMP Data</>,
    },
  ];

  return (
    <ThemeProvider
      breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
      minBreakpoint="xxs"
    >
      <Container fluid>
        <Row className="row-fluid">
          <SideBar />
          <Col sm={8} className="right-grid">
            <div className="header-container">
              <Header />
            </div>
            <div className="main-container">
              <div className="wrapper">
                <TabsComponent
                  tabName={tabName}
                  setTabName={setTabName}
                  items={items}
                />
              </div>
              {/* <div className="wrapper">{props.children}</div> */}
            </div>
          </Col>
        </Row>
      </Container>
    </ThemeProvider>
  );
};
export default PageLayout;
