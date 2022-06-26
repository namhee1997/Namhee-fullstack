const mongoose = require("mongoose");

const commentRateSchema = new mongoose.Schema(
    {
        idrate: {
            type: Number,
            unique: true,
        },
        start: {
            type: String,
            unique: true,
        },
        avt: {
            type: String,
            unique: true,
        },
        user: {
            type: String,
            unique: true,
        },
        title: {
            type: String,
            unique: true,
        }
    },
    {
        timestamps: true
    }
);

commentRateSchema.statics.checkFound = async function (id) {
    let check = await commentRateSchema.findOne({ _id: mongoose.Types.ObjectId(id) })
    if (!check) {
        throw new Error(`commentRateSchema not found`);
    }
    return check;
};

const ListCommentRate = mongoose.model(
    "ListCommentRate", commentRateSchema);

module.exports = ListCommentRate;



