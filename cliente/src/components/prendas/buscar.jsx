import { useState } from 'react';
import axios from 'axios';
import { Formik, ErrorMessage, Field, Form } from 'formik';
import Swal from 'sweetalert2';
import urlConfig from '../../settings/settings';

function Buscar() {

    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <div className="container mt-5 ">
            <h1 className="display-5 mb-4 text-center"> Buscar prenda </h1>
            <br />
            <Formik
                initialValues={{
                    id_prenda: ''
                }}

                validate={(values) => {
                    const errors = {};

                    if (!values.id_prenda) {
                        errors.id_prenda = 'Por favor ingrese el identificador de la prenda.';
                    } else if (!/^[0-9]+$/.test(values.id_prenda)) {
                        errors.id_prenda = 'Solo se permiten caracteres numericos.'
                    };

                    return errors;
                }}

                onSubmit={async (values, formikBag) => {
                    setIsSubmitting(false);
                    const res = await axios.post(`http://${urlConfig}:5000/api/getprenda`, values);

                    const swalBootstrap = Swal.mixin({
                        customClass: {
                            confirmButton: 'btn btn-success',
                            cancelButton: 'btn btn-danger'
                        },
                        buttonsStyling: false
                    });

                    if (res.data.length > 0) {
                        swalBootstrap.fire({
                            title: `Prenda ${res.data[0].id_prenda}`,
                            html:
                                '<div class="input-group mb-2">' +
                                '<span class="input-group-text">Lote</span>' +
                                `<input class="form-control" value=${res.data[0].lote} disabled></input>` +
                                '</div>' +

                                '<div class="input-group mb-2">' +
                                '<span class="input-group-text">Genero de la prenda</span>' +
                                `<input class="form-control" value=${res.data[0].genero_prenda} disabled></input>` +
                                '</div>' +

                                '<div class="input-group mb-2">' +
                                '<span class="input-group-text">Tipo de prenda</span>' +
                                `<input class="form-control" value=${res.data[0].tipo_prenda} disabled></input>` +
                                '</div>' +

                                '<div class="input-group mb-2">' +
                                '<span class="input-group-text">Talla de la prenda</span>' +
                                `<input class="form-control" value=${res.data[0].talla_prenda} disabled></input>` +
                                '</div>' +

                                '<div class="input-group mb-2">' +
                                '<span class="input-group-text">Muestra fisica</span>' +
                                `<input class="form-control" value=${res.data[0].muestra_fisica} disabled></input>` +
                                '</div>' +

                                '<div class="input-group mb-2">' +
                                '<span class="input-group-text">Tipo de empaque</span>' +
                                `<input class="form-control" value=${res.data[0].tipo_empaque} disabled></input>` +
                                '</div>' +

                                '<div class="input-group mb-2">' +
                                '<span class="input-group-text">Cantidad</span>' +
                                `<input class="form-control" value=${res.data[0].cantidad_existente} disabled></input>` +
                                '</div>' +

                                '<div class="input-group mb-2">' +
                                '<span class="input-group-text">Cliente de la prenda</span>' +
                                `<input class="form-control" value=${res.data[0].cliente_prenda} disabled></input>` +
                                '</div>' +

                                '<div class="input-group mb-2">' +
                                '<span class="input-group-text">Taller de la prenda</span>' +
                                `<input class="form-control" value=${res.data[0].taller_prenda} disabled></input>` +
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
                            <span className="input-group-text">Id  de la prenda</span>
                            <Field
                                className="form-control"
                                name="id_prenda"
                                id="id_prenda"
                                type="text"
                            />
                        </div>
                        <div className="input-group mb-2">
                            <ErrorMessage ErrorMessage name="id_prenda">
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