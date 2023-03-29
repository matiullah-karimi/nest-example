import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

    signup(name: string, email: string, password: string) {
        const user = this.userRepo.create({name, email, password});
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
