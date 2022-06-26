const mongoose = require("mongoose");

const listImgSchema = new mongoose.Schema(
    {
        idVariable: {
            type: String,
            unique: true,
            max: 8
        },
        thumb: {
            type: String,
            trim: true,
        },

    },
    {
        timestamps: true
    }
);

listImgSchema.statics.checkFound = async function (id) {
    let check = await listImgSchema.findOne({ _id: mongoose.Types.ObjectId(id) })
    if (!check) {
        throw new Error(`listImgSchema not found`);
    }
    return check;
};


module.exports = mongoose.model(
    "ListImg", listImgSchema);



