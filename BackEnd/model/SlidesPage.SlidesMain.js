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
    let check = await SlidesPage.findOne({ _id: mongoose.Types.ObjectId(id) })
    if (!check) {
        throw new Error(`SlidesPage not found`);
    }
    return check;
};

const SlidesPage = mongoose.model(
    "SlidesPage", slidesPageSchema);

module.exports = SlidesPage;



