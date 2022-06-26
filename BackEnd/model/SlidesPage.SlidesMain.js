const mongoose = require("mongoose");

const slidesPageSchema = new mongoose.Schema(
    {
        url: {
            type: String,
        },
        idSlidePage: {
            type: Number,
            unique: true,
        },
    },
    {
        timestamps: true
    }
);

slidesPageSchema.statics.checkFound = async function (id) {
    let check = await slidesPageSchema.findOne({ _id: mongoose.Types.ObjectId(id) })
    if (!check) {
        throw new Error(`slidesPageSchema not found`);
    }
    return check;
};

module.exports = mongoose.model(
    "SlidesPage", slidesPageSchema);



