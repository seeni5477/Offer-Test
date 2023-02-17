const router = require("express").Router()
const offersController = require("../controller/offersController");
const itemsController = require("../controller/itemsController");

router.route('/offer')
    .post(offersController.addOffer)
    .put(offersController.updateOffer)
    .delete(offersController.deleteOffer)
    .get(offersController.getTodaysOffer);

router.route('/item')
    .post(itemsController.addItem)
    .put(itemsController.updateItem)
    .delete(itemsController.deleteItem)
    .get(itemsController.getItems);

module.exports = router;