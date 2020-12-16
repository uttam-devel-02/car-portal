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


    </nav>
  );
}

export default Header;
