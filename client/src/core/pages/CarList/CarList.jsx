import React from "react";
import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../constants/Env';
import moment from 'moment';
import swal from 'sweetalert';
import { Header, LeftMenu, Footer } from '../../layouts';


function RawMaterial() {
    // Set Title
    document.title = "Student | Car List";

    var [MaterialListdata, setMaterialListdata] = useState([]);


    //this is for delete data
    function deleteData(Id) {

        swal("Do you want to delete Cars ?", {
            buttons: ['No', 'Yes'],
        }).then((action) => {
            // console.log("Process to change status", action);

            if (action == true) {
                let url = config.apiBaseUrl + "delete";
                axios.post(url, {
                    id:Id
                }).then(function (response) {
                        // console.log(response, '++', 'delete success');
                        swal("Success!", "Delete Car successfully.", "success");

                        materialListdata();
                    })
            }

        });
    }

    //this is for edit data
    function editData(value) {
        window.location.href = '/car-edit/'+value
    }

    function materialListdata() {
        let url = config.apiBaseUrl + "datalist";
        axios.post(url, {
            "condition": {
            }
        }).then(function (response) {
                if (response.data.status == 200) {
                    MaterialListdata = response.data.res;
                    setMaterialListdata(MaterialListdata);
                    // console.log(MaterialListdata);
                } else {
                    var errmsg = response.data.msg;
                    swal("Error!", errmsg, "error");
                }
            })
            .catch(function (error) {
                // console.log(error);
            })
    }


    //this is for list data after page load
 
    useEffect(() => {
        materialListdata();
    }, []);

    return (
        <div className="wrapper">
            <Header />
            <LeftMenu />
            <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0 text-dark">Car List</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">Car List</h3>

                                      
                                    </div>

                                    <div className="card-body table-responsive p-0">
                                        <table className="table table-hover text-nowrap">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Car Name</th>
                                                    <th>Condition</th>
                                                    <th>Drivetrain</th>
                                                    <th>Engine</th>
                                                    <th>Exterior</th>
                                                    <th>Makes</th>
                                                    <th>Added Date</th>
                                                    <th>Model</th>
                                                    <th>Price</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    (MaterialListdata.length == 0) ?
                                                        <tr>
                                                            <td colSpan="7" className="text-center">No Record found</td>
                                                        </tr>
                                                        :
                                                        MaterialListdata.map((element, i) =>
                                                            <tr key={i}>
                                                                <td>{i + 1}</td>
                                                                <td>{element.carname}</td>
                                                                <td>{element.condition}</td>
                                                                <td>{element.drivetrain}</td>
                                                                <td>{element.engine}</td>
                                                                <td>{element.exterior}</td>
                                                                <td>{element.makes}</td>
                                                                <td>{moment(element.created_on).format('YYYY-MM-DD HH:mm:ss')}</td>
                                                                <td>{element.model}</td>
                                                                <td>{element.price}</td>
                                                                <td>
                                                                    <i className="fa fa-edit mr-2 button" onClick={() => editData(element._id)}></i>
                                                                    <i className="fa fa-trash button" onClick={() => deleteData(element._id)}></i>
                                                                </td>
                                                            </tr>
                                                        )
                                                }
                                            </tbody>
                                        </table>
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

export default RawMaterial;