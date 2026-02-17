import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
    User
} from '../models/User.js';

const {
    JWT_SECRET
} = process.env;

export const register = async (req, res) => {
    const {
        email,
        password,
        firstName,
        lastName,
        phone
    } = req.body;

    try {
        const existingUser = await User.findOne({
            email
        });
        if (existingUser) {
            return res.status(409).json({
                message: 'Email already in use'
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashPassword,
            phone,
        });

        res.status(201).json({
            user: {
                email: newUser.email,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                phone: newUser.phone,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const login = async (req, res) => {
    const {
        email,
        password
    } = req.body;

    try {
        const user = await User.findOne({
            email
        });
        if (!user) {
            return res.status(401).json({
                message: 'Email or password is wrong'
            });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(401).json({
                message: 'Email or password is wrong'
            });
        }

        const token = jwt.sign({
            id: user._id
        }, JWT_SECRET, {
            expiresIn: '24h'
        });

        res.json({
            token,
            user: {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                photo: user.photo,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};