import { Injectable } from "@nestjs/common";
const bcrypt = require('bcrypt');

@Injectable()
export class BcryptService {
    async hash(password: string) {
        return await bcrypt.hash(password, 10);
    }

    async compare(plainPassword: string, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }
}