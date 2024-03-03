import express from 'express';
import asyncHandler from 'express-async-handler';
import User from '../Models/UserModel.js';
import generateToken from '../utils/generateToken.js';
import protect from '../Middleware/AuthMiddleware.js';

const userRoute = express.Router();

//! LOGIN

userRoute.post(
    '/login',
    asyncHandler(async (req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id, user.email, user.name, user.isAdmin, { age: user.age }),
                createAt: user.createAt,
            });
        } else {
            res.status(401);
            throw new Error('Invalid email or password');
        }
    })
);

//! REGISTER

userRoute.post(
    '/',
    asyncHandler(async (req, res) => {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400);
            throw new Error('User already exists');
        }

        const user = await User.create({
            name,
            email,
            password,
        });
        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
                createAt: user.createAt,
            });
        }
        else {
            res.status(400);
            throw new Error('Invalid user data');
        }
    }
    ));


//! PROFIL 

userRoute.get(
    '/profile',
    protect,
    asyncHandler(async (req, res) => {
        const user = await User.findById(req.user._id)

        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                createAt: user.createAt,
            })
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    })
);

userRoute.get(
    '/',
    asyncHandler(async (req, res) => {
        const users = await User.find({});
        if (users) {
            res.json(users);
        } else {
            res.status(404);
            throw new Error('No users found');
        }
    })
);


//! UPDATE PROFIL

userRoute.put(
    '/profile/:id',
    protect,
    asyncHandler(async (req, res) => {
        const user = await User.findById(req.params.id)

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;

            if (req.body.password) {
                user.password = req.body.password
            }

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
                createAt: updatedUser.createAt,
                token: generateToken(updatedUser._id),
            })
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    })
);

// GET the last 5 registered users
userRoute.get(
    '/lastRegistered',
    asyncHandler(async (req, res) => {
        try {
            const users = await User.find().sort({ createAt: -1 }).limit(5);
            if (users) {
                res.json(users);
            } else {
                res.status(404);
                throw new Error('No users found');
            }
        } catch (error) {
            console.error("Error occurred while getting last registered users:", error);
            res.status(500).json({ message: error.message });
        }
    })
);

export default userRoute;


