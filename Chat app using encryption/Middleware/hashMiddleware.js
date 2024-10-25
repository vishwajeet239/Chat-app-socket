import bcrypt from 'bcryptjs';

// Use a regular function to properly bind `this` to the document
const hashPassword = async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
        // Hash the password
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error);
    }
};

export default hashPassword;
