import jwt from "jsonwebtoken";

const secretKey="topsecret";
const authenticate = (req, res, next) => {
    const token = req.header('Authorization').split(' ')[1];

    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        jwt.verify(token, secretKey, (err, user) => {
            if (err) return res.sendStatus(403);
            req.user = user;
            next();
        });
    } catch (error) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
}