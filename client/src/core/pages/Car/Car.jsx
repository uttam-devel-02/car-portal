import React from "react";
import { withRouter } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../constants/Env';
import moment from 'moment';
import swal from 'sweetalert';
import { Header, LeftMenu, Footer } from '../../layouts';
import { Loader } from '../../loader';
import {useParams} from 'react-router-dom';

function Car() {
  // Set Title
  document.title = "Student | Car";

  const [loader, setloader] = useState(false);
  const {carId} = useParams()



  // set data
  var [carname, setcarname] = useState("");
  var [makes, setmakes] = useState("");
  var [model, setmodel] = useState("");
  var [registration, setregistration] = useState("");
  var [mileages, setmileages] = useState("");
  var [condition, setcondition] = useState("");
  var [exterior, setexterior] = useState("");
  var [interior, setinterior] = useState("");
  var [engine, setengine] = useState("");
  var [drivetrain, setdrivetrain] = useState("");
  var [price, setprice] = useState("");
  var [transmission, settransmission] = useState("");
  var [id, setid] = useState("");
  var [buttonText, setbuttonText] = useState('create');


  // set error msg
  var [carnameerr, setcarnameerr] = useState("");
  var [makeserr, setmakeserr] = useState("");
  var [modelerr, setmodelerr] = useState("");
  var [registrationerr, setregistrationerr] = useState("");
  var [mileageserr, setmileageserr] = useState("");
  var [conditionerr, setconditionerr] = useState("");
  var [exteriorerr, setexteriorerr] = useState("");
  var [interiorerr, setinteriorerr] = useState("");
  var [engineerr, setengineerr] = useState("");
  var [drivetrainerr, setdrivetrainerr] = useState("");
  var [priceerr, setpriceerr] = useState("");
  var [transmissionerr, settransmissionerr] = useState("");


  function resetState() {
    setcarnameerr("");
    setmakeserr("");
    setmodelerr("");
    setregistrationerr("");
    setmileageserr("");
    setconditionerr("");
    setexteriorerr("");
    setinteriorerr("");

    setengineerr("");
    setdrivetrainerr("");
    setpriceerr("");
    settransmissionerr("");
    
    setcarname("");
    setmakes("");
    setmodel("");
    setregistration("");
    setmileages("");
    setcondition("");
    setexterior("");
    setinterior("");

    setengine("");
    setdrivetrain("");
    setprice("");
    settransmission("");
  }

  // if(typeof(carId) == 'undefined' ){
  //   // console.log('car++')
  //   // resetState();
  //   // setid('');
  //   // setbuttonText('Create');
  // }

  function submitUserForm(flag) {

    if (flag == 'add') {
      var data = {
        carname: carname,
        makes: makes,
        model: model,
        registration: registration,
        mileages: mileages,
        condition: condition,
        exterior: exterior,
        engine: engine,
        price: price,
        drivetrain: drivetrain,
        transmission: transmission,
        interior: interior
      }
    } else {
      var data = {
        carname: carname,
        makes: makes,
        model: model,
        registration: registration,
        mileages: mileages,
        condition: condition,
        exterior: exterior,
        engine: engine,
        price: price,
        drivetrain: drivetrain,
        transmission: transmission,
        interior: interior,
        id: id
      }
    }
    console.log(data);
    const isValid = formValidation(data);

    if (isValid) {
      let url = config.apiBaseUrl + "addorupdatedata"
      axios.post(url, data = { data })
        .then(function (response) {
          setloader(false);
          if (response.data.status == 'success') {
            if (buttonText == 'create') {
              swal("Success!", "Car added successfully.", "success");
              setTimeout(() => {
                window.location.href='/car-list';
              }, 1000);
            } else {
              swal("Success!", "Car update successfully.", "success");
              setTimeout(() => {
                window.location.href='/car-list';
              }, 1000);
            }
          } else {
            swal("Error!", "Car validation error", "error");
          }
        })
        .catch(function (error) {
          setloader(false);
        })
        .then(function () {
          setloader(false);
        });
    }
  }

  function formValidation(value) {

    var carnameerr = {};
    var makeserr = {};
    var modelerr = {};
    var registrationerr = {};
    var mileageserr = {};
    var conditionerr = {};
    var exteriorerr = {};
    var engineerr = {};
    var priceerr = {};
    var drivetrainerr = {};
    var transmissionerr = {};
    var interiorerr = {};
    let isValid = true;


    if (carname.length < 2) {
      carnameerr.firstnameerrmsg = 'Car name is required';
      isValid = false;
    }

    if (makes.length < 2) {
      makeserr.lastnameerrmsg = 'Make is required';
      isValid = false;
    }

    if (model.length < 2) {
      modelerr.phoneerrmsg = 'Model is required';
      isValid = false;
    }

    if (registration.length < 2) {
      registrationerr.addresserrmsg = 'Registration is required';
      isValid = false;
    }

    if (mileages.length < 2) {
      mileageserr.roleerrmsg = 'Mileages is required';
      isValid = false;
    }

    if (condition.length < 2) {
      conditionerr.emailerrmsg = 'Condition is required';
      isValid = false;
    }

    if (price.length < 2 ) {
      priceerr.emailerrmsg = 'Price is required';
      isValid = false;
    }
    if (transmission.length < 2) {
      transmissionerr.passworderrmsg = 'Transmission is required';
      isValid = false;
    }

    if (drivetrain.length < 2) {
      drivetrainerr.passworderrmsg = 'Drivetrain is requires';
      isValid = false;
    }

    if (exterior.length < 2) {
      exteriorerr.confirmpassworderrmsg = 'Exterior  is required';
      isValid = false;
    }

    if (engine.length < 2) {
      engineerr.passworderrmsg = 'Engine is required';
      isValid = false;
    }

    if (interior.length < 2) {
      interiorerr.passworderrmsg = 'Interior is required';
      isValid = false;
    }


    setcarnameerr(carnameerr);
    setmakeserr(makeserr);
    setmodelerr(modelerr);
    setregistrationerr(registrationerr);
    setmileageserr(mileageserr);
    setconditionerr(conditionerr);
    setexteriorerr(exteriorerr);
    setinteriorerr(interiorerr);

    setengineerr(engineerr);
    setdrivetrainerr(drivetrainerr);
    setpriceerr(priceerr);
    settransmissionerr(transmissionerr);
    return isValid;
  }

  function carListdata() {
    let url = config.apiBaseUrl + "datalist";

    axios.post(url, {
      condition: {
        _id_object:carId
      },
      limit: 10,
      skip: 0
    }).then(function (response) {
      if (response.data.status == 200) {
        setcarname(response.data.res[0].carname);
        setmakes(response.data.res[0].makes);
        setmodel(response.data.res[0].model);
        setregistration(response.data.res[0].registration);
        setmileages(response.data.res[0].mileages);
        setcondition(response.data.res[0].condition);
        setexterior(response.data.res[0].exterior);
        setinterior(response.data.res[0].interior);

        setengine(response.data.res[0].engine);
        setdrivetrain(response.data.res[0].drivetrain);
        setprice(response.data.res[0].price);
        settransmission(response.data.res[0].transmission);
        setbuttonText('update');
        setid(response.data.res[0]._id);
      }
    })
      .catch(function (error) {
        setloader(false);
      });
  }


  useEffect(() => {
    if(typeof carId != 'undefined') {
      carListdata();
    }
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <LeftMenu />

      <Loader loader={loader} />

      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                {
                  buttonText == 'create' ?
                  <h1 className="m-0 text-dark">Create Car</h1>
                  :
                  <h1 className="m-0 text-dark">Update Car</h1>

                }
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  
                </ol>
              </div>
            </div>
          </div>
        </div>

        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card card-success">
          

                  {
                    <form action="/">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>Name*</label>
                              <input type="text" className="form-control"
                                value={carname}
                                onChange={(e) => setcarname(e.target.value)} placeholder="Name" />

                              {
                                Object.keys(carnameerr).map((f) => {
                                  return <p key={f} style={{ color: 'red' }}>{carnameerr[f]}</p>
                                })
                              }

                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-group">
                              <label>Makes*</label>
                              <input type="text" className="form-control"
                                value={makes}
                                onChange={(e) => setmakes(e.target.value)} placeholder="Makes" />

                              {
                                Object.keys(makeserr).map((l) => {
                                  return <p key={l} style={{ color: 'red' }}>{makeserr[l]}</p>
                                })
                              }
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          {
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label>Model*</label>
                                  <input type="text" className="form-control"
                                    value={model}
                                    onChange={(e) => setmodel(e.target.value)} placeholder="Model" />

                                  {
                                    Object.keys(modelerr).map((e) => {
                                      return <p key={e} style={{ color: 'red' }}>{modelerr[e]}</p>
                                    })
                                  }
                                </div>
                              </div>
                          }

                          <div className="col-md-6">
                            <div className="form-group">
                              <label>Registration Dates*</label>
                              <input type="text" className="form-control"
                                value={registration}
                                onChange={(e) => setregistration(e.target.value)} placeholder="Registration Dates" />
                              {
                                Object.keys(registrationerr).map((p) => {
                                  return <p key={p} style={{ color: 'red' }}>{registrationerr[p]}</p>
                                })
                              }
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>Mileages*</label>
                              <input type="text" className="form-control"
                                value={mileages}
                                onChange={(e) => setmileages(e.target.value)} placeholder="Mileages" />
                              {
                                Object.keys(mileageserr).map((a) => {
                                  return <p key={a} style={{ color: 'red' }}>{mileageserr[a]}</p>
                                })
                              }
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-group">
                              <label>Condition*</label>
                              <input type="text" className="form-control"
                                value={condition}
                                onChange={(e) => setcondition(e.target.value)} placeholder="Condition" />
                              {
                                Object.keys(conditionerr).map((p) => {
                                  return <p key={p} style={{ color: 'red' }}>{conditionerr[p]}</p>
                                })
                              }
                            </div>
                          </div>
                        </div>

                        <hr />

                        {
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label>Exterior Color*</label>
                                  <input type="text" className="form-control"
                                    value={exterior}
                                    onChange={(e) => setexterior(e.target.value)} placeholder="Exterior Color" />
                                  {
                                    Object.keys(exteriorerr).map((p) => {
                                      return <p key={p} style={{ color: 'red' }}>{exteriorerr[p]}</p>
                                    })
                                  }
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="form-group">
                                  <label>Interior Color*</label>
                                  <input type="text" className="form-control"
                                    value={interior}
                                    onChange={(e) => setinterior(e.target.value)}
                                    placeholder="Interior Color" />
                                  {
                                    Object.keys(interiorerr).map((c) => {
                                      return <p key={c} style={{ color: 'red' }}>{interiorerr[c]}</p>
                                    })
                                  }
                                </div>
                              </div>

                            </div>
                        }
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>Transmission*</label>
                              <input type="text" className="form-control"
                                value={transmission}
                                onChange={(e) => settransmission(e.target.value)}
                                placeholder="Transmission" />
                              {
                                Object.keys(transmissionerr).map((c) => {
                                  return <p key={c} style={{ color: 'red' }}>{transmissionerr[c]}</p>
                                })
                              }
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>Engine*</label>
                              <input type="text" className="form-control"
                                value={engine}
                                onChange={(e) => setengine(e.target.value)}
                                placeholder="Engine" />
                              {
                                Object.keys(engineerr).map((c) => {
                                  return <p key={c} style={{ color: 'red' }}>{engineerr[c]}</p>
                                })
                              }
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>Drivetrain*</label>
                              <input type="text" className="form-control"
                                value={drivetrain}
                                onChange={(e) => setdrivetrain(e.target.value)}
                                placeholder="Drivetrain" />
                              {
                                Object.keys(drivetrainerr).map((c) => {
                                  return <p key={c} style={{ color: 'red' }}>{drivetrainerr[c]}</p>
                                })
                              }
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>Price*</label>
                              <input type="text" className="form-control"
                                value={price}
                                onChange={(e) => setprice(e.target.value)}
                                placeholder="Price" />
                              {
                                Object.keys(priceerr).map((c) => {
                                  return <p key={c} style={{ color: 'red' }}>{priceerr[c]}</p>
                                })
                              }
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="card-footer">
                        {
                          buttonText == 'create' ?
                            <button type="button" className="btn btn-success" onClick={() =>
                              submitUserForm("add")}>Create</button> :
                            <button type="button" className="btn btn-success" onClick={() =>
                              submitUserForm("edit")}>Update</button>
                        }

                        <button type="button" className="btn btn-success mx-2" onClick={resetState}>Reset</button>
                      </div>
                    </form>
                  }

                </div>

              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}

export default Car;