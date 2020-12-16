import React from "react";
import swal from 'sweetalert';

function Header(props) {

  function logout() {
    swal("Do you want to logout ?", {
      buttons: ['No', 'Yes'],
    }).then((action) => {
      if (action == true) {
        localStorage.removeItem('userDetails')
        window.location.href = '/login'
      }
    });
  }

  function navControl() {
    const body = document.querySelector('body');
    if(body.classList.contains('sidebar-collapse') == true) {
      document.body.classList.remove('sidebar-collapse');
      document.body.classList.remove('sidebar-open');
      document.body.classList.add('sidebar-closed');
    } else {
      document.body.classList.add('sidebar-collapse');
      document.body.classList.add('sidebar-open');
      document.body.classList.remove('sidebar-closed');
    }
  }

  return (
    <nav className="main-header navbar navbar-expand navbar-dark navbar-success">
      
      <ul className="navbar-nav">
        <li className="nav-item">
          {/* <span className="nav-link" onClick={navControl}><i className="fas fa-bars"></i></span> */}
          <a className="nav-link" data-widget="pushmenu" onClick={navControl} role="button">
            <i className="fas fa-bars"></i>
          </a>
        </li>
      </ul>

      <ul className="navbar-nav ml-auto">

        <li className="nav-item dropdown">
          <a href="#section" className="nav-link" data-toggle="dropdown">
            <i className="far fa-bell"></i>
            <span className="badge badge-warning navbar-badge">15</span>
          </a>

          <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <span className="dropdown-item dropdown-header">15 Notifications</span>
            <div className="dropdown-divider"></div>
            <a href="#section" className="dropdown-item">
              <i className="fas fa-envelope mr-2"></i> 4 new messages
              <span className="float-right text-muted text-sm">3 mins</span>
            </a>

            <div className="dropdown-divider"></div>
            
            <a href="#section" className="dropdown-item">
              <i className="fas fa-users mr-2"></i> 8 friend requests
              <span className="float-right text-muted text-sm">12 hours</span>
            </a>

            <div className="dropdown-divider"></div>

            <a href="#section" className="dropdown-item">
              <i className="fas fa-file mr-2"></i> 3 new reports
              <span className="float-right text-muted text-sm">2 days</span>
            </a>

            <div className="dropdown-divider"></div>

            <a href="#section" className="dropdown-item dropdown-footer">See All Notifications</a>
          </div>
        </li>

      </ul>
    </nav>
  );
}

export default Header;
