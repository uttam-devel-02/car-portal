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

    var [materialName, setmaterialName] = useState("");
    var [precio, setprecio] = useState("");
    var [proveedor, setproveedor] = useState("");
    var [presentacion, setpresentacion] = useState("");
    var [cantidad, setcantidad] = useState("");
    var [unidad, setunidad] = useState("");
    var [unidadMetrica, setunidadMetrica] = useState("");
    var [fechaCompra, setfechaCompra] = useState("");
    var [status, setstatus] = useState(true);
    var [id, setid] = useState("");

    var [buttonText, setbuttonText] = useState('create');
    var [showform, setshowform] = useState('hide');
    var [searchstring, setsearchstring] = useState('');
    var [UserData, getUserData] = useState(JSON.parse(localStorage.getItem('userDetails')));
    var [MaterialListdata, setMaterialListdata] = useState([]);

    var [eventerr, seteventerr] = useState({})


    function resetState() {

        setmaterialName("");
        setprecio("");
        setproveedor("");
        setpresentacion("");
        setcantidad("");
        setunidad("");
        setunidadMetrica("");
        setfechaCompra("");
        resetMaterialValidation();
    }

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


    function statusupdate(data) {
        // console.log(data);

        swal("Do you want to update status ?", {
            buttons: ['No', 'Yes'],
        }).then((action) => {
            // console.log("Process to change status", action);

            if (action == true) {

                let url = config.apiBaseUrl + "raw-material/status-update";
                axios.post(url, {
                    condition: {
                        _id: data._id,
                        status: data.status == 0 ? 1 : 0
                    }
                }).then(function (response) {
                        // console.log(response, '++', 'update success');
                        swal("Success!", "Update status successfully.", "success");

                        materialListdata();
                    })
            }

        });
    }


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

    function search() {
        // console.log(searchstring, 'search')
        let url = config.apiBaseUrl + "datalist";
        axios.post(url, {
            condition: {
                tags: {
                    $regex: searchstring.toLowerCase()
                }
            },
            limit: 10,
            skip: 0
        }).then(function (response) {
                if (response.data.status == true) {
                    MaterialListdata = response.data.data;
                    setMaterialListdata(MaterialListdata);
                    // console.log(MaterialListdata);
                }
            })
            .catch(function (error) {
                // console.log(error);
            })


    }

    function reset() {
        setsearchstring('');
        MaterialListdata();
    }


    function resetMaterialValidation() {
        eventerr = {
            materialNameerr: '',
            precioerr: '',
            proveedorerr: '',
            presentacionerr: '',
            cantidaderr: '',
            unidaderr: '',
            unidadMetricaerr: '',
            fechaCompraerr: ''
        }
        seteventerr(eventerr);


    }


    function formValidation() {

        let isValid = true;
        eventerr = {
            materialNameerr: '',
            precioerr: '',
            proveedorerr: '',
            presentacionerr: '',
            cantidaderr: '',
            unidaderr: '',
            unidadMetricaerr: '',
            fechaCompraerr: ''
        }

        if (materialName == '') {
            eventerr.materialNameerr = 'Material Name is required';
            isValid = false;
        }
        if (precio == '') {
            eventerr.precioerr = 'Precio is required';
            isValid = false;
        }
        if (proveedor == '') {
            eventerr.proveedorerr = 'Proveedor is required';
            isValid = false;
        }
        if (presentacion == '') {
            eventerr.presentacionerr = 'Presentacion is required';
            isValid = false;
        }

        if (cantidad == '') {
            eventerr.cantidaderr = 'Cantidad is required';
            isValid = false;
        }

        if (unidad == '') {
            eventerr.unidaderr = 'Unidad is required';
            isValid = false;
        }


        if (unidadMetrica == '') {
            eventerr.unidadMetricaerr = 'Unidad Metrica is required';
            isValid = false;
        }

        if (fechaCompra == '') {
            eventerr.fechaCompraerr = 'Fecha Compra is required';
            isValid = false;
        }

        seteventerr(eventerr);

        return isValid;
    }


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