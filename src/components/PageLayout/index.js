import React from "react";

import { Container, Row, Col } from "react-bootstrap";
import "./index.scss";
import SideBar from "../SideBar";
import Header from "../Headers";
import { Outlet } from "react-router-dom";
import RoutesNav from "../../routesNav";

const PageLayout = (props) => {
  const pathname = window.location.pathname;
  const isPath = pathname.includes("tab");
  const className = `wrapper ${isPath ? "tab-wrapper" : ""}`;
  return (
    <>
    
      <Container fluid>
        <Row className="row-fluid">
          <SideBar />
          <Col sm={8} className="right-grid">
            <div className="header-container">
              <Header />
            </div>
            <div className="main-container">
              {/* <div className={className}>{props.children}</div> */}
              <RoutesNav />
              {/* Minim sint enim cillum voluptate proident ut ex eu. */}
              <Outlet  />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default PageLayout;
