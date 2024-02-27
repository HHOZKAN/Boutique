import jwt from "jsonwebtoken";

const generateToken = (id, email, name, isAdmin) => {
    return jwt.sign({
        _id: id,
        email : email,
        name : name,
        isAdmin : isAdmin
    },
        process.env.JWT_SECRET,
        {
            expiresIn: '30d',
        });
};

export default generateToken;