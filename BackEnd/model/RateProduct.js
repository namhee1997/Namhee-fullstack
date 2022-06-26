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
    let check = await rateProductSchema.findOne({ _id: mongoose.Types.ObjectId(id) })
    if (!check) {
        throw new Error(`rateProductSchema not found`);
    }
    return check;
};
rateProductSchema.plugin(AutoIncrement, { inc_field: 'idrate' });

module.exports = mongoose.model(
    "RateProduct", rateProductSchema);



