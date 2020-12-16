import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import swal from 'sweetalert';

function LeftMenu(props) {

 function createCar(){
    window.location.href='/car'
  }

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <Link to="/" className="brand-link">
        <img src="/admin-lte-310/dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: .8 }} />
        <span className="brand-text font-weight-light">Student</span>
      </Link>

      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img src="/admin.png" className="img-circle elevation-2" alt="" />
          </div>
          <div className="info">
            <Link to="#" className="d-block">Admin</Link>

            <span>
              <i className="fa fa-circle onactiveclass" aria-hidden="true"></i>
              <span className="textcls" style={{ marginLeft: "5px" }}>Admin</span>
            </span>
          </div>
        </div>

        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

            <li className="nav-item">
              <Link to="/dashboard" className="nav-link">
                <i className="fas fa-tachometer-alt nav-icon"></i>
                <p> Dashboard</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/car-list" className="nav-link">
                <i className="fas fa-car nav-icon"></i>
                <p>Car List</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/car" className="nav-link">
                <i className="fas fa-car nav-icon"></i>
                <p onClick={createCar}>Create Car</p>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default LeftMenu;
