function Listar(props) {

    return (
        <div className="container mt-5 table-responsive">
            <h1 className="display-5 mb-4"> Listar prendas </h1>
            <table className="table table-borderless">
                <thead className="table-dark">
                    <tr>
                        <th>Id prenda</th>
                        <th>lote</th>
                        <th>Genero</th>
                        <th>Tipo prenda</th>
                        <th>Talla prenda</th>
                        <th>Muestra fisica</th>
                        <th>Tipo de empaque</th>
                        <th>Cantidad existente</th>
                        <th>Cliente prenda</th>
                        <th>Taller prenda</th>
                    </tr>
                </thead>
                <tbody>
                    {props.prendas.map((prenda, index) => (
                        <tr className="" key={index}>
                            <td> {prenda.id_prenda}</td>
                            <td> {prenda.lote}</td>
                            <td> {prenda.genero_prenda}</td>
                            <td> {prenda.tipo_prenda}</td>
                            <td> {prenda.talla_prenda}</td>
                            <td> {prenda.muestra_fisica}</td>
                            <td> {prenda.tipo_empaque}</td>
                            <td> {prenda.cantidad_existente}</td>
                            <td> {props.cliente.map((cliente, index) => (
                                (prenda.cliente_prenda === cliente.nit) ? cliente.nombre : false
                            ))}</td>
                            <td>{props.taller.map((taller, index) => (
                                (prenda.taller_prenda === taller.nit) ? taller.nombre : false
                            ))}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Listar;