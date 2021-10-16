function Listar(props) {
    return (
        <div className="container mt-5 table-responsive">
            <h1 className="display-5 mb-4"> Listar clientes </h1>
            <table className="table table-borderless">
                <thead className="table-dark">
                    <tr>
                        <th>Nit</th>
                        <th>Nombre</th>
                        <th>Numero</th>
                    </tr>
                </thead>
                <tbody>
                    {props.clientes.map((clientes, index) => (
                        <tr className="" key={index}>
                            <td> {clientes.nit}</td>
                            <td> {clientes.nombre}</td>
                            <td> {clientes.numero}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Listar;