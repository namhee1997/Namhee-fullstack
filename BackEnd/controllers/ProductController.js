const Product = require('../model/Product');

let productController = {
    //get all user
    getAllProduct: async (req, res) => {
        try {
            console.log('start get all product');
            let product = await Product.find();
            return res.status(200).json(product);
        } catch (error) {
            return res.status(500).json({
                error
            })
        }
    },
    getById: async (req, res) => {
        try {
            const product = await Product.find({
                slug: req.params.slug
            });
            console.log(product, 'product');
            return res.status(200).json(product);
        } catch (error) {
            return res.status(500).json({
                error
            })
        }
    },
    deleteProduct: async (req, res) => {
        try {
            let data = await Product.deleteOne({ _id: req.params.id });
            res.status(200).json('success');


        } catch (error) {
            res.status(500).json({ error });
        }
    },
    addProduct: async (req, res) => {
        try {
            let product = req.body;
            let productArr = [];

            for (let i = 0; i < product.length; i++) {
                let dataArr = {};
                dataArr['idVariable'] = `T${i + 1}`;
                dataArr['title'] = product[i].variable;
                dataArr['avatar'] = product[i].data.avatar;
                dataArr['price'] = parseInt(product[i].price);
                dataArr['cost'] = parseInt(product[i].cost);
                dataArr['sale'] = parseInt(product[i].sale);
                dataArr['listimg'] = product[i].data.img;
                productArr.push(dataArr);
            }


            let dataProductSave = {
                slug: product[0].slug,
                title: product[0].title,
                promotion: product[0].promotion == 'true' ? true : false,
                variable: productArr,
                infophone: {

                },
                company: product[0].company,
            };

            let productNew = new Product(dataProductSave);

            productNew.save(function (err, results) {
                if (err) {
                    return res.status(200).json('add err!');
                }
                else {
                    res.status(200).json('add success!');
                }
            });
        } catch (error) {
            console.log('models err');
            // res.status(500).json({ error });
        }
    },
    updateProduct: async (req, res) => {
        try {
            let product = req.body;
            console.log('updateProduct', product);
            let data = await Product.findByIdAndUpdate(product._id, product);
            console.log('update success product');
            return res.status(200).json('success');
        } catch (error) {
            res.status(500).json({ error });
        }
    },
}

module.exports = productController;

