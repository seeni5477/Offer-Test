const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
    {
        item_name: { type: String, required: true },
        catagory: { type: String, required: true },
        sub_cat: { type: String, required: true },
        rating: { type: Number, required: true },
        order_count: { type: Number, required: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model("item", itemSchema);