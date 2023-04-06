import { Body, Controller, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { AuthGuard } from 'src/auth/auth.gaurd';
import { User } from 'src/users/user.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
    constructor(private reportsService: ReportsService) {}

    @Post()
    @UseGuards(AuthGuard)
    createReport(@Body() body: CreateReportDto, @AuthUser() authUser: User) {
        return this.reportsService.create(body, authUser);
    }

    @Patch('/:id/approval')
    toggleApproval(@Param('id') id: string) {
        return this.reportsService.toggleApproval(+id);
    }
}
