import { Exclude, instanceToPlain } from "class-transformer";
import { Report } from "src/reports/report.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @OneToMany(() => Report, (report) => report.user)
    reports: Report[]

    toJSON() {
        return instanceToPlain(this);
    }
}