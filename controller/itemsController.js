const itemsService = require('../service/itemsService');

let itemsMaster = {};
itemsMaster.addItem = (req, res)=> {
    itemsService.insertOrUpdateItems(req.body).then(resp => {
        res.status(200).send({
            status: true,
            data: resp,
            msg: 'Offer Added Successfully'
        });
    }, err => {
        res.status(400).send({
            status: false,
            msg: 'Invalid User Details'
        });
    }).catch(err => {
        res.status(500).send({
            status: false,
            msg: 'Something Went Wrong'
        });
    })
}

itemsMaster.updateItem = (req, res)=> {
    itemsService.insertOrUpdateItems(req.body).then(resp => {
        res.status(200).send({
            status: true,
            data: resp,
            msg: 'Offer Update Successfully'
        });
    }, err => {
        res.status(400).send({
            status: false,
            msg: 'Invalid User Details'
        });s
    }).catch(err => {
        res.status(500).send({
            status: false,
            msg: 'Something Went Wrong'
        });
    })
}

itemsMaster.deleteItem = (req, res)=> {
    itemsService.findByIdAndRemove(req.body._id).then(resp=> {
        res.send({
            status: true,
            data: resp
        });
    }, err => {
        res.status(400).send({
            status: false,
            msg: 'Invalid Request'
        });
    }).catch(err => {
        res.status(500).send({
            status: false,
            msg: "Unexpected Error"
        });
    })
};

itemsMaster.getItems = (req, res)=> {
    itemsService.getItems().then((resp)=> {
        if (!resp.length) {
            res.status(404).send({
                status: true,
                msg: 'No Offers Found'
            });
        } else {
            res.send({
                status: true,
                data: resp
            });
        }
        
    }, err => {
        res.status(400).send({
            status: false,
            msg: 'Invalid Request'
        });
    }).catch(err => {
        res.status(500).send({
            status: false,
            msg: "Unexpected Error"
        });
    })
}

module.exports = itemsMaster;