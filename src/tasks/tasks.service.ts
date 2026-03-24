import { Injectable, Param, Patch } from '@nestjs/common';
import { CreateTaskDto, Status } from 'src/dto/create-task.dto';
import { UpdateTaskDto } from 'src/dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {
    constructor(private prisma: PrismaService){}
    
    async create(data: CreateTaskDto){
        return this.prisma.task.create({
            data: {
                title: data.title,
                description: data.description as string,
                status: data.status
            }
        })
    }

    async findAll(status?: Status){
        return this.prisma.task.findMany({
            where: status ? {status}: {},
            orderBy: {createdAt: "desc"}
        })
    }

    async findOne(id: string){
        const task = await this.prisma.task.findUnique({
            where: {
                id
            }
        })
    }
    async update(id: string, data: UpdateTaskDto){
        await this.findOne(id)
    }

    async remove(id: string){
        await this.findOne(id)
        return this.prisma.task.delete({
            where: {id}
        })
    }
}

