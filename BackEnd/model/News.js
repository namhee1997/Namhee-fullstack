const mongoose = require("mongoose");
const slug = require('mongoose-slug-generator');

const newsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
        },
        slug: { type: String, slug: 'title', unique: true },

        content: {
            type: String
        },
        urlto: {
            type: String,
            trim: true,
        },
        avatar: {
            type: String,
        }

    },
    {
        timestamps: true
    }
);

newsSchema.statics.checkFound = async function (id) {
    let check = await newsSchema.findOne({ _id: mongoose.Types.ObjectId(id) })
    if (!check) {
        throw new Error(`newsSchema not found`);
    }
    return check;
};

mongoose.plugin(slug);


module.exports = mongoose.model(
    "News", newsSchema);




