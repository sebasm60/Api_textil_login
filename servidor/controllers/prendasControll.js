const controller = {};
const { cnn_mysql } = require('../settings/connectionDb');

//Funcion para agregar una nueva prenda
controller.add = async (req, res) => {
    try{
        const newPrenda = {
            id_prenda, 
            lote,
            genero_prenda,
            tipo_prenda,
            talla_prenda,
            muestra_fisica,
            tipo_empaque,
            cantidad_existente,
            cliente_prenda,
            taller_prenda
        } = req.body;

        await cnn_mysql.promise()
        .execute(`INSERT INTO prendas(id_prenda, lote, genero_prenda, tipo_prenda, talla_prenda, muestra_fisica, tipo_empaque, cantidad_existente, cliente_prenda, taller_prenda)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            id_prenda, 
            lote,
            genero_prenda,
            tipo_prenda,
            talla_prenda,
            muestra_fisica,
            tipo_empaque,
            cantidad_existente,
            cliente_prenda,
            taller_prenda
        ]);

        res.json(newPrenda);
    } catch(e){
        res.send({ status: 404, message: 'Error en el servidor', error: e.code });
    };
};

//Funcion para buscar una prenda en especifico.
controller.search = async (req, res) => {
    try {
        const { id_prenda } = req.body;
        const prenda = await cnn_mysql.promise().execute(`SELECT * FROM prendas WHERE id_prenda = ?`, [id_prenda]);
        res.json(prenda[0]);
    } catch (e) {
        res.send({ status: 404, message: 'Error en el servidor', error: e.code });
    }
};

//Funcion para actualizar/cambiar la informacion de una prenda.
controller.update = (req, res) => {
    try {
        const prenda = {
            id_prenda, 
            lote,
            genero_prenda,
            tipo_prenda,
            talla_prenda,
            muestra_fisica,
            tipo_empaque,
            cantidad_existente,
            cliente_prenda,
            taller_prenda
        } = req.body;

        cnn_mysql.query(`UPDATE prendas SET lote=?, genero_prenda=?, tipo_prenda=?, talla_prenda=?, muestra_fisica=?, 
        tipo_empaque=?, cantidad_existente=?, cliente_prenda=?, taller_prenda=? WHERE id_prenda=?`,
        [
            lote,
            genero_prenda,
            tipo_prenda,
            talla_prenda,
            muestra_fisica,
            tipo_empaque,
            cantidad_existente,
            cliente_prenda,
            taller_prenda,
            id_prenda
        ]);

        res.json(prenda);
    } catch (e) {
        res.send({ status: 404, message: 'Error en el servidor', error: e.code });
    };
};

//Funcion para eliminar una prenda
controller.delete = (req, res) => {
    try {
        const { id } = req.params;
        cnn_mysql.query(`DELETE FROM prendas WHERE id_prenda = ?`, [id]);
        res.json({message: 'Eliminado correctamente', prenda : id});
    } catch (e) {
        res.send({ status: 404, message: 'Error en el servidor', error: e.code });
    };
};

//Listar todas las prendas
controller.list = async (req, res) => {
    try {
        const prendas = await cnn_mysql.promise().execute(`SELECT * FROM prendas`);
        res.json(prendas[0]);
    } catch (e) {
        res.send({ status: 404, message: 'Error en el servidor', error: e });
    };
};

module.exports = controller;