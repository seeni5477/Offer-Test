const offersService = require('../service/offersService');

const moment = require('moment');

let offersMaster = {};
// console.log(new Date())
offersMaster.addOffer = (req, res)=> {
    offersService.insertOrUpdateOffer(req.body).then(resp => {
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

offersMaster.updateOffer = (req, res)=> {
    offersService.insertOrUpdateOffer(req.body).then(resp => {
        res.status(200).send({
            status: true,
            data: resp,
            msg: 'Offer Update Successfully'
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

offersMaster.deleteOffer = (req, res)=> {
    offersService.findByIdAndRemove(req.body._id).then(resp=> {
        res.send({
            status: true,
            data: resp
        })
    }, err => {
        res.status(400).send({
            status: false,
            msg: 'Invalid Request'
        })
    }).catch(err => {
        res.status(500).send({
            status: false,
            msg: "Unexpected Error"
        });
    })
};

offersMaster.getTodaysOffer = (req, res)=> {
    offersService.getOffers().then((resp)=> {
        if (!resp.length) {
            res.status(404).send({
                status: true,
                msg: 'No Offers Found'
            })
        } else {
            let format = 'h:mm a';
            let ofFilter = resp.filter((item)=> {
                if (item?.is_day_repeate) {
                    if (item?.repeate_offers.day.toLowerCase() === moment(new Date()).format('dddd').toLowerCase()) {
                        let time = moment(new Date(),format),
                        beforeTime = moment(item?.repeate_offers?.start_time, format),
                        afterTime = moment(item?.repeate_offers?.end_time, format);

                        if (time.isBetween(beforeTime, afterTime)) {
                            return true
                        }
                    }
                } else {
                    let now = moment(new Date()).format('YYYY-MM-DD');
                    let compareDate = moment(new Date(item?.repeate_offers?.date)).format('YYYY-MM-DD');
                    if (moment(now).isSame(compareDate)) {
                        let time = moment(new Date(),format),
                        beforeTime = moment(item?.repeate_offers?.start_time, format),
                        afterTime = moment(item?.repeate_offers?.end_time, format);
                        if (time.isBetween(beforeTime, afterTime)) {
                            return true
                        }
                    }
                }
            })
            res.send({
                status: true,
                data: ofFilter
            })
        }
        
    }, err => {
        res.status(400).send({
            status: false,
            msg: 'Invalid Request'
        })
    }).catch(err => {
        res.status(500).send({
            status: false,
            msg: "Unexpected Error"
        });
    })
}

module.exports = offersMaster;