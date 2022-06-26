const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            unique: true,
            trim: true,
        },
        idPhone: {
            type: String,
            unique: true,
            trim: true,
        },
        paymentCart: {
            type: String,
            unique: true,
            trim: true,
        },
        selected: {
            type: mongoose.Schema.Types.ObjectId,
        }

    },
    {
        timestamps: true
    }
);

cartSchema.statics.checkFound = async function (id) {
    let check = await Cart.findOne({ _id: mongoose.Types.ObjectId(id) })
    if (!check) {
        throw new Error(`cartSchema not found`);
    }
    return check;
};

const Cart = mongoose.model(
    "Cart", cartSchema);

module.exports = Cart;



