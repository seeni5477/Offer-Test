const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema(
    {
        is_reapeate_offer: { type: Boolean, required: true },
        is_active: { type: Boolean, required: true },
        is_day_repeate: { type: Boolean, required: true },

        percentage: { type: Number, required: true },
        item_ids: [Number],
        repeate_offers: {
            day: { type: String },
            date: { type: Date },
            start_time: { type: String },
            end_time: { type: String },
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("offers", offerSchema);