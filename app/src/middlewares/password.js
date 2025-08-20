import bcrypt from "bcryptjs";

export async function checkPassword(plainPassword, hashedPassword) {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    return match;
}

export async function hashPassword(plainPassword) {
    const saltRounds = 10; // Semakin besar, semakin aman, tapi lebih lambat
    const hashed = await bcrypt.hash(plainPassword, saltRounds);
    return hashed;
}