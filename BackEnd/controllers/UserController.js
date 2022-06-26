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
    deleteUser: async (req, res) => {
        try {
            let user = await User.findById(req.params.id);
            res.status(200).json("delete success!");
        } catch (error) {
            res.status(500).json({ error });
        }
    }
}

module.exports = userController;

