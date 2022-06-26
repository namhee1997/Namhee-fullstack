const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

let refreshTokens = [];
const authController = {
    //register
    registerUser: async (req, res) => {
        console.log(req.body.password, 'req.body.password');
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);


            //create new user
            const newUser = await new User({
                username: req.body.username,
                email: req.body.email,
                password: hashed
            });

            //save to db

            const user = await newUser.save();
            res.status(200).json(user);
        } catch (e) {
            res.status(500).json({
                e
            })
        }
    },
    //accesstoken
    generateAccessToken: (user) => {
        return (
            jwt.sign(
                {
                    id: user.id,
                    admin: user.admin
                },
                process.env.JWT_ACCESS_KEY,
                { expiresIn: '30d' }
            ))
    },
    //refreshToken
    generateRefreshToken: (user) => {
        return (
            jwt.sign(
                {
                    id: user.id,
                    admin: user.admin
                },
                process.env.JWT_REFRESH_KEY,
                { expiresIn: '365d' }
            ))
    },

    //login user 

    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({
                username: req.body.username
            })
            if (!user) {
                res.status(404).json(
                    'wrong Username'
                );
            }

            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            )

            if (!validPassword) {
                res.status(404).json(
                    'wrong Password'
                );
            }

            if (validPassword && user) {
                let accessToken = authController.generateAccessToken(user);
                let refreshToken = authController.generateRefreshToken(user);
                refreshTokens.push(refreshToken);
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: '/',
                    sameSite: "strict"
                })

                let { password, ...other } = user._doc;//xóa pass khi đẩy xuống fe

                res.status(200).json(
                    {
                        ...other,
                        accessToken
                    }
                );
            }

        } catch (error) {
            res.status(500).json({
                error
            })
        }
    },
    //refresh
    requestRefreshToken: (req, res) => {
        //lấy refresh token từ user
        let refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.status(401).json("you're not authenticate");
        if (!refreshTokens.includes(refreshToken)) {
            return res.status(401).json("refreshToken is not valid");
        }
        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
            if (err) {
                console.log(err);
            }
            refreshTokens = refreshTokens.filter(token => token !== refreshToken);
            //creater new token
            let newAccessToken = authController.generateAccessToken(user);
            let newRefreshToken = authController.generateRefreshToken(user);
            refreshTokens.push(newRefreshToken);
            res.cookie("refreshToken", newRefreshToken, {
                httpOnly: true,
                secure: false,
                path: '/',
                sameSite: "strict"
            })
            return res.status(200).json({ accessToken: newAccessToken });
        })
    },
    //logout
    logoutUser: async (req, res) => {
        res.clearCookie('refreshToken');
        refreshTokens = refreshTokens.filter(token => token !== req.cookies.refreshToken);
        return res.status(200).json("Logout user!");

    }
}
//store token
// 1. local storage
//dễ bị tấn công bởi XSS
//2. cookie (http only)
//scrf-> khắc phục bằng samesite
// nên dùng : redux store -> accesstoken
// http only -> refresh token

// BFF PATTERN (BACKEND FOR FRONTEND) để tối ưu bảo mật nhất

module.exports = authController;