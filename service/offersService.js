const offersModel = require('../models/offers.js');

let offersMaster = {};

offersMaster.insertOrUpdateOffer = (req)=> {
    return new Promise((resolve, reject)=> {
        try {
            if (!req._id) {
                req = new offersModel(req);
            }
            offersModel.findOneAndUpdate({_id: req._id},req,{
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

offersMaster.findByIdAndRemove = (req)=> {
    return new Promise((resolve, reject)=> {
        try {
            offersModel.findOneAndRemove({_id: req}, function (err, offer) {
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

offersMaster.getOffers = (req)=> {
    return new Promise((resolve, reject)=> {
        try {
            offersModel.aggregate([{ "$match": {is_active: true}}], (err, offer)=> {
                if (err || !offer) {
                    return reject(err);
                } else {
                    resolve(offer);
                }
            })
            
            // offersModel.aggregate({_id: req}, function (err, offer) {
            //     if (err || !offer) {
            //         return reject(err);
            //     } else {
            //         resolve(offer);
            //     }
            // })
        } catch(err) {
            return reject(err);
        }
    })
}

module.exports = offersMaster;