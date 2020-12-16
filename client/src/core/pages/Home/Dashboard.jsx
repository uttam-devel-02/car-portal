import React from "react";
import { Header, LeftMenu, Footer } from '../../layouts';

function Dashboard() {
  // Set Title
  document.title = "Student | Dashboard";

  return (
    <div className="wrapper">
      <Header />
      <LeftMenu />

      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Dashboard</h1>
              </div>

              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><a href="#section">Home</a></li>
                  <li className="breadcrumb-item active">Dashboard</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 col-sm-6 col-md-3">
                <div className="info-box">
                  <span className="info-box-icon bg-info elevation-1"><i className="fas fa-cog"></i></span>

                  <div className="info-box-content">
                    <span className="info-box-text">CPU Traffic</span>
                    <span className="info-box-number">
                      10
                    <small>%</small>
                    </span>
                  </div>
                </div>
              </div>

              <div className="col-12 col-sm-6 col-md-3">
                <div className="info-box mb-3">
                  <span className="info-box-icon bg-danger elevation-1"><i className="fas fa-users"></i></span>

                  <div className="info-box-content">
                    <span className="info-box-text">Syatem Administrator</span>
                    <span className="info-box-number">41,410</span>
                  </div>
                </div>
              </div>

              <div className="clearfix hidden-md-up"></div>

              <div className="col-12 col-sm-6 col-md-3">
                <div className="info-box mb-3">
                  <span className="info-box-icon bg-success elevation-1"><i className="fas fa-users"></i></span>

                  <div className="info-box-content">
                    <span className="info-box-text">Total Cars</span>
                    <span className="info-box-number">760</span>
                  </div>
                </div>
              </div>

              <div className="col-12 col-sm-6 col-md-3">
                <div className="info-box mb-3">
                  <span className="info-box-icon bg-warning elevation-1"><i className="fas fa-users"></i></span>

                  <div className="info-box-content">
                    <span className="info-box-text">Users</span>
                    <span className="info-box-number">2,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;