const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        idPhone: {
            type: String,
            unique: true,
            max: 8
        },
        title: {
            type: String,
        },
        slug: { type: String, slug: 'title', unique: true },
        promotion: {
            type: Boolean,
            enum: [true, false],
            required: true,
            default: false
        },
        variable:
        {
            type: mongoose.Schema.Types.Array,
            ref: "Variable",
        },
        company: {
            type: mongoose.Schema.Types.Array,
            ref: "Company",
        }, price: { type: Number, default: 0 },  //giá

    },
    {
        timestamps: true
    }
);

productSchema.pre('save', async function (next) {
    let ProductLast = await Product.findOne().sort({ idPhone: -1 }).limit(1);
    if (!ProductLast) {
        this.idPhone = 'D0001';
    } else {
        let idPhone = Number(ProductLast.idPhone.substring(2)) + 1
        switch (idPhone.toString().length) {
            case 0:
                this.idPhone = 'D0001';
                break;
            case 1:
                this.idPhone = 'D000' + idPhone;
                break;
            case 2:
                this.idPhone = 'D00' + idPhone;
                break;
            case 3:
                this.idPhone = 'D0' + idPhone;
                break;
            default:
                this.idPhone = 'D' + idPhone;
                break;
        }
    }
    next();
});

productSchema.statics.checkFound = async function (id) {
    let check = await productSchema.findOne({ _id: mongoose.Types.ObjectId(id) })
    if (!check) {
        throw new Error(`productSchema not found`);
    }
    return check
};


const Product = mongoose.model(
    "Product", productSchema);

module.exports = Product;



