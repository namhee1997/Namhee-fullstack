const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const slidesCustomSchema = new mongoose.Schema(
    {
        idslidesmain: {
            type: Number,
            unique: true,
        },
        slidesmain: {
            type: mongoose.Schema.Types.Array,
            ref: 'SlidesMain',
        },
        idbannermain: {
            type: Number,
            unique: true,
        },
        bannermain: {
            type: mongoose.Schema.Types.Array,
            ref: 'BannerMain',
        },
        idslidespage: {
            type: Number,
            unique: true,
        },
        slidespage: {
            type: mongoose.Schema.Types.Array,
            ref: 'SlidesPage',
        },

    },
    {
        timestamps: true
    }
);

slidesCustomSchema.statics.checkFound = async function (id) {
    let check = await SlidesCustom.findOne({ _id: mongoose.Types.ObjectId(id) })
    if (!check) {
        throw new Error(`SlidesCustom not found`);
    }
    return check;
};

slidesCustomSchema.plugin(AutoIncrement, { inc_field: 'idslidesmain' });
slidesCustomSchema.plugin(AutoIncrement, { inc_field: 'idbannermain' });
slidesCustomSchema.plugin(AutoIncrement, { inc_field: 'idslidespage' });


const SlidesCustom = mongoose.model(
    "SlidesCustom", slidesCustomSchema);

module.exports = SlidesCustom;




