const bcrypt = require('bcryptjs');
import { saveError } from "solun-database-package";

export async function hashPassword(password: string) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        saveError('hashPassword', error, 'error');
        return '';
    }
}

export async function comparePassword(password: string, hashedPassword: string) {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    } catch (error) {
        saveError('comparePassword', error, 'error');
        return false;
    }
}