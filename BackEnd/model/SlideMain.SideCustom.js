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
    let check = await SlidesMain.findOne({ _id: mongoose.Types.ObjectId(id) })
    if (!check) {
        throw new Error(`SlidesMain not found`);
    }
    return check;
};

const SlidesMain = mongoose.model(
    "SlidesMain", slidesMainSchema);

module.exports = SlidesMain;



