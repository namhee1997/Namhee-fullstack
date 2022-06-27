const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const rateProductSchema = new mongoose.Schema(
    {
        idrate: {
            type: Number,
            unique: true,
        },
        totalstart: {
            type: mongoose.Schema.Types.ObjectId,
        },
        listCommentRate: {
            type: mongoose.Schema.Types.Array,
            ref: 'ListCommentRate',
        },
    },
    {
        timestamps: true
    }
);

rateProductSchema.statics.checkFound = async function (id) {
    let check = await RateProduct.findOne({ _id: mongoose.Types.ObjectId(id) })
    if (!check) {
        throw new Error(`RateProduct not found`);
    }
    return check;
};
rateProductSchema.plugin(AutoIncrement, { inc_field: 'idrate' });

const RateProduct = mongoose.model(
    "RateProduct", rateProductSchema);

module.exports = RateProduct;



