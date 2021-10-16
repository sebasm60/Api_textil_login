import { useState } from 'react';
import axios from 'axios';
import { Formik, ErrorMessage, Field, Form } from 'formik';
import Swal from 'sweetalert2';
import urlConfig from '../../settings/settings';

function Buscar() {

    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <div className="container mt-5 ">
            <h1 className="display-5 mb-4"> Buscar taller </h1>
            <br />
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
                    const res = await axios.post(`http://${urlConfig}:5000/api/getTallerPrenda`, values);

                    const swalBootstrap = Swal.mixin({
                        customClass: {
                            confirmButton: 'btn btn-success',
                            cancelButton: 'btn btn-danger'
                        },
                        buttonsStyling: false
                    });

                    if (res.data.length > 0) {
                        swalBootstrap.fire({
                            title: `Taller ${res.data[0].nit}`,
                            html:
                                '<div class="input-group mb-2">' +
                                '<span class="input-group-text">Nombre</span>' +
                                `<input class="form-control" value=${res.data[0].nombre} disabled></input>` +
                                '</div>' +

                                '<div class="input-group mb-2">' +
                                '<span class="input-group-text">Numero</span>' +
                                `<input class="form-control" value=${res.data[0].numero} disabled></input>` +
                                '</div>'
                        });
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
                            Search
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Buscar;