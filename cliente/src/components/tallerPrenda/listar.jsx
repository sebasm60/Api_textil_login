function Listar(props) {
    return (
        <div className="container mt-5 table-responsive">
            <h1 className="display-5 mb-4"> Listar talleres </h1>
            <table className="table table-borderless">
                <thead className="table-dark">
                    <tr>
                        <th>Nit</th>
                        <th>Nombre</th>
                        <th>Numero</th>
                    </tr>
                </thead>
                <tbody>
                    {props.talleres.map((taller, index) => (
                        <tr className="" key={index}>
                            <td> {taller.nit}</td>
                            <td> {taller.nombre}</td>
                            <td> {taller.numero}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Listar;