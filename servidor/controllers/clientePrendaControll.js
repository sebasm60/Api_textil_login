const controller = {};
const { cnn_mysql } = require('../settings/connectionDb');

controller.add = async (req, res) => {
    try{
        const newClientePrenda = {
            nit,
            nombre,
            numero
        } = req.body;

        await cnn_mysql.promise()
        .execute(`INSERT INTO cliente_prenda(nit, nombre, numero) VALUES (?, ?, ?)`, [ nit, nombre, numero]);

        res.json(newClientePrenda);
    } catch(e){
        res.send({ status: 404, message: 'Error en el servidor', error: e.code });
    };
};

controller.search = async (req, res) => {
    try {
        const { nit } = req.body;
        const clientePrenda = await cnn_mysql.promise().execute(`SELECT * FROM cliente_prenda WHERE nit = ?`, [nit]);
        res.json(clientePrenda[0]);
    } catch (e) {
        res.send({ status: 404, message: 'Error en el servidor', error: e.code });
    };
};

controller.update = (req, res) => {
    try {
        const clientePrenda = {
            nit,
            nombre,
            numero
        } = req.body;

        cnn_mysql.query(`UPDATE cliente_prenda SET nombre=?, numero=? WHERE nit=?`, [nombre, numero, nit]);

        res.json(clientePrenda);
    } catch (e) {
        res.send({ status: 404, message: 'Error en el servidor', error: e.code });
    };
};

controller.delete = (req, res) => {
    try {
        const { id } = req.params;
        cnn_mysql.query(`DELETE FROM cliente_prenda WHERE nit = ?`, [id]);
        res.json({message: 'Eliminado correctamente', clientePrenda : id});
    } catch (e) {
        res.send({ status: 404, message: 'Error en el servidor', error: e.code });
    };
};

controller.list = async (req, res) => {
    try {
        const clientePrenda = await cnn_mysql.promise().execute(`SELECT * FROM cliente_prenda`);
        res.json(clientePrenda[0]);
    } catch (e) {
        res.send({ status: 404, message: 'Error en el servidor', error: e });
    };
};

module.exports = controller;