import { Formik, ErrorMessage, Field, Form } from 'formik';
import { useState } from 'react';
import axios from "axios";
import Swal from 'sweetalert2';
import urlConfig from '../../settings/settings';

function AddPrenda(props) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <div className="container mt-5">
            <Formik
                initialValues={{
                    id_prenda: '',
                    lote: '',
                    genero_prenda: '',
                    tipo_prenda: '',
                    talla_prenda: '',
                    muestra_fisica: '',
                    tipo_empaque: '',
                    cantidad_existente: '',
                    cliente_prenda: '',
                    taller_prenda: ''
                }}

                validate={(values) => {
                    const errors = {};

                    if (!values.id_prenda) {
                        errors.id_prenda = 'Por favor ingrese el identificador de la prenda.';
                    } else if (!/^[0-9]+$/.test(values.id_prenda)) {
                        errors.id_prenda = 'Solo se permiten caracteres numericos.'
                    };

                    if (!values.lote) {
                        errors.lote = 'Por favor ingrese el lote de la prenda.';
                    } else if (!/^[0-9]+$/.test(values.lote)) {
                        errors.lote = 'Solo se permiten caracteres numericos.'
                    };

                    for (let i = 0; i < props.prendas.length; i++) {
                        if (values.lote == props.prendas[i].lote) {
                            errors.lote = 'El lote ingresado ya existe, por favor valide.';
                        };
                    };

                    if (values.genero_prenda === "") {
                        errors.genero_prenda = 'Por favor seleccione un genero.';
                    };

                    if (values.muestra_fisica === "") {
                        errors.muestra_fisica = 'Por favor seleccione si existe muestra fisica.';
                    };

                    if (values.cliente_prenda === "") {
                        errors.cliente_prenda = 'Por favor seleccione un cliente.';
                    };

                    if (values.taller_prenda === "") {
                        errors.taller_prenda = 'Por favor seleccione un taller.';
                    };

                    if (values.tipo_empaque === "") {
                        errors.tipo_empaque = 'Por favor seleccione un tipo de empaque.';
                    };

                    if (values.tipo_prenda === "") {
                        errors.tipo_prenda = 'Por favor ingrese el tipo de la prenda.';
                    };

                    if (!values.talla_prenda) {
                        errors.talla_prenda = 'Por favor ingrese la talla de la prenda.';
                    } else if (!/^[0-9]+$/.test(values.talla_prenda)) {
                        errors.talla_prenda = 'Solo se permiten caracteres numericos.'
                    };

                    if (!values.cantidad_existente) {
                        errors.cantidad_existente = 'Por favor ingrese la cantidad de la prenda.';
                    } else if (!/^[0-9]+$/.test(values.cantidad_existente)) {
                        errors.cantidad_existente = 'Solo se permiten caracteres numericos.'
                    };
                    return errors;
                }}

                onSubmit={async (values) => {
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
                            title: 'Error',
                            text: 'El registro ya existe',
                            icon: 'error'
                        });
                    } else {
                        const add = await axios.post(`http://${urlConfig}:5000/api/addPrenda`, values);
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
                        <h1 className="display-5 mb-4">Agregar prenda</h1>
                        <div className="input-group mb-2">
                            <span className="input-group-text">Id de la prenda</span>
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


                        <div className="input-group mb-2">
                            <span className="input-group-text">Lote</span>
                            <Field
                                className="form-control"
                                name="lote"
                                id="lote"
                                type="text"
                            />
                        </div>
                        <div className="input-group mb-2">
                            <ErrorMessage ErrorMessage name="lote">
                                {message => <div className="alert alert-danger">{message}</div>}
                            </ErrorMessage>
                        </div>

                        <div className="input-group mb-2">
                            <span className="input-group-text">Genero de la prenda</span>
                            <Field
                                component="select"
                                className="form-select"
                                name="genero_prenda"
                                id="genero_prenda"
                            >
                                <option value="">  </option>
                                <option value="Masculino">Masculino</option>
                                <option value="Femenino">Femenino</option>
                            </Field>
                        </div>
                        <div className="input-group mb-2">
                            <ErrorMessage ErrorMessage name="genero_prenda">
                                {message => <div className="alert alert-danger">{message}</div>}
                            </ErrorMessage>
                        </div>

                        <div className="input-group mb-2">
                            <span className="input-group-text">Tipo de prenda</span>
                            <Field
                                className="form-select"
                                name="tipo_prenda"
                                id="tipo_prenda"
                                component="select"
                            >
                                <option value="">  </option>
                                <option value="Vestidos">Vestidos</option>
                                <option value="Pantalones">Pantalones</option>
                                <option value="Faldas">Faldas</option>
                                <option value="Chaquetas">Chaquetas</option>
                                <option value="Vermudas">Vermudas</option>
                                <option value="Chorts">Chorts</option>
                                <option value="Camisas">Camisas</option>
                            </Field>
                        </div>
                        <div className="input-group mb-2">
                            <ErrorMessage ErrorMessage name="tipo_prenda">
                                {message => <div className="alert alert-danger">{message}</div>}
                            </ErrorMessage>
                        </div>

                        <div className="input-group mb-2">
                            <span className="input-group-text">Talla de la prenda</span>
                            <Field
                                className="form-control"
                                name="talla_prenda"
                                id="talla_prenda"
                                type="text"
                            />
                        </div>
                        <div className="input-group mb-2">
                            <ErrorMessage ErrorMessage name="talla_prenda">
                                {message => <div className="alert alert-danger">{message}</div>}
                            </ErrorMessage>
                        </div>

                        <div className="input-group mb-2">
                            <span className="input-group-text">Muestra fisica</span>
                            <Field
                                className="form-select"
                                name="muestra_fisica"
                                id="muestra_fisica"
                                component="select"
                            >
                                <option value=""></option>
                                <option value='Si'>Si</option>
                                <option value='No'>No</option>
                            </Field>
                        </div>
                        <div className="input-group mb-2">
                            <ErrorMessage ErrorMessage name="muestra_fisica">
                                {message => <div className="alert alert-danger">{message}</div>}
                            </ErrorMessage>
                        </div>

                        <div className="input-group mb-2">
                            <span className="input-group-text">Tipo de empaque</span>
                            <Field
                                className="form-select"
                                name="tipo_empaque"
                                id="tipo_empaque"
                                component="select"
                            >
                                <option value="">  </option>
                                <option value="Basico">Basico</option>
                                <option value="Protegido">Protegido</option>
                                <option value="Aislado">Aislado</option>
                            </Field>
                        </div>
                        <div className="input-group mb-2">
                            <ErrorMessage ErrorMessage name="tipo_empaque">
                                {message => <div className="alert alert-danger">{message}</div>}
                            </ErrorMessage>
                        </div>

                        <div className="input-group mb-2">
                            <span className="input-group-text">Cantidad existente</span>
                            <Field
                                className="form-control"
                                name="cantidad_existente"
                                id="cantidad_existente"
                                type="text"
                            />
                        </div>
                        <div className="input-group mb-2">
                            <ErrorMessage ErrorMessage name="cantidad_existente">
                                {message => <div className="alert alert-danger">{message}</div>}
                            </ErrorMessage>
                        </div>

                        <div className="input-group mb-2">
                            <span className="input-group-text">Cliente de la prenda</span>
                            <Field
                                className="form-select"
                                name="cliente_prenda"
                                id="cliente_prenda"
                                component="select"
                            >
                                <option value=""> </option>
                                {props.cliente.map((cliente, index) => (
                                    <option value={cliente.nit} key={index}>{cliente.nombre}</option>
                                ))}
                            </Field>
                        </div>
                        <div className="input-group mb-2">
                            <ErrorMessage ErrorMessage name="cliente_prenda">
                                {message => <div className="alert alert-danger">{message}</div>}
                            </ErrorMessage>
                        </div>

                        <div className="input-group mb-2">
                            <span className="input-group-text">Taller de la prenda</span>
                            <Field
                                className="form-select"
                                name="taller_prenda"
                                id="taller_prenda"
                                component="select"
                            >
                                <option value="">  </option>
                                {props.taller.map((taller, index) => (
                                    <option value={taller.nit} key={index}>{taller.nombre}</option>
                                ))}
                            </Field>
                        </div>
                        <div className="input-group mb-2">
                            <ErrorMessage ErrorMessage name="taller_prenda">
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

export default AddPrenda;