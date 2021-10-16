const {Router} = require('express');
const router = Router();
const controller = require('../controllers/clientePrendaControll');

router.post('/addClientePrenda', controller.add);
router.post('/getClientePrenda', controller.search);
router.put('/updateClientePrenda', controller.update);
router.delete('/deleteClientePrenda/:id', controller.delete);
router.get('/listarClientePrendas', controller.list);

module.exports = router;