import {IsEnum, IsOptional, IsString, MinLength} from "class-validator"

export enum Status {
    PENDING = "PENDING",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE"
}

export class CreateTaskDto {
    @IsString()
    @MinLength(3)
    title: string
    
    @IsOptional()
    @IsString()
    description?: string

    @IsOptional()
    @IsEnum(Status)
    status?: Status
}