const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const commentProductSchema = new mongoose.Schema(
    {
        idComment: {
            type: Number,
            unique: true,
        },
        idUser: {
            type: String,
            unique: true,
        },
        user: {
            type: String,
        },
        isAdmin: {
            type: Boolean,
            enum: [true, false],
            required: true,
            default: false
        },
        title: {
            type: String,
        },
        listReply: {
            type: mongoose.Schema.Types.Array,
            ref: 'ListReply'
        },
    },
    {
        timestamps: true
    }
);

commentProductSchema.statics.checkFound = async function (id) {
    let check = await commentProductSchema.findOne({ _id: mongoose.Types.ObjectId(id) })
    if (!check) {
        throw new Error(`commentProductSchema not found`);
    }
    return check;
};
commentProductSchema.plugin(AutoIncrement, { inc_field: 'idComment' });

const CommentProduct = mongoose.model(
    "CommentProduct", commentProductSchema);

module.exports = CommentProduct;



