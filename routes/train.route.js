const router = require('express').Router();

const {trainMiddleware} = require("../middlewares");
const {trainController} = require('../controllers');


router.get(
    '/',
    trainMiddleware.checkIsTrainExists,
    trainController.getAll
);

router.get(
    '/:id',
    trainMiddleware.checkIsTrainExistsById,
    trainController.getById
);

router.post(
    '/',
    trainMiddleware.checkIsIsBodyValid,
    trainController.create
);

router.put('/:id' ,
    trainMiddleware.checkIsTrainExistsForUpdate,
    trainController.update
);

router.delete(
    '/:id',
    trainController.delete
);

module.exports = router;
