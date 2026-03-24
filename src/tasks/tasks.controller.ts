import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import {TasksService} from "./tasks.service"
import { CreateTaskDto, Status } from 'src/dto/create-task.dto';
import { UpdateTaskDto } from 'src/dto/update-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private readonly taskService: TasksService){}

    @Post()
    create(@Body() body: CreateTaskDto){
        return this.taskService.create(body)
    }

    @Get()
    findAll(@Query('status') status?: Status){
        return this.taskService.findAll(status)
    }

    @Get(':id')
    findOne(@Param(':id') id: string){
        return this.taskService.findOne(id)
    }

    @Patch(':id')
    update(@Param(':id') id: string, @Body() body: UpdateTaskDto){
        return this.taskService.update(id, body)
    }

    @Delete(":id")
    remove(@Param("id") id: string){
        return this.taskService.remove(id)
    }
}
