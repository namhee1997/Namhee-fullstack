const mongoose = require("mongoose");

const bannerMainSchema = new mongoose.Schema(
    {
        url: {
            type: String,
        },
        idBannerMain: {
            type: Number,
            unique: true,
        },
    },
    {
        timestamps: true
    }
);

bannerMainSchema.statics.checkFound = async function (id) {
    let check = await bannerMain.findOne({ _id: mongoose.Types.ObjectId(id) })
    if (!check) {
        throw new Error(`bannerMainSchema not found`);
    }
    return check;
};

const BannerMain = mongoose.model(
    "BannerMain", bannerMainSchema);

module.exports = BannerMain;



