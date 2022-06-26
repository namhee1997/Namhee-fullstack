const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
    {
        src: {
            type: String,
        },
        title: {
            type: String,
        },
        slug: {
            type: String
        }

    },
    {
        timestamps: true
    }
);

companySchema.statics.checkFound = async function (id) {
    let check = await companySchema.findOne({ _id: mongoose.Types.ObjectId(id) })
    if (!check) {
        throw new Error(`companySchema not found`);
    }
    return check;
};


module.exports = mongoose.model(
    "Company", companySchema);




