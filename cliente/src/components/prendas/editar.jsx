import { useState } from 'react';
import axios from 'axios';
import { Formik, Field, Form } from 'formik';
import Swal from 'sweetalert2';
import urlConfig from '../../settings/settings';

function Editar(props) {

    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <div className="container mt-5 ">
            <h1 className="display-5 mb-4 text-center"> Editar prenda </h1>
            <br />
            <Formik
                initialValues={{
                    id_prenda: ''
                }}

                validate={(values) => {
                    const errors = {};

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
                            showCancelButton: true,
                            confirmButtonText: 'Actualizar',
                            html:
                                '<div class="input-group mb-2">' +
                                '<span class="input-group-text">Lote</span>' +
                                `<input class="form-control" id="swal-lote" value=${res.data[0].lote}></input>` +
                                '</div>' +

                                '<div class="input-group mb-2">' +
                                '<span class="input-group-text">Genero de la prenda</span>' +
                                `<select class="form-select" id="swal-generoPrenda" value=${res.data[0].genero_prenda}>
                                    <option value=${res.data[0].genero_prenda} selected=true>${res.data[0].genero_prenda}</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Femenino">Femenino</option>
                                </select>` +
                                '</div>' +

                                '<div class="input-group mb-2">' +
                                '<span class="input-group-text">Tipo de prenda</span>' +
                                `<select class="form-select" id="swal-tipoPrenda">
                                    <option value=${res.data[0].tipo_prenda} selected=true>${res.data[0].tipo_prenda}</option>
                                    <option value="Vestidos">Vestidos</option>
                                    <option value="Pantalones">Pantalones</option>
                                    <option value="Faldas">Faldas</option>
                                    <option value="Chaquetas">Chaquetas</option>
                                    <option value="Vermudas">Vermudas</option>
                                    <option value="Chorts">Chorts</option>
                                    <option value="Camisas">Camisas</option>
                                </select>` +
                                '</div>' +

                                '<div class="input-group mb-2">' +
                                '<span class="input-group-text">Talla de la prenda</span>' +
                                `<input class="form-control" id="swal-tallaPrenda" value=${res.data[0].talla_prenda}></input>` +
                                '</div>' +

                                '<div class="input-group mb-2">' +
                                '<span class="input-group-text">Muestra fisica</span>' +
                                `<select class="form-select" id="swal-muestraFisica">
                                    <option value=${res.data[0].muestra_fisica} selected=true>${res.data[0].muestra_fisica}</option>
                                    <option value="Si">Si</option>
                                    <option value="No">No</option>
                                </select>` +
                                '</div>' +

                                '<div class="input-group mb-2">' +
                                '<span class="input-group-text">Tipo de empaque</span>' +
                                `<select class="form-select" id="swal-tipoEmpaque">
                                    <option value=${res.data[0].tipo_empaque} selected=true>${res.data[0].tipo_empaque}</option>
                                    <option value="Basico">Basico</option>
                                    <option value="Protegido">Protegido</option>
                                    <option value="Aislado">Aislado</option>
                                </select>` +
                                '</div>' +

                                '<div class="input-group mb-2">' +
                                '<span class="input-group-text">Cantidad</span>' +
                                `<input class="form-control" id="swal-cantidadExistente" value=${res.data[0].cantidad_existente}></input>` +
                                '</div>' +

                                '<div class="input-group mb-2">' +
                                '<span class="input-group-text">Cliente de la prenda</span>' +
                                `<select class="form-select" id="swal-clientePrenda">
                                    <option value=${res.data[0].cliente_prenda} selected=true>${props.cliente.map(cliente => (
                                    (cliente.nit === res.data[0].cliente_prenda) ? (cliente.nombre) : null
                                ))}</option>
                                    ${props.cliente.map((cliente) => (
                                    `<option value=${cliente.nit}>${cliente.nombre}</option>`
                                ))}
                                </select>` +
                                '</div>' +

                                '<div class="input-group mb-2">' +
                                '<span class="input-group-text">Taller de la prenda</span>' +
                                `<select class="form-select" id="swal-tallerPrenda">
                                    <option value=${res.data[0].taller_prenda} selected=true>${props.taller.map((taller) => (
                                    (taller.nit === res.data[0].taller_prenda) ? (taller.nombre) : null
                                ))}</option>
                                    ${props.taller.map((taller) => (
                                    `<option value=${taller.nit}>${taller.nombre}</option>`
                                ))}
                                </select>` +
                                '</div>',

                            focusConfirm: false,
                            preConfirm: () => {
                                return [
                                    document.getElementById('swal-lote').value,
                                    document.getElementById('swal-generoPrenda').value,
                                    document.getElementById('swal-tipoPrenda').value,
                                    document.getElementById('swal-tallaPrenda').value,
                                    document.getElementById('swal-muestraFisica').value,
                                    document.getElementById('swal-tipoEmpaque').value,
                                    document.getElementById('swal-cantidadExistente').value,
                                    document.getElementById('swal-clientePrenda').value,
                                    document.getElementById('swal-tallerPrenda').value,
                                    values.id_prenda
                                ]
                            }
                        })
                            .then(async (result) => {
                                if (result.isConfirmed) {
                                    await axios.put(`http://${urlConfig}:5000/api/updatePrenda`, {
                                        lote: result.value[0],
                                        genero_prenda: result.value[1],
                                        tipo_prenda: result.value[2],
                                        talla_prenda: result.value[3],
                                        muestra_fisica: result.value[4],
                                        tipo_empaque: result.value[5],
                                        cantidad_existente: result.value[6],
                                        cliente_prenda: result.value[7],
                                        taller_prenda: result.value[8],
                                        id_prenda: values.id_prenda
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
                            <span className="input-group-text">Id  de la prenda</span>
                            <Field
                                className="form-control"
                                name="id_prenda"
                                id="id_prenda"
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