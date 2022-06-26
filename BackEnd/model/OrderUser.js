const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const orderUserSchema = new mongoose.Schema(
    {
        idorder: {
            type: Number,
            unique: true,
        },
        slug: {
            type: String,
            trim: true,
        },
        title:
        {
            type: String,
        }
        ,
        price: {
            type: Number,
            default: 0
        },
        cost: {
            type: Number,
            default: 0
        },
        userbuy: {
            type: Number,
            default: 0
        },
        paid: {
            type: Boolean,
            enum: [true, false],
            required: true,
            default: false
        },

    },
    {
        timestamps: true
    }
);

orderUserSchema.statics.checkFound = async function (id) {
    let check = await orderUserSchema.findOne({ _id: mongoose.Types.ObjectId(id) })
    if (!check) {
        throw new Error(`orderUserSchema not found`);
    }
    return check;
};

orderUserSchema.plugin(AutoIncrement, { inc_field: 'idorder' });

module.exports = mongoose.model(
    "OrderUser", orderUserSchema);



