const {Router} = require('express');
const router = Router();
const controller = require('../controllers/tallerPrendaControll');

router.post('/addTallerPrenda', controller.add);
router.post('/getTallerPrenda', controller.search);
router.put('/updateTallerPrenda', controller.update);
router.delete('/deleteTallerPrenda/:id', controller.delete);
router.get('/listarTallerPrendas', controller.list);

module.exports = router;