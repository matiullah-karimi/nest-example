import { Exclude, instanceToPlain } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    @Exclude({ toPlainOnly: true})
    password: string;

    toJSON() {
        return instanceToPlain(this);
    }
}