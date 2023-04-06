import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report } from './report.entity';

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

    create(data: CreateReportDto, user: User) {
        const report = this.repo.create(data);
        report.user = user;
        return this.repo.save(report);
    }

    async toggleApproval(id: number) {
        const report = await this.repo.findOne({where: {id}});

        if (!report) {
            throw new NotFoundException();
        }

        report.approved = !report.approved;
        return this.repo.save(report);
    }
}
