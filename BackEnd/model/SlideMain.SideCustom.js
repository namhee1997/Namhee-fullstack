const mongoose = require("mongoose");

const slidesMainSchema = new mongoose.Schema(
    {
        url: {
            type: String,
        },
        idSlideMain: {
            type: Number,
            unique: true,
        },
    },
    {
        timestamps: true
    }
);

slidesMainSchema.statics.checkFound = async function (id) {
    let check = await slidesMainSchema.findOne({ _id: mongoose.Types.ObjectId(id) })
    if (!check) {
        throw new Error(`slidesMainSchema not found`);
    }
    return check;
};

module.exports = mongoose.model(
    "SlidesMain", slidesMainSchema);



