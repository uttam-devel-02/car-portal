import React from "react";
import { Link, withRouter } from "react-router-dom";

function Footer(props) {

  let year = new Date().getFullYear();

  return (
    <footer className="main-footer">
      <strong>Copyright &copy; {year} </strong>
      All rights reserved.
      <div className="float-right d-none d-sm-inline-block">
        <b>Version</b> 1.0.0
      </div>
    </footer>
  );
}

export default Footer;
