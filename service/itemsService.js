const itemsModel = require('../models/items');

let itemsMaster = {};

itemsMaster.insertOrUpdateItems = (req)=> {
    return new Promise((resolve, reject)=> {
        try {
            if (!req._id) {
                req = new itemsModel(req);
            }
            itemsModel.findOneAndUpdate({_id: req._id},req,{
                new: true,
                returnNewDocument: true,
                upsert: true
            },function (err, offer) {
                if (err || !offer) {
                    return reject(err);
                } else {
                    resolve(offer);
                }
            });
        } catch (e) {
            reject(e)
        }
    })
};

itemsMaster.findByIdAndRemove = (req)=> {
    return new Promise((resolve, reject)=> {
        try {
            itemsModel.findOneAndRemove({_id: req}, function (err, offer) {
                if (err || !offer) {
                    return reject(err);
                } else {
                    resolve(offer);
                }
            })
        } catch(err) {
            return reject(err);
        }
    })
};

itemsMaster.getItems = (req)=> {
    return new Promise((resolve, reject)=> {
        try {
            itemsModel.find({}, (err, offer)=> {
                if (err || !offer) {
                    return reject(err);
                } else {
                    resolve(offer);
                }
            })
        } catch(err) {
            return reject(err);
        }
    })
}

module.exports = itemsMaster;