import jwt from 'jsonwebtoken';
import expressAsyncHandler from 'express-async-handler';
import User from '../Models/UserModel.js';

const protect = expressAsyncHandler(
    async (req, res, next) => {

        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")

        ) {
            try {
                token = req.headers.authorization.split(" ")[1];

                const decoded = jwt.verify(token, process.env.JWT_SECRET);

                req.user = await User.findById(decoded.id).select("-password");
                next();
            }
            catch (error) {
                console.error(error);
                res.status(401);
                throw new Error("Not authorized, token failed");
            }
        }
        if (!token) {
            console.log('No token found'); 
            res.status(401);
            throw new Error("Not authorized, no token");
        }
    });

export default protect;