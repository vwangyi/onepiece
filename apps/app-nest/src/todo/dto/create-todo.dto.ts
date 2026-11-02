import { IsInt, Length, IsIn } from 'class-validator';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty({ message: '标题不能为空' })
  @IsString()
  @Length(1, 100, { message: '标题长度需在1-100之间' })
  title: string;

  @IsOptional()
  @IsInt({ message: '状态必须为整数' })
  @IsIn([0, 1, 2], { message: '状态值只能为0或1(0-未完成 1-进行中 2-已完成)' })
  status?: number;
}
