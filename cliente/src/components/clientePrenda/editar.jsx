import { useState } from 'react';
import axios from 'axios';
import { Formik, Field, Form } from 'formik';
import Swal from 'sweetalert2';
import urlConfig from '../../settings/settings';

function Editar(props) {

    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <div className="container mt-5 ">
            <h1 className="display-5 mb-4"> Editar cliente</h1>
            <br />
            <Formik
                initialValues={{
                    nit: ''
                }}

                validate={(values) => {
                    const errors = {};

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
                            title: `Cliente ${res.data[0].nit}`,
                            showCancelButton: true,
                            confirmButtonText: 'Actualizar',
                            html:
                                '<div class="input-group mb-2">' +
                                '<span class="input-group-text">Nombre</span>' +
                                `<input class="form-control" id="swal-nombre" value=${res.data[0].nombre}></input>` +
                                '</div>' +

                                '<div class="input-group mb-2">' +
                                '<span class="input-group-text">Numero</span>' +
                                `<input class="form-control" id="swal-numero" value=${res.data[0].numero}></input>` +
                                '</div>',

                            focusConfirm: false,
                            preConfirm: () => {
                                return [
                                    document.getElementById('swal-nombre').value,
                                    document.getElementById('swal-numero').value,
                                    values.nit
                                ]
                            }
                        })
                            .then(async (result) => {
                                if (result.isConfirmed) {
                                    await axios.put(`http://${urlConfig}:5000/api/updateClientePrenda`, {
                                        nombre: result.value[0],
                                        numero: result.value[1],
                                        nit: values.nit
                                    });
                                    swalBootstrap.fire({
                                        title: 'Guardado',
                                        text: 'Cambios realizados',
                                        icon: 'success'
                                    }).then(result => {
                                        if (result.isConfirmed) window.location.reload();
                                    })
                                } else {
                                    swalBootstrap.fire({
                                        title: 'Cancelado',
                                        text: 'No se realizaron cambios',
                                        icon: 'error'
                                    });
                                }
                            });
                    } else {
                        swalBootstrap.fire({
                            title: 'Error',
                            text: 'Registro no encontrado',
                            icon: 'error'
                        });
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

                        <button
                            type="submit"
                            className={`submit btn btn-primary ${isSubmitting ? 'disabled' : ''}`}
                            disabled={isSubmitting}>
                            Search
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Editar;