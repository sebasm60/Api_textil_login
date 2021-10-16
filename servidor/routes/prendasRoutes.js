const {Router} = require('express');
const router = Router();
const controller = require('../controllers/prendasControll');

router.post('/addPrenda', controller.add);
router.post('/getPrenda', controller.search);
router.put('/updatePrenda', controller.update);
router.delete('/deletePrenda/:id', controller.delete);
router.get('/listarPrendas', controller.list);

module.exports = router;