const router = require('express').Router();

const {trainController} = require('../controllers');


router.get('/', trainController.getAll);
router.get('/:id', trainController.getById);
router.put('/', trainController.create);
router.post('/:id', trainController.update);
router.delete('/:id', trainController.delete);

module.exports = router;
