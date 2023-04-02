import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BcryptService } from 'src/core/services/bcrytp.service';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepo: Repository<User>, private bcryptService: BcryptService) {}

    async signup(name: string, email: string, password: string) {
        const hashedPassword = await this.bcryptService.hash(password);

        const user = this.userRepo.create({name, email, password: hashedPassword});
        this.userRepo.save(user);
        return user;
    }

    findOne(id: number) {
        const user = this.userRepo.findOne({where: { id }});

        return user;
    }

    find(email: string) {
        return this.userRepo.find({where: {email }});
    }

    async update(id: number, attrs: Partial<User>) {
        const user = await this.findOne(id);

        if (!user) {
            throw new Error('user not found');
        }

        Object.assign(user, attrs);
        this.userRepo.save(user);
    }

    async remove(id: number) {
        const user = await this.findOne(id);

        if (!user) {
            throw new Error('user not found');
        }

        this.userRepo.remove(user);
    }
}
