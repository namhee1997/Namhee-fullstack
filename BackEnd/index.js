const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const userRouter = require('./routes/user');
const dbUser = require('./model/User');
const dbProduct = require('./model/Product');
const bcrypt = require('bcryptjs');

const app = express();

app.use(cors());
app.use(cookieParser());

mongoose
    .connect(process.env.DB_MONGOO, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('CONNECTED MONGODB');
        initial();
        initialProduct()
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });

//DATA CURRENT

function initial() {
    dbUser.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new dbUser({
                username: 'admin',
                role: 'admin',
                fullname: 'vivannam',
                avatar: 'testAvatar',
                address: 'vinh NA',
                email: 'nam@gmail.com',
                phone: '0987878721',
                password: bcrypt.hashSync("123456", 8)
            }).save((err, user) => {
                if (err) {
                    console.log("init error", err);
                }
                console.log("create admin");
            })
        }
    })
}

function initialProduct() {
    dbProduct.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new dbProduct({
                slug: 'test_product',
                promotion: true,
                variable: [
                    {
                        idVariable: 't1',
                        title: 'variable 1',
                        avatar: 'test AVT',
                        price: 5000000,
                        cost: 5500000,
                        sale: 500000,
                        listimg: [{ thumb: 'tesst list img' }]
                    }
                ],

                infophone: {
                    chip: 'i5',
                },
                company: 'Vivo',

            }).save((err, user) => {
                if (err) {
                    console.log("init error", err);
                }
                console.log("create product");
            })
        }
    })
}




app.use(express.json());

//ROUTES

app.use('/v1/auth', authRoutes);
app.use('/v1/user', userRouter);

app.listen(8080, () => {
    console.log('is running server success!');
})

//AUTHENTICATION SS DANG NHAP

//AUTHORIZATION PHAN QUYEN

//JSON WEB TOKEN