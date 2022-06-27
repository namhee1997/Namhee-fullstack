const User = require('../model/User');

let userController = {
    //get all user
    getAllUser: async (req, res) => {
        try {
            let user = await User.find();
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({
                error
            })
        }
    },
    getById: async (req, res) => {
        try {
            const user = await User.findOne({
                userId: req.params.id
            }, function (err, user) {
                if (err) return res.status(500).json('error');
                return res.status(200).json(user);
            })
        } catch (error) {
            return res.status(500).json({
                error
            })
        }
    },
    deleteUser: async (req, res) => {
        try {
            User.remove({
                userId: req.params.id
            }, function (err, user) {
                if (err)
                    return console.error(err);

                res.status(200).json("delete success!");
            });
        } catch (error) {
            res.status(500).json({ error });
        }
    },
    addUser: async (req, res) => {
        try {
            let user = req.body;
            User.create(user, function (err, doc) {
                if (err) return err;
                else { res.status(200).json('add success!'); }
            });
        } catch (error) {
            res.status(500).json({ error });
        }
    }
}

module.exports = userController;

