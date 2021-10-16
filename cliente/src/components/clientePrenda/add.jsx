import { Formik, ErrorMessage, Field, Form } from 'formik';
import { useState } from 'react';
import axios from "axios";
import Swal from 'sweetalert2';
import urlConfig from '../../settings/settings';

function Add(props) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <div className="container mt-5">
            <Formik
                initialValues={{
                    nit: '',
                    nombre: '',
                    numero: ''
                }}

                validate={(values) => {
                    const errors = {};

                    if (!values.nit) {
                        errors.nit = 'Por favor ingrese el nit.';
                    } else if (!/^[0-9]+$/.test(values.nit)) {
                        errors.nit = 'Solo se permiten caracteres numericos.'
                    };

                    if (!values.nombre) {
                        errors.nombre = 'Por favor ingrese el nombre.';
                    } else if (!/^[a-zA-Z]+$/.test(values.nombre)) {
                        errors.nombre = 'Solo se permiten caracteres numericos.'
                    };

                    if (!values.numero) {
                        errors.numero = 'Por favor ingrese el numero.';
                    } else if (!/^[0-9]+$/.test(values.numero)) {
                        errors.numero = 'Solo se permiten caracteres numericos.'
                    };

                    return errors;
                }}

                onSubmit={async (values) => {
                    setIsSubmitting(false);

                    const res = await axios.post(`http://${urlConfig}:5000/api/getClientePrenda`, values);

                    const swalBootstrap = Swal.mixin({
                        customClass: {
                            confirmButton: 'btn btn-success',
                            cancelButton: 'btn btn-danger'
                        },
                        buttonsStyling: false
                    });

                    if (res.data.length > 0) {
                        swalBootstrap.fire({
                            title: 'Error',
                            text: 'El registro ya existe',
                            icon: 'error'
                        });
                    } else {
                        const add = await axios.post(`http://${urlConfig}:5000/api/addClientePrenda`, values);
                        if (add.data.status === 404) {
                            swalBootstrap.fire({
                                title: add.data.message,
                                text: add.data.error + " Status: " + add.data.status,
                                icon: 'error'
                            });
                        } else {
                            swalBootstrap.fire({
                                title: 'Guardado',
                                text: 'Se guardo exitosamente',
                                icon: 'success'
                            }).then(result => {
                                if (result.isConfirmed) {
                                    window.location.reload();
                                };
                            });
                        };
                    };
                }}
            >
                {() => (
                    <Form>
                        <h1 className="display-5 mb-4">Agregar cliente</h1>
                        <div className="input-group mb-2">
                            <span className="input-group-text">Nit</span>
                            <Field
                                className="form-control"
                                name="nit"
                                id="nit"
                                type="text"
                            />
                        </div>
                        <div className="input-group mb-2">
                            <ErrorMessage ErrorMessage name="nit">
                                {message => <div className="alert alert-danger">{message}</div>}
                            </ErrorMessage>
                        </div>


                        <div className="input-group mb-2">
                            <span className="input-group-text">Nombre</span>
                            <Field
                                className="form-control"
                                name="nombre"
                                id="nombre"
                                type="text"
                            />
                        </div>
                        <div className="input-group mb-2">
                            <ErrorMessage ErrorMessage name="nombre">
                                {message => <div className="alert alert-danger">{message}</div>}
                            </ErrorMessage>
                        </div>

                        <div className="input-group mb-2">
                            <span className="input-group-text">Numero</span>
                            <Field
                                type="text"
                                className="form-control"
                                name="numero"
                                id="numero"
                            />
                        </div>
                        <div className="input-group mb-2">
                            <ErrorMessage ErrorMessage name="numero">
                                {message => <div className="alert alert-danger">{message}</div>}
                            </ErrorMessage>
                        </div>

                        <div className="d-grid gap-2">
                            <button
                                type="submit"
                                className={`submit btn btn-primary ${isSubmitting ? 'disabled' : ''}`}
                                disabled={isSubmitting}>
                                Agregar
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Add;