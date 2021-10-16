controller = {};
const { cnn_mysql } = require('../settings/connectionDb');
const helpers = require('../lib/helpers');

//Funcion para crear nueva cuenta.
controller.newUser = async(req, res) => {
    try {
        const newAccount = { email, pass} = req.body;
        pass = await helpers.encryptPassword(pass);

        await cnn_mysql.promise()
        .execute(`INSERT INTO accounts (email, pass) VALUES (?, ?)`,
        [email, pass]);
        res.json(newAccount);        
    } catch (error) {
        res.send({status : 404, message : error.message, code : error.code});
    };
};

//Funcion para iniciar sesión.
controller.login = async(req, res) => {
    try {
        const account = {email, pass} = req.body;
        const rows = await cnn_mysql.promise().execute(`SELECT * FROM accounts WHERE email = ?`, [email]);
        
        if(rows[0][0]){
            const user = rows[0][0];
            const validPassword = await helpers.matchPassword(account.pass, user.pass);

            if(validPassword){
                payload = {
                    email: user.email
                };
                res.status(200).send({messaje : 'Access successful', payload});
            } else {
                res.send({status: 404, messaje : 'Password wrong'});
            };
        } else {
            res.send({status: 404, messaje : 'User not found'});
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = controller;