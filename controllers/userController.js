import bcrypt from "bcrypt";
import UserModal from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const userCheck = await UserModal.findOne({email: req.body.email});

        if (userCheck) {
            return res.status(404).json({
                message: 'User is found',
            });
        }

        const doc = new UserModal({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash,
        });

        const user = await doc.save();

        const token = jwt.sign({
            _id: user._id,
        }, process.env.SECRET_KEY, {
            expiresIn: '30d',
        });

        const {passwordHash, ...userData} = user._doc;

        res.json({
            ...userData,
            token
        });
    } catch (err) {
        res.status(500).json({
            message: 'Failed to register',
        });
    }
};

export const login = async (req, res) => {
    try {
        const user = await UserModal.findOne({email: req.body.email});
        if (!user) {
            return res.status(404).json({
                message: 'User is not found',
            });
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);
        if (!isValidPass) {
            return res.status(400).json({
                message: 'Wrong login or password',
            });
        }

        const token = jwt.sign({
            _id: user._id,
        }, process.env.SECRET_KEY, {
            expiresIn: '30d',
        });

        const {passwordHash, ...userData} = user._doc;

        res.json({
            ...userData,
            token
        });


    } catch (err) {
        res.status(500).json({
            message: 'Failed to login',
        });
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await UserModal.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: 'User is not found',
            });
        }

        const {passwordHash, ...userData} = user._doc;

        res.json(userData);
    } catch (err) {
        res.status(500).json({
            message: 'No access',
        });
    }
};