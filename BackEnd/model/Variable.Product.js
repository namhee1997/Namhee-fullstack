const mongoose = require("mongoose");

const variableSchema = new mongoose.Schema(
    {
        idVariable: {
            type: String,
            unique: true,
            max: 8
        },
        idPhone: {
            type: String,
            trim: true,
        },
        avatar:
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
        sale: {
            type: Number,
            default: 0
        },
        listimg: {
            type: mongoose.Schema.Types.Array,
            ref: 'ListImg',
            default: 0
        },

    },
    {
        timestamps: true
    }
);

variableSchema.pre('save', async function (next) {
    let customerLast = await Variable.findOne().sort({ idVariable: -1 }).limit(1);
    if (!customerLast) {
        this.idVariable = 'D0001';
    } else {
        let idVariable = Number(customerLast.idVariable.substring(2)) + 1
        switch (idVariable.toString().length) {
            case 0:
                this.idVariable = 'D0001';
                break;
            case 1:
                this.idVariable = 'D000' + idVariable;
                break;
            case 2:
                this.idVariable = 'D00' + idVariable;
                break;
            case 3:
                this.idVariable = 'D0' + idVariable;
                break;
            default:
                this.idVariable = 'D' + idVariable;
                break;
        }
    }

    next();
});

variableSchema.statics.checkFound = async function (id) {
    let check = await variableSchema.findOne({ _id: mongoose.Types.ObjectId(id) })
    if (!check) {
        throw new Error(`variableSchema not found`);
    }
    return check;
};

const Variable = mongoose.model(
    "Variable", variableSchema);

module.exports = Variable;



