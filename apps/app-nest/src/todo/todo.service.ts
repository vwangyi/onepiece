import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  @InjectRepository(Todo)
  private readonly todoRepository: Repository<Todo>;

  async create(createTodoDto: CreateTodoDto) {
    const todo = this.todoRepository.create(createTodoDto);
    return await this.todoRepository.save(todo);
  }

  async remove(id: number) {
    const todo = await this.findOne(id);
    await this.todoRepository.remove(todo);
    return { message: `待办 #${id} 删除成功` };
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const todo = await this.findOne(id);
    Object.assign(todo, updateTodoDto);
    return await this.todoRepository.save(todo);
  }

  async findOne(id: number) {
    const todo = await this.todoRepository.findOneBy({ id });
    if (!todo) {
      throw new NotFoundException(`待办 #${id} 不存在`);
    }
    return todo;
  }

  async findAll(
    title?: string,
    status?: number,
    page?: number,
    pageSize?: number
  ) {
    const where: Record<string, unknown> = {};
    if (title) {
      where.title = Like(`%${title}%`);
    }
    if (status !== undefined && status !== null) {
      where.status = status;
    }

    if (
      page === undefined ||
      page === null ||
      pageSize === undefined ||
      pageSize === null
    ) {
      return await this.todoRepository.find({
        where,
        order: { createTime: 'DESC' }
      });
    }

    const [list, total] = await this.todoRepository.findAndCount({
      where,
      order: { createTime: 'DESC' },
      skip: (page - 1) * pageSize,
      take: pageSize
    });
    return { list, total, page, pageSize };
  }
}
