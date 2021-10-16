import { useState } from 'react';
import axios from 'axios';
import { Formik, ErrorMessage, Field, Form } from 'formik';
import Swal from 'sweetalert2';
import urlConfig from '../../settings/settings';

function Delete() {

    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <div className="container mt-5 ">
            <h1 className="display-5 mb-4">Eliminar cliente</h1>
            <Formik
                initialValues={{
                    nit: ''
                }}

                validate={(values) => {
                    const errors = {};

                    if (!values.nit) {
                        errors.nit = 'Por favor ingrese el nit.';
                    } else if (!/^[0-9]+$/.test(values.nit)) {
                        errors.nit = 'Solo se permiten caracteres numericos.'
                    };

                    return errors;
                }}

                onSubmit={async (values, formikBag) => {
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
                            title: `¿Seguro que desea eliminar el registro?`,
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonText: 'Eliminar',
                            text: `Nit: ${res.data[0].nit}`
                        })
                            .then((result) => {
                                if (result.isConfirmed) {
                                    axios.delete(`http://${urlConfig}:5000/api/deleteClientePrenda/${values.nit}`);
                                    swalBootstrap.fire({
                                        title: 'Eliminado',
                                        text: 'Registro borrado correctamente',
                                        icon: 'success'
                                    }).then(result => {
                                        if (result.isConfirmed) {
                                            window.location.reload();
                                        };
                                    });
                                } else {
                                    swalBootstrap.fire({
                                        title: 'Cancelado',
                                        text: 'Tu registro esta seguro :)',
                                        icon: 'error'
                                    });
                                };
                            })
                    } else {
                        Swal.fire({
                            title: 'Error',
                            text: 'Registro no encontrado',
                            icon: 'error'
                        })
                    };

                }}
            >
                {() => (
                    <Form>
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

                        <button
                            type="submit"
                            className={`submit btn btn-primary ${isSubmitting ? 'disabled' : ''}`}
                            disabled={isSubmitting}>
                            Buscar
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Delete;