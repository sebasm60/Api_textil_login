const controller = {};
const { cnn_mysql } = require('../settings/connectionDb');

controller.add = async (req, res) => {
    try{
        const newTallerPrenda = {
            nit,
            nombre,
            numero
        } = req.body;

        await cnn_mysql.promise()
        .execute(`INSERT INTO taller_prenda(nit, nombre, numero) VALUES (?, ?, ?)`, [ nit, nombre, numero]);

        res.json(newTallerPrenda);
    } catch(e){
        res.send({ status: 404, message: 'Error en el servidor', error: e.code });
    };
};

controller.search = async (req, res) => {
    try {
        const { nit } = req.body;
        const tallerPrenda = await cnn_mysql.promise().execute(`SELECT * FROM taller_prenda WHERE nit = ?`, [nit]);
        res.json(tallerPrenda[0]);
    } catch (e) {
        res.send({ status: 404, message: 'Error en el servidor', error: e.code });
    };
};

controller.update = (req, res) => {
    try {
        const tallerPrenda = {
            nit,
            nombre,
            numero
        } = req.body;

        cnn_mysql.query(`UPDATE taller_prenda SET nombre=?, numero=? WHERE nit=?`, [nombre, numero, nit]);

        res.json(tallerPrenda);
    } catch (e) {
        res.send({ status: 404, message: 'Error en el servidor', error: e.code });
    };
};

controller.delete = (req, res) => {
    try {
        const { id } = req.params;
        cnn_mysql.query(`DELETE FROM taller_prenda WHERE nit = ?`, [id]);
        res.json({message: 'Eliminado correctamente', tallerPrenda : id});
    } catch (e) {
        res.send({ status: 404, message: 'Error en el servidor', error: e.code });
    };
};

controller.list = async (req, res) => {
    try {
        const tallerPrenda = await cnn_mysql.promise().execute(`SELECT * FROM taller_prenda`);
        res.json(tallerPrenda[0]);
    } catch (e) {
        res.send({ status: 404, message: 'Error en el servidor', error: e });
    };
};

module.exports = controller;